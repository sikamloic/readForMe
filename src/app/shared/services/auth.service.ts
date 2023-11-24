import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  SERVER_URL = environment.SERVER_URL + '/auth'
  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
    const API_URL = this.SERVER_URL + '/login';
    return this.httpClient.post(
      API_URL,
      {
        email: email,
        password: password
      }
    )
  }

  forgotPassword(email: string){
    const API_URL = this.SERVER_URL + '/forgot-password'
    return this.httpClient.post(
      API_URL,
      {
        email: email,
      }
    )
  }

  verifyCode(userId: string, code: string){
    const API_URL = this.SERVER_URL + '/verify-code/' + userId
    return this.httpClient.post(
      API_URL,
      {
        code: code,
      }
    )
  }

  resetPassword(userId: string, password: string){
    const API_URL = this.SERVER_URL + '/reset-password/' + userId
    return this.httpClient.post(
      API_URL,
      {
        password: password,
      }
    )
  }

  sendVerificationEmail(email: string){
    const API_URL = this.SERVER_URL + '/send-verification-email'
    return this.httpClient.post(
      API_URL,
      {
        email: email,
      }
    )
  }

  verifyEmail(code: string){
    const API_URL = this.SERVER_URL + '/verify-email'
    return this.httpClient.post(
      API_URL,
      {
        code: code,
      }
    )
  }

  logout(token: string){
    const API_URL = this.SERVER_URL + '/logout'
    return this.httpClient.post(
      API_URL,
      {
        refreshToken: token
      }
    )
  }

  refreshAuth(token: string){
    const API_URL = this.SERVER_URL + '/refresh-tokens'
    return this.httpClient.post(
      API_URL,
      {
        refreshToken: token
      }
    )
  }
}