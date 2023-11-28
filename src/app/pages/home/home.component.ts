import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextToSpeechService } from '../../shared/services/text-to-speech.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isPlaying = false
  text: string
  lang: string
  onBreak: boolean
  isSpeaking: boolean = false;
  constructor(private textToSpeechService: TextToSpeechService){}

  toggleSpeech(): void {
    console.log(this.textToSpeechService.isSpeaking())
    if (this.textToSpeechService.isSpeaking()) {
      // Si la synthèse est en cours, mettez-la en pause
      this.textToSpeechService.pause();
    } else {
      // Si la synthèse n'est pas en cours, lancez-la ou reprenez-la
      console.log(this.textToSpeechService.isPause())
      if (this.textToSpeechService.isPause()) {
        // Si la synthèse est en pause, reprenez-la
        this.textToSpeechService.resume();
      } else {
        // Si la synthèse n'est ni en cours ni en pause, lancez-la
        this.textToSpeechService.speak(this.text,);
      }
    }

    // Mettez à jour le statut de la synthèse vocale
    this.isSpeaking = this.textToSpeechService.isSpeaking();
  }

  cancelSpeech(): void {
    // Annulez la synthèse vocale en cours
    this.textToSpeechService.cancel();

    // Mettez à jour le statut de la synthèse vocale
    this.isSpeaking = this.textToSpeechService.isSpeaking();
  }

  // parle(){
  //   this.textToSpeechService.speak(this.text)
  // }

  // pause(){
  //   this.textToSpeechService.pause()
  // }

  // play(){
  //   this.textToSpeechService.play()
  // }

  // stop(){
  //   this.textToSpeechService.stop()
  // }

  // playing(){
    
  // }

  ngOnInit(): void {
    // const voices = window.speechSynthesis.getVoices();
    // const languages = voices.map(voice => voice.lang);
    // console.log(languages)
  }

}
