import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';
import { API_URL } from '../app.constants';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {
  constructor(private httpClient: HttpClient) { }
//   authenticate(username: string, password: string) {
//     // console.log('Before ' + this.isUserLogedIn()); // if false the valus will not be save to session storage
//     if(username === 'admin' && password === 'admin')   {
//       sessionStorage.setItem('authenticaterUser', username)
//       // console.log('After ' + this.isUserLogedIn());
    
//       return true;
//     } else {
//       return false;
//     }
// }
  executeAuthenticationService(username: string, password: string){
    let basicAutHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
      Authorization: basicAutHeaderString
    })
    return this.httpClient.get<AuthenticationBean>(API_URL + '/basicauth', {headers})
    .pipe(
          map(
            data => {
              sessionStorage.setItem(AUTHENTICATED_USER, username);
              sessionStorage.setItem(TOKEN , basicAutHeaderString);
              return data;
            }
          )
        );
}

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER); //check if the session storage is not empty
    // return !(userName === null);

  }
  getAuthenticatedToken() {
    if(this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN); //check if the session storage is not empty
      // return !(userName === null);
    }
   

  }
  isUserLogedIn() {
    const userName = sessionStorage.getItem(AUTHENTICATED_USER); //check if the session storage is not empty
    return !(userName === null);

}
  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem('token');
  }

  
}
export class AuthenticationBean {
  constructor(public message: string){}
}
