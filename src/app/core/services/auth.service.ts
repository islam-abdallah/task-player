import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userEmitter: EventEmitter<AuthService>;
  private url: string;

  constructor(private http: HttpClient) {
    this.userEmitter = new EventEmitter();

    this.url = environment.apiUserLogin;
  }

  getToken() {
    return localStorage.getItem('auth_token_player');
  }

  isAuthenticated() {
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user_player'));
  }



  setToken(token) {
    localStorage.setItem('auth_token_player', token);
  }

  setUser(user) {
    localStorage.setItem('user_player', JSON.stringify(user));
  }

  removeToken() {
    localStorage.removeItem('auth_token_player');
    localStorage.removeItem('user_player');
  }

  login(user) {
    return this.http.post(this.url + 'user/login', user)
      .catch((error: any) => {
        return Observable.throw(error.error || 'error ');
      });
  }








  updateUser(user) {
    this.userEmitter.emit(user);
  }

}
