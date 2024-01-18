import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextToSpeechService } from '../../shared/services/text-to-speech.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistoryService } from '../../shared/services/history.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '../../shared/services/translate.service';
import { ConnectionService } from '../../shared/services/connection.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  countriesFrenchNames = {
    "de-DE": "Allemand",
    "el-GR": "Grec",
    "en-EN": "Anglais",
    "es-ES": "Espagnol",
    "fr-FR": "Français",
    "ha-NE": "Haoussa",
    "he-IL": "Hébreu",
    "hi-IN": "Hindi",
    "hr-HR": "Croate",
    "hu-HU": "Hongrois",
    "id-ID": "Indonésien",
    "is-IS": "Islandais",
    "it-IT": "Italien",
    "ja-JP": "Japonais",
    "ko-KR": "Coréen",
    "la-VA": "Latin",
    "nl-NL": "Néerlandais",
    "pl-PL": "Polonais",
    "pt-PT": "Portugais",
    "ro-RO": "Roumain",
    "ru-RU": "Russe",
    "sq-AL": "Albanais",
    "sr-RS": "Serbe",
    "sv-SE": "Suédois",
    "th-TH": "Thaïlandais",
    "tr-TR": "Turc",
  };  
  isPlaying = false
  text: string
  traduction: string
  langFrom: string
  langTo: string
  onBreak: boolean
  isSpeaking: boolean = window.speechSynthesis.speaking;
  message: string
  titre: string
  form: FormGroup
  voices: any
  audioUrl: string = ''
  countriesArray: any[]
  isLoading = false
  constructor(
    private textToSpeechService: TextToSpeechService,
    private historyService: HistoryService,
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private translateSerive: TranslateService,
    private connectionService: ConnectionService
    ){
      this.connectionService.updateConnectionQuality()
      this.form = this.formbuilder.group({
        titre: formbuilder.control('', Validators.required)
      })
      this.voices = window.speechSynthesis.getVoices();
      console.log(this.voices)
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
      };
      this.countriesArray = Object.entries(this.countriesFrenchNames).map(([code, nom]) => ({ code, nom }));
      this.cancelSpeech()
    }

  toggleSpeech(text: string, lang: string): void {
    let textes = this.splitTextByPunctuation(text)
    textes.forEach(item =>{
      if (this.textToSpeechService.isSpeaking()) {
        this.textToSpeechService.pause();
      } else {
        if (this.textToSpeechService.isPause()) {
          this.textToSpeechService.resume();
        } else {
          this.textToSpeechService.speak(item, lang);
        }
      }
      this.isSpeaking = this.textToSpeechService.isSpeaking();
    })
  }

  save(){
    if(this.text){
      if(this.titre){
        this.isLoading = true
        this.historyService.add(this.text, this.titre)
        .subscribe({
          next: (res: any) =>{
            console.log(res)
            this.isLoading = false
          },
          error: (err: any) =>{
            // this.isLoading = true
            this.message = err.error.message
            this.isLoading = false
          }
        })
      }
      else{
        this.isLoading = true
        const title = this.text.substring(0, 20);
        console.log(title)
        this.historyService.add(this.text,title)
        .subscribe({
          next: (res: any) =>{
            console.log(res)
            this.isLoading = false
          },
          error: (err: any) =>{
            // this.isLoading = true
            this.message = err.error.message
            this.isLoading = false
          }
        })
      }
    }
    this.isLoading = false
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

  splitTextByPunctuation(text: string) {
    const punctuations = [".", "?", "!", ";", ":", "…", "..."];
    // text = text.replace(/\s+/g, "");
    const portions = [];
    let i = 0;
    let j = 0
    while (i < text.length) {
      if (punctuations.includes(text[i])) {
        portions.push(text.slice(j, i));
        j = i + 1
        i++;
      }
      if (i === text.length - 1) {
        portions.push(text.slice(j, i + 1));
      }
      i++;
    }
    console.log(portions)
    return portions;
  }
  
  

  translate(){
    if(!this.text || !this.langFrom || !this.langTo) this.message = "Veuillez préciser les langues ou le text !!!"
    else{
      this.splitTextByPunctuation(this.text)
      this.translateSerive.translate(this.text, this.langFrom, this.langTo)
      .subscribe({
        next: ((res: any) =>{
          this.traduction = res.responseData.translatedText
        })
      })
    }
  }

  exchange(){
    let temp = this.langFrom;
    this.langFrom = this.langTo;
    this.langTo = temp;
    temp = this.text;
    this.text = this.traduction;
    this.traduction = temp;
  }

  ngOnInit(): void {
    
  }

}
