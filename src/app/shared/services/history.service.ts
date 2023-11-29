import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieStorageService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  SERVER_URL = environment.SERVER_URL + '/history'
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieStorageService
  ) { }
  
  add(
    text: string,
    titre: string
  ){
    const API_URL = this.SERVER_URL + '/add' ;
    const token = this.cookieService.get('accessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.httpClient.post(
      API_URL,
      {
        text: text,
        titre: titre
      },
      {headers}
    )
  }

  getAllByUserId(
    filter: any,
    options: any
  )
  {
    const API_URL = this.SERVER_URL + '?' + 'filter=' + JSON.stringify(filter) + "&" + 'options=' + JSON.stringify(options) ;
    const token = this.cookieService.get('accessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.httpClient.get(
      API_URL,
      {headers}
    )
  }

  delete(id: string){
    const API_URL = this.SERVER_URL + '/' + id
    const token = this.cookieService.get('accessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.httpClient.delete(
      API_URL,
      {headers}
    )
  }

  getHistoryByid(id: string){
    const API_URL = this.SERVER_URL + '/' + id
    const token = this.cookieService.get('accessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.httpClient.get(
      API_URL,
      {headers}
    )
  }

  visibility(
    id: string,
    shared: boolean
    ){
    const API_URL = this.SERVER_URL + '/visibility/' + id
    const token = this.cookieService.get('accessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.httpClient.patch(
      API_URL,
      {
        public: shared
      },
      {headers}
    )
  }
}
