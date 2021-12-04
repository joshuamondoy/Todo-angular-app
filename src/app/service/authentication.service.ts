import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
constructor() { }
  authenticate(username: string, password: string) {
    // console.log('Before ' + this.isUserLogedIn()); // if false the valus will not be save to session storage
    if(username === 'admin' && password === 'admin')   {
      sessionStorage.setItem('authenticaterUser', username)
      // console.log('After ' + this.isUserLogedIn());
    
      return true;
    } else {
      return false;
    }
}

  isUserLogedIn() {
    const userName = sessionStorage.getItem('authenticaterUser'); //check if the session storage is not empty
    return !(userName === null);

}
  logout() {
    sessionStorage.removeItem('authenticaterUser');
  }

  
}
