import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, defer } from 'rxjs';
import { ExceptionService } from './exception.service';
import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import SYSTEM_CONSTANTS from '../constants/system-constants.json'
import { debug } from 'util';

/***
   Service for api calling
*/
@Injectable({
    providedIn: 'root'
})

export class BaseService {
    constructor(
        private http: HttpClient,
        private exceptionService: ExceptionService,
        private platform: Platform,
        private nativeHttp: HTTP,
        private loading: LoadingService
    ) { }

    /***
   * @name generateOptions
   * @desc generate headers.
   * @param fileStatus if fileStatus is true then add responseType blob in headers.
   * @param headers
   * @return options
   */
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

    /**
     * @name createAuthorizationHeader
     * @desc create authorization header.
     * @param token
     * @param addHeaders
     * @return headers
     */

    createAuthorizationHeader(token, addHeaders) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        };
        if (token) {
            headers['Authorization'] = localStorage.getItem('x-auth-token');
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

    /**
     * @name createNativeHttpAuthorizationHeader
     * @desc set header for app
     * @return void
     */

    createNativeHttpAuthorizationHeader() {
        this.nativeHttp.setHeader('*', 'Content-Type', 'application/json');
        this.nativeHttp.setHeader('*', 'Accept', 'application/json')
        if (localStorage.getItem('x-auth-token')) {
            this.nativeHttp.setHeader('*', 'Authorization', localStorage.getItem('x-auth-token'));
        }
        if (localStorage.getItem('preferred_language')) {
            this.nativeHttp.setHeader('*', 'Accept-Language', localStorage.getItem('preferred_language'));
        }
    }


    /**
     * @name request
     * @desc create for all type api calling.
     * @param url api url
     * @param data request body
     * @return response
     */
    post(url = '', data: any = '', isLoader: any = false) {
        url = `${SYSTEM_CONSTANTS.API_URL}${url}`
        if (isLoader) {
            this.loading.present();
        }
        if (this.platform.is('android') || this.platform.is('ios')) {
            this.nativeHttp.setDataSerializer('json');
            return from(
                this.nativeHttp.post(encodeURI(`${environment.apiUrl}${url}`),
                    data,
                    this.createNativeHttpAuthorizationHeader())
            )
                .pipe(
                    map((response: any) => {
                        if (isLoader) {
                            this.loading.dismiss();
                        }
                        return JSON.parse(response.data);
                    }),
                    catchError((err) => {
                        return this.exceptionService.errorHandler(err, isLoader);
                    })
                );
        } else {
            return this.http
                .post(`${url}`, data, this.generateOptions(false, ''))
                .pipe(
                    map((response: any) => {
                        if (isLoader) {
                            this.loading.dismiss();
                        }
                        return response;
                    }),
                    catchError((err) => {
                        return this.exceptionService.errorHandler(err, isLoader);
                    })
                );
        }
    }
    /**
     * @name put
     * @desc put for data.
     * @param url api url
     * @param data
     * @return responsecache
     */

    put(url = '', data: any = '', isLoader: any = false) {
        url = `${SYSTEM_CONSTANTS.API_URL}${url}`
        if (isLoader) {
            this.loading.present();
        }
        if (this.platform.is('android') || this.platform.is('ios')) {
            this.nativeHttp.setDataSerializer('json');
            return from(this.nativeHttp.put(
                encodeURI(`${environment.apiUrl}${url}`),
                data,
                this.createNativeHttpAuthorizationHeader())
            )
                .pipe(
                    map((response: any) => {
                        if (isLoader) {
                            this.loading.dismiss();
                        }
                        return JSON.parse(response.data);
                    }),
                    catchError((err) => {
                        return this.exceptionService.errorHandler(err, isLoader);
                    })
                );
        } else {
            return this.http
                .put(`${url}`, data, this.generateOptions(false, ''))
                .pipe(
                    map((response: any) => {
                        if (isLoader) {
                            this.loading.dismiss();
                        }
                        return response;
                    }),
                    catchError((err) => {
                        return this.exceptionService.errorHandler(err, isLoader);
                    })
                );
        }
    }

    /***
   * @name get
   * @desc create for get data.
   * @param url api url
   * @param data
   * @return response
   */
    get(url = '', data: any = '', isLoader: any = false) {
        url = `${SYSTEM_CONSTANTS.API_URL}${url}`
        if (isLoader) {
            this.loading.present();
        }
        if (this.platform.is('android') || this.platform.is('ios')) {
            this.nativeHttp.setDataSerializer('json');
            return from(this.nativeHttp.get(
                encodeURI(`${environment.apiUrl}${url}`),
                data,
                this.createNativeHttpAuthorizationHeader())
            )
                .pipe(
                    map((response: any) => {
                        if (isLoader) {
                            this.loading.dismiss();
                        }
                        return JSON.parse(response.data);
                    }),
                    catchError((err) => {
                        return this.exceptionService.errorHandler(err, isLoader);
                    })
                );
        } else {
            return this.http
                .get(`${url}`, this.generateOptions(false, '', data))
                .pipe(
                    map((response: any) => {
                        if (isLoader) {
                            this.loading.dismiss();
                        }
                        return response;
                    }),
                    catchError((err) => {
                        return this.exceptionService.errorHandler(err, isLoader);
                    })
                );
        }
    }

    /***
  * @name del
  * @desc create for delete data.
  * @param url api url
  * @param data
  * @return response
  */
    delete(url = '', data: any = '', isLoader: any = false) {
        url = `${SYSTEM_CONSTANTS.API_URL}${url}`
        if (isLoader) {
            this.loading.present();
        }
        if (this.platform.is('android') || this.platform.is('ios')) {
            this.nativeHttp.setDataSerializer('json');
            return from(this.nativeHttp.delete(
                encodeURI(`${environment.apiUrl}${url}`),
                data,
                this.createNativeHttpAuthorizationHeader())
            )
                .pipe(
                    map((response: any) => {
                        if (isLoader) {
                            this.loading.dismiss();
                        }
                        return JSON.parse(response.data);
                    }),
                    catchError((err) => {
                        return this.exceptionService.errorHandler(err, isLoader);
                    })
                );
        } else {
            return this.http
                .delete(`${url}`, this.generateOptions(false, '', data))
                .pipe(
                    map((response: any) => {
                        if (isLoader) {
                            this.loading.dismiss();
                        }
                        return response;
                    }),
                    catchError((err) => {
                        return this.exceptionService.errorHandler(err, isLoader);
                    })
                );
        }
    }
}

