import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const PasswordMatch: ValidatorFn = (control: AbstractControl) => {

  let password = control.get('password').value;

  let confirmPassword = control.get('confirmPassword').value;

  if(password != confirmPassword) {
    control.get('confirmPassword').setErrors( {ConfirmPassword: true} );
  } else {
    return null
  }
};

