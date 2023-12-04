import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare var responsiveVoice: any;


@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  private synth: SpeechSynthesis;
  private isPaused: boolean = false;

  constructor(
    private http: HttpClient
  ) {
    this.synth = window.speechSynthesis;
  }

  speak1(text: string) {
    const url = 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize';
    const headers = new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'dcfc7b65d9msh02bd6153e2569b4p16016ejsn8d0a0c839067',
      'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
    });
    const body = new URLSearchParams();
    body.set('voice_code', 'en-US-1');
    body.set('text', text);
    body.set('speed', '1.00');
    body.set('pitch', '1.00');
    body.set('output_type', 'audio_url');

    return this.http.post(url, body.toString(), { headers })
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
