import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidation {
    static ConfirmPassword(AC: FormGroup) {
        const password = AC.get('password').value;
        if (AC.get('confirmPassword').touched || AC.get('confirmPassword').dirty) {
            const verifyPassword = AC.get('confirmPassword').value;

            if (password !== verifyPassword) {
                AC.get('confirmPassword').setErrors( {ConfirmPassword: true} );
            } else {
                return null;
            }
        }

        if (AC.get('password').touched || AC.get('password').dirty) {

            if (AC.get('currentPassword') === null) { return; }
            const verifyPassword = AC.get('currentPassword').value;
            if (password === verifyPassword) {
                AC.get('password').setErrors( {PasswordCurrent: true} );
            }
        }
    }

    static validadeDeveSerMaiorConsumacao(end: number): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } => {
        return control.value < end ? { 'maiorQue': true } : null;
      };
    }
}
