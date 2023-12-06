import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  API_TRANSLATE_URL = environment.API_TRANSLATE_URL
  constructor(
    private httpClient: HttpClient,
  ) { }

  translate(
    text: string,
    langFrom: string,
    langTo: string
  ){
    const API_URL = this.API_TRANSLATE_URL + "/?" + "q=" + text + "&langpair=" + langFrom + "|" + langTo
    return this.httpClient.get(API_URL)
  }
}
