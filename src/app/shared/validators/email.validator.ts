import { AbstractControl } from "@angular/forms";

export function emailValidator(
  control: AbstractControl
): { [key: string]: boolean | null } {
  let regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9]){1,}(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9]){1,})*$/g;
  if (control.value !== undefined && !regEx.test(control.value)) {
    return { isValidEmail: true };
  }
  return null;
}
