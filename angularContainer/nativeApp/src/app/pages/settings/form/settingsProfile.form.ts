import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms"

export class ProfileUpdateForm {
    
    public formBuilder: FormBuilder;
    public form: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder
        this.form = this.createForm();
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        },
        {validator: this.passwordMatchValidator});

        // form.get("confirmPassword")?.setValidators()

        // return form;
    }
    
    passwordMatchValidator(frm: FormGroup) {
        return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : {'mismatch': true};
      }

    getForm(): FormGroup {
        return this.form;
    }

}

// function matchPasswordAndConfirmPassword(form: FormGroup): ValidatorFn {
//     const password = form.get('password');
//     const confirmPassword = form.get("confirmPassword");

//     const validator = () => {
//         return password.value == confirmPassword.value ? null: {isntMatching: true}
//     }
//     return validator
// }