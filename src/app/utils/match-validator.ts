import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchValidator(matchTo: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const matchValue = control.parent?.get(matchTo)?.value;
    return matchValue === control.value ? null : { match: true };
  };
}