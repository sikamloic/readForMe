import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor(private cookieService: CookieService) { }
  set(key: string, value: any, expires?: number | Date): void {
    this.cookieService.set(key, JSON.stringify(value), expires);
  }

  get(key: string): any {
    const item = this.cookieService.get(key);
    return item ? JSON.parse(item) : null;
  }

  remove(key: string): void {
    this.cookieService.delete(key);
  }

  clearAll(): void {
    this.cookieService.deleteAll();
  }
}
