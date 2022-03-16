import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if(localStorage.getItem('auth-token')) {
      const jwtDecoded = jwt_decode(localStorage.getItem('auth-token'));
      if(next.data.allowedRoles && next.data.allowedRoles.indexOf(jwtDecoded.userType) === -1) {       
        return false;
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
