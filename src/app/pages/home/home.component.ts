import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextToSpeechService } from '../../shared/services/text-to-speech.service';
import { FormsModule } from '@angular/forms';
import { HistoryService } from '../../shared/services/history.service';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isPlaying = false
  text: string
  lang: string
  onBreak: boolean
  isSpeaking: boolean = false;
  message: string
  constructor(
    private textToSpeechService: TextToSpeechService,
    private historyService: HistoryService
    ){}

  toggleSpeech(): void {
    console.log(this.textToSpeechService.isSpeaking())
    if (this.textToSpeechService.isSpeaking()) {
      this.textToSpeechService.pause();
    } else {
      console.log(this.textToSpeechService.isPause())
      if (this.textToSpeechService.isPause()) {
        this.textToSpeechService.resume();
      } else {
        this.textToSpeechService.speak(this.text);
        this.historyService.add(this.text)
        .subscribe({
          next: (res: any) =>{
            console.log(res)
          },
          error: (err: any) =>{
            this.message = err.error.message
          }
        })
      }
    }
    this.isSpeaking = this.textToSpeechService.isSpeaking();
  }

  cancelSpeech(): void {
    this.textToSpeechService.cancel();
    this.isSpeaking = this.textToSpeechService.isSpeaking();
  }

  ngOnInit(): void {
  }

}
