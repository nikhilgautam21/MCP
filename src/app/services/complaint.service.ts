import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import API_CONSTANTS from '../constants/api-constants.json';
import SYSTEM_CONSTANTS from '../constants/system-constants.json'

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(
    public http: HttpClient
  ) { }

  addComplaint(data) {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post(`${SYSTEM_CONSTANTS.API_URL}${API_CONSTANTS.ADD_COMPLAINT}`, data , {headers} )
  }

}
