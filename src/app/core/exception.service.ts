import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController, Platform, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import SYSTEM_CONSTANTS from '../constants/system-constants.json';
import { UtilityService } from '../services/utility.service';

/** Exception Service */

@Injectable({
    providedIn: 'root'
})
export class ExceptionService {

    showLogoutPopUp: boolean = false;
    modalMaintenance: any;
    errorMessagesArr = [
        "No such entity with %fieldName = %fieldValue",
        "The coupon code isn't valid. Verify the code and try again."
    ]
    constructor(
        private utility: UtilityService,
        private loading: LoadingService,
        private nativeHttp: HTTP,
        private alertCtrl: AlertController,
        private router: Router,
        private http: HttpClient,
        private platform: Platform,
        public modalController: ModalController
    ) {

    }

    /***
    * @name errorHandler
    * @desc handle errors according to status and show alert.
    * @param err
    * @return void
    */
    errorHandler = (err, isLoader) => {
        console.log(err);
        let errorMessage = '';
        if (isLoader) {
            this.loading.dismiss();
        }
        if ((err.status === '401' || err.status === 401) && !this.showLogoutPopUp) {
            errorMessage = err.error && err.error.message ? err.error.message : JSON.parse(err.error).message;
            this.showLogoutPopUp = true;
            this.presentAlertLogout("Not Authorized", 'alert-modal-invalid');
        } else if (err.status === '400' || err.status === 400) {
            errorMessage = err.error && err.error.message ? err.error.message : JSON.parse(err.error).message;
            let errorLogin;
            if ((this.platform.is('android') || this.platform.is('ios'))) {
                errorLogin = JSON.parse(err.error);
                if (errorLogin.code == '403' || errorLogin.code == 403) {
                    err.loginErrMessage = errorMessage;
                } else {
                    this.utility.showToast(errorMessage, 'error');
                }
            } else {
                this.utility.showToast(errorMessage, 'error');
            }

        } else if (err.status === '404' || err.status === '409' || err.status === 404 || err.status === 409) {
            errorMessage = err.error && err.error.message ? err.error.message : JSON.parse(err.error).message;
            if (this.errorMessagesArr.indexOf(errorMessage) < -1) {
                this.utility.showToast(errorMessage, 'error');
            }
        } else if (err.status === '500' || err.status === '405' || err.status === 500 || err.status === 405) {
            errorMessage = err.error && err.error.message ? err.error.message : JSON.parse(err.error).message;
            this.utility.showToast(errorMessage, 'error');
        } else if (err.status === '403' || err.status === 403) {
            errorMessage = err.error && err.error.message ? err.error.message : JSON.parse(err.error).message;
            this.utility.showToast(errorMessage, 'error');
        } else if (err.status === '504' || err.status === 504) {
            errorMessage = err.error && err.error.message ? err.error.message : JSON.parse(err.error).message;
            this.utility.showToast(errorMessage, 'error');
        } else if (err.status === '422') {
            errorMessage = err.error && err.error.message ? err.error.message : JSON.parse(err.error).message;
        } else if (err.status === '503' || err.status === 503) {
        } else {
            this.utility.showToast(errorMessage, 'error');
        }
        if (err.status !== '422') {
            err.error = null;
        } else {
            err.error = errorMessage;
        }
        return throwError(err);
    }

    /**
     * @name presentAlertLogout
     * @desc call logout api and redirect to login page when got unauthorized error
     * @param msg
     * @param className
     * @return void
     */

    async presentAlertLogout(msg: any, className = '') {
        if (this.showLogoutPopUp) {
            this.showLogoutPopUp = false;
            localStorage.removeItem('x-auth-token');
            localStorage.removeItem('user-data');
            localStorage.removeItem('compare-products');
            localStorage.removeItem('compare-category-id');
            localStorage.removeItem('latest-visited');
            localStorage.removeItem('product_category');
            this.router.navigate(['/landing']);
            this.utility.showToast(msg, 'error');
        }

    }

    /**
     * @name createNativeHttpAuthorizationHeader
     * @desc set the headers for call logout api
     * @param void
     * @return void
     */

    createNativeHttpAuthorizationHeader() {
        this.nativeHttp.setHeader('*', 'Content-Type', 'application/json');
        this.nativeHttp.setHeader('*', 'Authorization', `Bearer ${localStorage.getItem('x-auth-token')}`);

    }

    generateOptions(fileStatus = false, headers = '', data = '') {
        let defaultHeaders;
        let options;

        if (fileStatus) {
            defaultHeaders = this.createAuthorizationHeader(localStorage.getItem('x-auth-token'), headers);
            options = { headers: defaultHeaders, responseType: 'blob', params: data };
        } else {
            defaultHeaders = this.createAuthorizationHeader(localStorage.getItem('x-auth-token'), headers);
            options = { headers: defaultHeaders, params: data };
        }
        return options;
    }

    createAuthorizationHeader(token, addHeaders) {
        const headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Cache-Control': 'no-cache'
        };
        if (token) {
            headers['Authorization'] = 'Bearer ' + localStorage.getItem('x-auth-token');
        }

        if (addHeaders) {
            const additionalHeaders = JSON.parse(addHeaders);
            Object.keys(additionalHeaders).map((key, index) => {
                headers[key] = additionalHeaders[key];
            });
        }
        const finalHeaders = new HttpHeaders(
            headers
        );
        return finalHeaders;

    }
}
