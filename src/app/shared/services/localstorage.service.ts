import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() {}
  set(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clearAll(): void {
    localStorage.clear();
  }
}
