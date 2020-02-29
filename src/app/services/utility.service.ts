import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getUserInfo(){
    return localStorage.getItem('user')
  }
}
