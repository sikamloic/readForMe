import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '../../../shared/services/history.service';
import { TextToSpeechService } from '../../../shared/services/text-to-speech.service';
import { FormsModule } from '@angular/forms';
import { History } from '../../../shared/interfaces/history';
import { LocalstorageService } from '../../../shared/services/localstorage.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

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
  constructor(
    private route: ActivatedRoute,
    private historyService: HistoryService,
    private textToSpeechService: TextToSpeechService,
    private location: Location,
    private localStorage: LocalstorageService
  ){
    if(this.localStorage.get('user')) this.user = this.localStorage.get('user')
  }

  back(){
    this.location.back()
  }

  toggleSpeech(): void {
    if (this.textToSpeechService.isSpeaking()) {
      this.textToSpeechService.pause();
    } else {
      if (this.textToSpeechService.isPause()) {
        this.textToSpeechService.resume();
      } else {
        this.textToSpeechService.speak(this.history.text, this.lang);
      }
    }
    this.isSpeaking = this.textToSpeechService.isSpeaking();
  }

  cancelSpeech(): void {
    this.textToSpeechService.cancel();
    this.isSpeaking = this.textToSpeechService.isSpeaking();
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
