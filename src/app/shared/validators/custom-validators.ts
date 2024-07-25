import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noPastDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight to compare only dates
    const selectedDate = new Date(control.value);
    return selectedDate < today ? { pastDate: { value: control.value } } : null;
  };
}
