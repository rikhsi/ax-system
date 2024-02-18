import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { VALIDATION_ERROR_TYPE } from 'src/app/constants';


@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  #validationErrorMessages = {
    [VALIDATION_ERROR_TYPE.required]: () => 'Обязательное поле',
    [VALIDATION_ERROR_TYPE.email]: () => 'Введен некорректный email',
    [VALIDATION_ERROR_TYPE.minlength]: (control: AbstractControl) =>
      `Минимальное количество символов: ${control.getError('minlength').requiredLength}`,
    [VALIDATION_ERROR_TYPE.maxlength]: (control: AbstractControl) =>
      `Максимальное количество символов: ${control.getError('maxlength').requiredLength}`,
    [VALIDATION_ERROR_TYPE.max]: (control: AbstractControl) => `Максимальное значение: ${control.getError('max').max}`,
    [VALIDATION_ERROR_TYPE.not_found]: () => 'Неправильная почта или пароль'
  };

  isControlDirtyAndInvalid(control: AbstractControl): boolean {
    return control.dirty && control.invalid;
  }

  validateField(control: AbstractControl): string {
    const controlErrorKeys = Object.keys(control?.errors ? control?.errors : {});

    const errorMessages = Object.values(VALIDATION_ERROR_TYPE).reduce((arr, error) => {
      if (controlErrorKeys.includes(VALIDATION_ERROR_TYPE[error])) {
        arr.push(this.#validationErrorMessages[error](control));
      }
      return arr;
    }, new Array<string>());

    return errorMessages.join('. ');
  }
}
