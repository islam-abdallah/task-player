import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  url: string;

  constructor(private http: HttpClient) {
    const data = JSON.parse(localStorage.getItem('user_player'))
    console.log(data.organizations[data.organizationId].packages[0].programId)
    this.url = environment.api + data.organizationId + '/' + data.organizations[data.organizationId].packages[0].programId
  }

  getPlayers() {
    return this.http.get(this.url + '/players').catch((error: any) => {
      return Observable.throw(error.error || "error ");
    });
  }
  AddPlayer(data) {
    return this.http.post(this.url + '/players', data).catch((error: any) => {
      return Observable.throw(error.error || "error ");
    });
  }
  getPlayerById(id) {
    return this.http.get(this.url + '/players/' + id).catch((error: any) => {
      return Observable.throw(error.error || "error ");
    });
  }
  // getTeams() {
  //   return this.http.get(this.url + '/teams').catch((error: any) => {
  //     return Observable.throw(error.error || "error ");
  //   });
  // }
}
