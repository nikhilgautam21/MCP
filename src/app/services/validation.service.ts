import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  phoneValidator = (control: AbstractControl): any => {
    if(control.value){
      return null;
    }
    const NUMBER_REGEXP = /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/;
    if (NUMBER_REGEXP.test(control.value)) {
      return null;
    }
    return {
      invalidPhone: true
    };
  }

}
