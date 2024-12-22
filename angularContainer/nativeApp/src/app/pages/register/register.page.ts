import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonBackButton } from '@ionic/angular/standalone';
import { LoginPage } from '../login/login.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { compileComponentFromMetadata } from '@angular/compiler';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPageForm } from './form/register.page.form';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/services/register.service';
import { UserInfo } from './registerUser';
import { ElementRef, Renderer2 } from '@angular/core'; 
import { HostListener } from '@angular/core';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton, IonBackButton, ReactiveFormsModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RegisterPage implements OnInit {

  @ViewChild("removeEmailError") thisEmailError: any = ElementRef;
  @ViewChild('removePasswordError') thisPasswordError: any = ElementRef;

  form: any = FormGroup;
  userInfo: UserInfo[] = [];

  constructor(public router:Router, private formBuilder: FormBuilder, http: HttpClient, private renderer: Renderer2) {}

  ngOnInit() {
    this.form = new RegisterPageForm(this.formBuilder).createForm();
    console.log(this.form);
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  private dataService = inject(RegisterService);
  checkExistingUser: any;
  data: any;
  emailError: any;
  passwordError: any;
  userExists: any;
  removeEmailError: any;

  submitRegistration(formData: any) {
    console.log(formData);
    this.dataService.checkUserExists(formData).subscribe((results: any) => {
      this.checkExistingUser = results.status;
      console.log(results)
      if (this.checkExistingUser != 1) {
        this.dataService.registerUser(formData).subscribe((results: UserInfo) => {
          console.log(results);
          this.data = results;
          if (this.data.status == 1) {
            this.router.navigateByUrl('/login');
            this.dataService.sendEmailConfirm(formData).subscribe((results: any) => {
              console.log(results);
            })
          } 
        })
      } else {
        this.userExists = results.message;
        this.hideEmailError(this.userExists);
      }
    });
  }

  hideEmailError(data: any) {
    setTimeout(() => {
      this.removeEmailError = 1;
  }, 3000);
  }
}
