import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  constructor() { }

  async readDocument(text: string, lang = 'en-EN', volume = 1.0, rate = 1.0, pitch = 1.0, voiceIndex = 0){
    console.log(lang)
    const utterance = await new SpeechSynthesisUtterance(text)
    utterance.volume = volume
    utterance.lang = lang
    window.speechSynthesis.speak(utterance)
  }

  pause(){
    window.speechSynthesis.pause()
  }

  play(){
    window.speechSynthesis.resume()
  }

  stop(){
    window.speechSynthesis.cancel()
  }

  getVoice(text: string, lang: string, volume = 1.0, rate = 1.0, pitch = 1.0, voiceIndex = 0){
    window.speechSynthesis.getVoices()
  }
}
