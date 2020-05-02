import { AbstractControl } from "@angular/forms";

export function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean | null } {
  const regEX = /^(?=.*\d)(?=.*[#$&-.,_]?)(?=.*\w*[A-Z]?)(?=.*\w*[a-z])\S{8,}$/;
  if (control.value !== undefined && !regEX.test(control.value)) {
    return { isValidPassword: true };
  }
  return null;
}
