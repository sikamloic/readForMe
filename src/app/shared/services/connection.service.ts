import { Injectable } from '@angular/core';

export enum ConnectionQuality {
  Unknown = 'unknown',
  Good = 'good',
  Moderate = 'moderate',
  Poor = 'poor',
}

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  connectionQuality: ConnectionQuality = ConnectionQuality.Unknown;

  constructor() {
    window.addEventListener('online', () => this.updateConnectionQuality());
    window.addEventListener('offline', () => this.updateConnectionQuality());
  }

  updateConnectionQuality(): void {
    if (navigator.onLine) {
      // Vérifier la qualité de la connexion en fonction de critères spécifiques
      // Vous pouvez ajuster ces critères en fonction de vos besoins
      const connection = (navigator as any).connection;
      if (connection) {
        const downlinkSpeed = connection.downlink; // Méga-bits par seconde
        const rtt = connection.rtt; // Latence en millisecondes

        if (downlinkSpeed >= 5 && rtt < 100) {
          this.connectionQuality = ConnectionQuality.Good;
        } else if (downlinkSpeed >= 2 && rtt < 300) {
          this.connectionQuality = ConnectionQuality.Moderate;
        } else {
          this.connectionQuality = ConnectionQuality.Poor;
        }
      } else {
        // Le navigateur ne prend pas en charge l'API Connection
        this.connectionQuality = ConnectionQuality.Unknown;
      }

      console.log('Qualité de la connexion :', this.connectionQuality);
    } else {
      // L'utilisateur est hors ligne
      this.connectionQuality = ConnectionQuality.Unknown;
      console.warn('L\'utilisateur est hors ligne.');
    }
  }
}

