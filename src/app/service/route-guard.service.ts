import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{
  
  constructor(private authenticationService: AuthenticationService) { }
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //checks if the user is logged in or not 
  if(this.authenticationService.isUserLogedIn()) {
    return true;
  } else {
  return false;
  }
}
}
