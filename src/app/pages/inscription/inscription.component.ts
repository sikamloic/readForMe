import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CookieStorageService } from '../../shared/services/cookie.service';
import { LocalstorageService } from '../../shared/services/localstorage.service';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const hasLetter = /[a-zA-Z]/.test(value);
    const isLengthValid = value && value.length >= 8;
  
    if (!hasLetter || !isLengthValid) {
      return { invalidPassword: true };
    }
    return null;
  }

  isSubmitting = false
  hide = true
  form: FormGroup
  message: string
  constructor(
    private formbuilder: FormBuilder,
    private route: Router,
    private cookieService: CookieStorageService,
    private localStorage: LocalstorageService,
    private userService: UserService,
    private authService: AuthService
  ){
    this.form = this.formbuilder.group({
      password : formbuilder.control('',[this.passwordValidator, Validators.required]),
      pseudo: formbuilder.control('', [Validators.required]),
      telephone: formbuilder.control('', [Validators.required, Validators.minLength(9)]),
      rememberMe: formbuilder.control('')
    })
  }
  register(){
    if(this.form.valid){
      this.isSubmitting  = true
      let id = this.generateCode(4)
      this.userService.register(
        id,
        this.form.value.pseudo,
        this.form.value.telephone,
        this.form.value.password
      )
      .subscribe({
        next: (res: any) =>{
          this.login()
          this.isSubmitting = false
        },
        error: (err: any) =>{
          this.message = err.error.message
          this.isSubmitting  = false
        }
      })
      this.isSubmitting  = false
    }
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
          this.route.navigate(['/'])
        },
        error: (err: any) =>{
          this.message = err.error.message
        }
      })
      this.isSubmitting  = false;
    }
    else{
      console.log("Veuillez correctement remplir le formulaire")
    }
  }

  generateCode(len: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
}
