import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class LoginPageForm {

    public formBuilder: FormBuilder;
    

    constructor(formbuilder: FormBuilder) {
        this.formBuilder = formbuilder
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

}