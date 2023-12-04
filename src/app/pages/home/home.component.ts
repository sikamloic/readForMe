import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextToSpeechService } from '../../shared/services/text-to-speech.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistoryService } from '../../shared/services/history.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isPlaying = false
  text: string
  lang: string
  onBreak: boolean
  isSpeaking: boolean = window.speechSynthesis.speaking;
  message: string
  titre: string
  form: FormGroup
  voices: any
  audioUrl: string = ''
  constructor(
    private textToSpeechService: TextToSpeechService,
    private historyService: HistoryService,
    private formbuilder: FormBuilder,
    private http: HttpClient
    ){
      this.form = this.formbuilder.group({
        titre: formbuilder.control('', Validators.required)
      })
      this.voices = window.speechSynthesis.getVoices();
      console.log(this.voices[0])
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
      };
    }

  toggleSpeech(): void {
    if (this.textToSpeechService.isSpeaking()) {
      this.textToSpeechService.pause();
    } else {
      if (this.textToSpeechService.isPause()) {
        this.textToSpeechService.resume();
      } else {
        this.textToSpeechService.speak(this.text, this.lang);
      }
    }
    this.isSpeaking = this.textToSpeechService.isSpeaking();
  }

  save(){
    if(this.text){
      this.historyService.add(this.text, this.form.value.titre)
      .subscribe({
        next: (res: any) =>{
          console.log(res)
        },
        error: (err: any) =>{
          this.message = err.error.message
        }
      })
    }
    else{
      this.message = "Entrer le texte !!!"
    }
  }

  speak() {
    this.textToSpeechService.speak1(this.text)
    .subscribe({
      next: (res: any) =>{
        this.audioUrl = res['url']
      }
    })
  }

  cancelSpeech(): void {
    this.textToSpeechService.cancel();
    this.isSpeaking = this.textToSpeechService.isSpeaking();
  }

  ngOnInit(): void {
    
  }

}
