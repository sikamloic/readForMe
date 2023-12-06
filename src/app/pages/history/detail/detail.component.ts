import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '../../../shared/services/history.service';
import { TextToSpeechService } from '../../../shared/services/text-to-speech.service';
import { FormsModule } from '@angular/forms';
import { History } from '../../../shared/interfaces/history';
import { LocalstorageService } from '../../../shared/services/localstorage.service';
import { TranslateService } from '../../../shared/services/translate.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

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
  history: History = {
    id: '',
    titre: '',
    text: '',
    public: false,
    user: {
      id: '',
      pseudo: ''
    }
  }
  isSpeaking: boolean = false
  text: string
  titre: string
  user: any
  lang: string
  audioUrl: string
  traduction: string
  langFrom: string
  langTo: string
  countriesArray: any[]
  constructor(
    private route: ActivatedRoute,
    private historyService: HistoryService,
    private textToSpeechService: TextToSpeechService,
    private location: Location,
    private localStorage: LocalstorageService,
    private translateSerive: TranslateService
  ){
    if(this.localStorage.get('user')) this.user = this.localStorage.get('user')
    this.countriesArray = Object.entries(this.countriesFrenchNames).map(([code, nom]) => ({ code, nom }));
  }

  back(){
    this.location.back()
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


  cancelSpeech(): void {
    this.textToSpeechService.cancel();
    this.isSpeaking = this.textToSpeechService.isSpeaking();
  }

  translate(){
    this.translateSerive.translate(this.history.text, this.langFrom, this.langTo)
    .subscribe({
      next: ((res: any) =>{
        this.traduction = res.responseData.translatedText
      })
    })
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
    const id = this.route.snapshot.params['id'];
    this.historyService.getAllByUserId({'userId': this.user.id, '_id': id}, {'sortBy':'', 'populate': 'userId'})
    .subscribe({
      next: ((res: any) =>{
        console.log(res.results)
        this.history.id = res.results[0].id
        this.history.public = res.results[0].public
        this.history.text = res.results[0].text
        this.history.titre = res.results[0].titre
        this.history.user.id = res.results[0].userId.id
        this.history.user.pseudo = res.results[0].userId.pseudo
      })
    })
  }

}
