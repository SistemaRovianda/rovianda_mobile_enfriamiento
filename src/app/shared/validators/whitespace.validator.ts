import { AbstractControl } from "@angular/forms";

export function noWhiteSpace(control: AbstractControl) {
  const isWhiteSpace = (control.value || "").trim().length === 0;
  const isValid = !isWhiteSpace;
  return isValid ? null : { whitespace: true };
}
