// import { FormBuilder, FormGroup } from "@angular/forms"
// import { RegisterPageForm } from "./register.page.form"

// describe('RegisterPageForm', () => {
//     let registerPageForm: RegisterPageForm
//     let form: FormGroup;

//     beforeEach(() => {
//         registerPageForm = new RegisterPageForm(new FormBuilder());
//         form = registerPageForm.getForm();
//     })

//     it('should empty first name be invalid', () => {
//         expect(form.get("firstName")?.valid).toBeFalsy();
//         console.log(form)
//     })

//     it('should empty last name be invalid', () => {
//         expect(form.get("lastName")?.valid).toBeFalsy();
//     })

//     it('should empty email be invalid', () => {
//         expect(form.get("email")?.valid).toBeFalsy();
//     })

//     it('should empty phoneNumber be invalid', () => {
//         expect(form.get("phoneNumber")?.valid).toBeFalsy();
//     })

//     it('should empty password be invalid', () => {
//         expect(form.get("password")?.valid).toBeFalsy();
//     })

//     it('should empty confirm password be invalid', () => {
//         expect(form.get("confirmPassword")?.valid).toBeFalsy();
//     })

//     it('should invalid email be invalid', () => {
//         form.get('email')?.setValue('invalidEmail')
//         expect(form.get('email')?.valid).toBeFalsy();
//     })

//     it('should password less than 7 characters', () => {
//         form.get('password')?.setValue("1234")
//         expect(form.get("password")?.valid).toBeFalsy();
//     })

//     it('should password from confirm password be invalid', () => {
//         form.get("password")?.setValue("anyPassword");
//         form.get("confirmPassword")?.setValue("anotherPassword");
//         expect(form.get("confirmPassword")?.valid).toBeFalsy();
//     })
// })