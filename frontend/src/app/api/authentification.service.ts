import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from "../../environments/environment.prod";
import {Subject} from "rxjs";

@Injectable()
export class AuthenticationService {
  private connectedSource = new Subject<boolean>();
  connectedState = this.connectedSource.asObservable();

  constructor(private http: HttpClient) { }

  signin(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}signin`, { username: username, password: password })
      .pipe(map(user => {
        console.log(user);
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.setConnectedStatus(true);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.setConnectedStatus(false);
  }

  signup(body) {
    console.log(body);
    return this.http.post<any>(`${environment.apiUrl}signup`, body)
  }

  setConnectedStatus( state: boolean ) {
    this.connectedSource.next( state );
  }
}
