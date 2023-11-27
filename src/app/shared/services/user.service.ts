import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieStorageService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_URL = environment.SERVER_URL + '/user'
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieStorageService
    ) { }

  register(
    nom: string,
    prenom: string,
    email: string, 
    password: string
    ){
    const API_URL = this.SERVER_URL + '/register';
    return this.httpClient.post(
      API_URL,
      {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        role: 'user'
      }
    )
  }

  getUserByEmail(
    email: string, 
    ){
    const API_URL = this.SERVER_URL + '/email';
    return this.httpClient.post(
      API_URL,
      {
        email: email,
      }
    )
  }

  getUserById(id: string){
    const API_URL = this.SERVER_URL + '/' + id
    return this.httpClient.get(
      API_URL
    )
  }

  getUsers(filter?: any, options?: any){
    const API_URL = this.SERVER_URL + '/';
    const token = this.cookieService.get('accessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.httpClient.post(
      API_URL,
      {
        filter: filter,
        options: options
      },
      {headers}
    )
  }

  uploadImage(id: string, file: string){
    const API_URL = this.SERVER_URL + '/' + id + '/uploadImage';
    const token = this.cookieService.get('accessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.httpClient.put(
      API_URL,
      {
        file: file
      },
      {headers}
    )
  }

  updateUser(
      id: string, 
      nom?: string,
      prnom?: string,
      email?: string,
      telephone?: number,
      ville?: string,
      quartier?: string,
    ){
    const API_URL = this.SERVER_URL + '/' + id ;
    const token = this.cookieService.get('accessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.httpClient.patch(
      API_URL,
      {
        nom: nom,
        prenom: prnom,
        email: email,
        telephone: telephone,
        ville: ville,
        quartier: quartier
      },
      {headers}
    )
  }

}
