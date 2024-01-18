import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { LocalstorageService } from '../../shared/services/localstorage.service';
import { CookieStorageService } from '../../shared/services/cookie.service';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, HttpClientModule, MatProgressSpinnerModule ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent implements OnInit {
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const hasLetter = /[a-zA-Z]/.test(value);
    const isLengthValid = value && value.length >= 8;
  
    if (!hasLetter || !isLengthValid) {
      return { invalidPassword: true };
    }
    return null;
  }
  isSubmitting: boolean
  hide = true
  form: FormGroup
  message: string
  id: any
  pseudo: any
  telephone: any
  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private localStorage: LocalstorageService,
    private route: Router,
    private cookieService: CookieStorageService,
    private router: ActivatedRoute
  ){
    this.form = this.formbuilder.group({
      telephone: formbuilder.control('', [Validators.required, Validators.minLength(9)]),
      password : formbuilder.control('',[this.passwordValidator, Validators.required]),
      rememberMe: formbuilder.control('')
    })
  }

  login(){
    if(this.form.valid){
      this.isSubmitting  = true;
      this.authService.login(
        this.form.value.telephone,
        this.form.value.password
      )
      .subscribe({
        next: (res: any) =>{
          this.localStorage.set('user', res.user)
          let date = new Date('res.tokens.access.expires')
          this.cookieService.set('accessToken', res.tokens.access.token, date)
          // if(this.form.value.rememberMe){
          //   date = new Date('res.tokens.refresh.expires')
          //   this.cookieService.set('refreshToken', res.tokens.refresh.token, date)
          // }
          this.isSubmitting = false
          this.route.navigate(['/'])
        },
        error: (err: any) =>{
          this.message = err.error.message
          this.isSubmitting = false
        }
      })
      this.isSubmitting  = false;
    }
    else{
      console.log("Veuillez correctement remplir le formulaire")
    }
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.id = params['id'];
      this.pseudo = params['pseudo'];
      this.telephone = params['telephone'];
    });
    if(this.id && this.pseudo && this.telephone){
      this.authService.register(this.id, this.pseudo, parseInt(this.telephone, 10))
      .subscribe({
        next: (res: any) =>{
          this.localStorage.set('user', res.user)
          let date = new Date('res.tokens.access.expires')
          this.cookieService.set('accessToken', res.tokens.access.token, date)
          // if(this.form.value.rememberMe){
          //   date = new Date('res.tokens.refresh.expires')
          //   this.cookieService.set('refreshToken', res.tokens.refresh.token, date)
          // }
          this.route.navigate(['/'])
        },
        error: (err: any) =>{
          this.message = err.error.message
        }
      })
    }
  }
}
