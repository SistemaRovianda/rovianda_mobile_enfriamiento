import { Observable } from "rxjs";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { take, map, tap } from "rxjs/operators";

export class StoreValidators {
  constructor() {}

  static hasStoreError<T>(error: Observable<T>, errorName: string) {
    return (
      _: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>
      error.pipe(
        take(2),
        map((errors) => (!!errors ? { [errorName]: errors } : null))
      );
  }
}
