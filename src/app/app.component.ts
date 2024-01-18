import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TextToSpeechService } from './shared/services/text-to-speech.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    private textToSpeechService: TextToSpeechService,
    ){
    
  }

  // speakText(){
  //   this.textToSpeechService.readDocument("Pour authentifier votre application à l'aide du service d'identifiants par défaut de l'application (ADC), vous devez d'abord configurer ADC pour l'environnement dans lequel votre application s'exécute. Lorsque vous utilisez la bibliothèque cliente pour créer un client, celle-ci recherche et utilise automatiquement les identifiants que vous avez fournis au service ADC pour s'authentifier auprès des API utilisées par votre code. Votre application n'a pas besoin de s'authentifier explicitement ou de gérer les jetons. Ces points sont gérés automatiquement par les bibliothèques d'authentification.")
  // }

  ngOnInit() {
    
  }

}
