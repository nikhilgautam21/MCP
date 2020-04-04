import { Injectable } from '@angular/core';
import API_CONSTANTS from '../constants/api-constants.json';
import SYSTEM_CONSTANTS from '../constants/system-constants.json'
import { HTTP } from '@ionic-native/http/ngx';
import { BaseService } from '../core/base.service.js';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(
    public http: BaseService
  ) { }

  addComplaint(data) {
    return this.http.post(`${API_CONSTANTS.ADD_COMPLAINT}`, data, true)
  }

  uploadPhotos(data) {
    return this.http.post(`${API_CONSTANTS.UPLOAD_IMAGES}`, data, true)
  }

  getAllComplaints() {
    return this.http.get(`${API_CONSTANTS.ALL_COMPLAINTS}`, {}, true)
  }
}
