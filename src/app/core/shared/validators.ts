import { FormGroup, FormControl } from '@angular/forms';

export function emailValidator(control: FormControl): { [key: string]: any } {
  const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    const password = group.controls[passwordKey];
    const passwordConfirmation = group.controls[passwordConfirmationKey];
    if (password.value !== passwordConfirmation.value) {
      return passwordConfirmation.setErrors({ mismatchedPasswords: true });
    }
  };
}

export function valueGreaterThan(fitstKey: string, secondKey: string) {
  return (group: FormGroup) => {
    const fitst = group.controls[fitstKey];
    const second = group.controls[secondKey];
    if (parseInt(fitst.value, 10) > parseInt(second.value, 10)) {
      return second.setErrors({ invalidCompere: true });
    } else {
      return null
    }

  };
}
export function priceGreaterThan(fitstKey: string, secondKey: string) {
  return (group: FormGroup) => {
    const fitst = group.controls[fitstKey];
    const second = group.controls[secondKey];
    if (parseInt(fitst.value, 10) > parseInt(second.value, 10)) {

      return second.setErrors({ invalidPriceCompere: true });
    } else {
      return null
    }

  };
}
