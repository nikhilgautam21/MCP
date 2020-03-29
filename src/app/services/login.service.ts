import { Injectable } from '@angular/core';
import API_CONSTANTS from '../constants/api-constants.json';
import SYSTEM_CONSTANTS from '../constants/system-constants.json'
import { BaseService } from '../core/base.service.js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userData: any
  constructor
    ( public http: BaseService) { }

  login(data) {
    return this.http.post(`/auth/google`,data, true )
  }

  home(){
    return this.http.get(`/complaint/all-complaints`, {}, false)
  }
}
