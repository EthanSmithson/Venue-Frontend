import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms"
import { ValueAccessor } from "@ionic/angular/common";

export class PackageCreationForm {
    
    public formBuilder: FormBuilder;
    public form: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder
        this.form = this.createForm();
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            title: ['', [Validators.required]],
            genre: ['', Validators.required]
        },
        );
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