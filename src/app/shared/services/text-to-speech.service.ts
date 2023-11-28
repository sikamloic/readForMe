import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  // utterance = new SpeechSynthesisUtterance()
  // constructor() { }

  // readDocument(text: string){
  //   let started = false
  //   let ended = false
  //   this.utterance.text = text
  //   this.utterance.onstart = () =>{
  //     console.log('Speech started');
  //     started = true
  //   }
  //   this.utterance.onend = () =>{
  //     this.stop()
  //     ended = true
  //     console.log('Speech ended');
  //   }
  //   this.utterance.onerror = (event) => console.error('Speech error:', event.error);
  //   this.utterance.onresume
  //   window.speechSynthesis.speak(this.utterance)
  //   return {
  //     started,
  //     ended
  //   }
  // }

  // pause(){
  //   window.speechSynthesis.pause()
  // }

  // play(){
  //   window.speechSynthesis.resume()
  // }

  // stop(){
  //   window.speechSynthesis.cancel()
  // }

  private synth: SpeechSynthesis;
  private isPaused: boolean = false;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;

    utterance.onstart = () => {
      console.log('La synthèse vocale a commencé');
      this.isPaused = false;
    };

    utterance.onend = () => {
      console.log('La synthèse vocale s\'est terminée avec succès');
      this.isPaused = false;
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
