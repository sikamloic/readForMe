import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  private synth: SpeechSynthesis;
  private isPaused: boolean = false;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  speak(text: string, lang: string): void {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.lang = lang

    utterance.onstart = () => {
      console.log('La synthèse vocale a commencé');
      this.isPaused = false;
    };

    utterance.onend = () => {
      setTimeout(() => {
        this.synth.cancel();
        console.log('La synthèse vocale s\'est terminée avec succès');
        this.isPaused = false;
      }, 0);
    };

    utterance.onerror = (event) => {
      console.error('Erreur de synthèse vocale :', event.error);
      this.isPaused = false;
    };

    this.synth.speak(utterance);
  }

  pause(): void {
    this.synth.pause();
    this.isPaused = true;
  }

  resume(): void {
    if (this.isPaused) {
      this.synth.resume();
      this.isPaused = false
    }
  }

  cancel(): void {
    this.synth.cancel();
    this.isPaused = false;
  }

  isSpeaking(): boolean {
    if(this.synth.speaking){
      console.log(this.isPaused)
      if(!this.isPaused) return true
      else return false
    }
    else{
      return false
    }
  }

  isPause(): boolean {
    return this.isPaused;
  }
}
