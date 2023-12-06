import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextToSpeechService } from '../../shared/services/text-to-speech.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistoryService } from '../../shared/services/history.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '../../shared/services/translate.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  countriesFrenchNames = {
    "am-ET": "Amharique",
    "ar-SA": "Arabe",
    "be-BY": "Biélorusse",
    "bem-ZM": "Bemba",
    "bi-VU": "Bichlamar",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibétain",
    "br-FR": "Breton",
    "bs-BA": "Bosniaque",
    "ca-ES": "Catalan",
    "cop-EG": "Copte",
    "cs-CZ": "Tchèque",
    "cy-GB": "Gallois",
    "da-DK": "Danois",
    "dz-BT": "Dzongkha",
    "de-DE": "Allemand",
    "dv-MV": "Maldivien",
    "el-GR": "Grec",
    "en-EN": "Anglais",
    "es-ES": "Espagnol",
    "et-EE": "Estonien",
    "eu-ES": "Basque",
    "fa-IR": "Persan",
    "fi-FI": "Finnois",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Féroïen",
    "fr-FR": "Français",
    "gl-ES": "Galicien",
    "gu-IN": "Gujarati",
    "ha-NE": "Haoussa",
    "he-IL": "Hébreu",
    "hi-IN": "Hindi",
    "hr-HR": "Croate",
    "hu-HU": "Hongrois",
    "id-ID": "Indonésien",
    "is-IS": "Islandais",
    "it-IT": "Italien",
    "ja-JP": "Japonais",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Coréen",
    "ku-TR": "Kurde",
    "ky-KG": "Kirghize",
    "la-VA": "Latin",
    "lo-LA": "Laotien",
    "lv-LV": "Letton",
    "men-SL": "Mende",
    "mg-MG": "Malgache",
    "mi-NZ": "Maori",
    "ms-MY": "Malais",
    "mt-MT": "Maltais",
    "my-MM": "Birman",
    "ne-NP": "Népalais",
    "niu-NU": "Niuéen",
    "nl-NL": "Néerlandais",
    "no-NO": "Norvégien",
    "ny-MW": "Chichewa",
    "ur-PK": "Pendjabi",
    "pau-PW": "Paluan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pachtou",
    "pis-SB": "Pijin",
    "pl-PL": "Polonais",
    "pt-PT": "Portugais",
    "rn-BI": "Kirundi",
    "ro-RO": "Roumain",
    "ru-RU": "Russe",
    "sg-CF": "Sango",
    "si-LK": "Cingalais",
    "sk-SK": "Slovaque",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanais",
    "sr-RS": "Serbe",
    "sv-SE": "Suédois",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamoul",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tadjik",
    "th-TH": "Thaïlandais",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmène",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongien",
    "tr-TR": "Turc",
    "uk-UA": "Ukrainien",
    "uz-UZ": "Ouzbek",
    "vi-VN": "Vietnamien",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zoulou"
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
  constructor(
    private textToSpeechService: TextToSpeechService,
    private historyService: HistoryService,
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private translateSerive: TranslateService
    ){
      this.form = this.formbuilder.group({
        titre: formbuilder.control('', Validators.required)
      })
      this.voices = window.speechSynthesis.getVoices();
      console.log(this.voices)
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
      };
      this.countriesArray = Object.entries(this.countriesFrenchNames).map(([code, nom]) => ({ code, nom }));
    }

  toggleSpeech(text: string, lang: string): void {
    if (this.textToSpeechService.isSpeaking()) {
      this.textToSpeechService.pause();
    } else {
      if (this.textToSpeechService.isPause()) {
        this.textToSpeechService.resume();
      } else {
        this.textToSpeechService.speak(text, lang);
      }
    }
    this.isSpeaking = this.textToSpeechService.isSpeaking();
  }

  save(){
    if(this.text){
      this.historyService.add(this.text, this.titre)
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
      this.message = "Entrer le texte ou le titre !!!"
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

  translate(){
    if(!this.text || !this.langFrom || !this.langTo) this.message = "Veuillez préciser les langues ou le text !!!"
    else{
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
