import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuardService {

  constructor(public router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (localStorage.hasOwnProperty('x-auth-token')) {
        return true;
    } else {
        return false;
    }
}
}
