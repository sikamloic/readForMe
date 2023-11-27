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

  text: string
  constructor(private textToSpeechService: TextToSpeechService){}

  parle(){
    this.textToSpeechService.readDocument(this.text)
  }

  pause(){
    this.textToSpeechService.pause()
  }

  play(){
    this.textToSpeechService.play()
  }

  stop(){
    this.textToSpeechService.stop()
  }

  ngOnInit(): void {
    // const voices = window.speechSynthesis.getVoices();
    // const languages = voices.map(voice => voice.lang);
    // console.log(languages)
  }

}
