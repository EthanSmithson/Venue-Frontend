import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonBackButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPageForm } from './form/login.page.form';
import { ReactiveFormsModule } from '@angular/forms';
import { compileComponentFromMetadata } from '@angular/compiler';
import { LoginService } from 'src/app/services/login.service';
import { ElementRef, Renderer2 } from '@angular/core'; 
import { ResetEmailService } from 'src/app/services/resetEmail.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, ReactiveFormsModule, IonButton, IonBackButton],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LoginPage implements OnInit {

  @ViewChild("removeEmailError") thisEmailError: any = ElementRef;
  @ViewChild('removePasswordError') thisPasswordError: any = ElementRef;


  form: any = FormGroup;

  constructor(private router:Router, private formBuilder: FormBuilder, private renderer: Renderer2, private cookieService: CookieService) { }

  ngOnInit() {
    let email: any;
    this.form = new LoginPageForm(this.formBuilder).createForm();
    email = this.form.get('email')?.valid;
    console.log(this.form)
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  private dataService = inject(LoginService);
  data: any;
  emailError: any;
  passwordError: any;
  removeEmailError: any;
  userDoesNotExists: any;
  removeUserDoesNotExists: any;
  isConfirmed: any;

  submitLogin(formData: any) {
    // console.log(formData)
    this.dataService.loginUser(formData).subscribe((results: any) => {
      // console.log(results);
      this.data = results;
      // this.errors = results.errors;
      console.log(this.data)
      if (this.data.status == 1) {
        this.dataService.isConfirmed(formData).subscribe((results: any) => {
          this.isConfirmed = results.status;
          console.log("Am I confirmed " + this.isConfirmed)
          if (this.isConfirmed == 1) {
            this.router.navigateByUrl('/home');
            this.cookieService.set("myCookie", formData.email);
          } else {
            this.userDoesNotExists = "User is not Confirmed!";
            this.hideEmailError(this.userDoesNotExists);
          }
        });
      } else if (this.data.status == 2) {
        this.userDoesNotExists = "This User Does Not Exist!"
        this.hideEmailError(this.userDoesNotExists);
      } else {
        console.log(this.data.errors[0]);
        this.emailError = this.data.errors[0];
        this.passwordError = this.data.errors[1];
      }
    })
  }

  hideEmailError(data: any) {
    setTimeout(() => {
      this.removeUserDoesNotExists = 1;
  }, 3000);
  }

  checkEmailResetExists: any;
  isEmailResetSent: any;
  private emailReset = inject(ResetEmailService)

  resetEmail(formData: any) {
    // console.log(formData)
    this.emailReset.checkUserExists(formData).subscribe((results: any) => {
      this.checkEmailResetExists = results.status;
      console.log(this.checkEmailResetExists)
      if (this.checkEmailResetExists == 1) {
        this.emailReset.sendRestEmail(formData).subscribe((results: any) => {
          this.data = results;
        })
      } else {
        this.userDoesNotExists = "User Does Not Exist!";
        this.hideEmailNotExistsError(this.userDoesNotExists);
      }
    });
  }

  hideEmailNotExistsError(data: any) {
    setTimeout(() => {
      this.removeUserDoesNotExists = 1;
  }, 3000);
  }

  // checkEmailResetLink(event: any) {
  //   console.log(event.target.value)
  //   let data = event.target.value;
  //   if (data.email == true) {
  //     console.log("yes")
  //   } else {
  //     console.log("no")
  //   }
  // }

}
