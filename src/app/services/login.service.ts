import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import API_CONSTANTS from '../constants/api-constants.json';
import SYSTEM_CONSTANTS from '../constants/system-constants.json' 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userData:any
  constructor
  (
    public http:HttpClient
  ) { }

  login(){
    return this.http.get(`${SYSTEM_CONSTANTS.API_URL}${API_CONSTANTS.LOGIN}`)
  }
}
