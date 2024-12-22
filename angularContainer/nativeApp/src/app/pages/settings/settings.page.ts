import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonToggle, IonIcon, IonLabel, IonToast, IonMenuButton } from '@ionic/angular/standalone';
import { ProfileUpdateForm } from './form/settingsProfile.form';
import { ProfileService } from 'src/app/services/profile.service';
import { UiUxService } from 'src/app/services/UiUx.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonList, IonItem, ReactiveFormsModule, IonInput, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonToggle, IonIcon, IonLabel, IonToast, IonMenuButton]
})
export class SettingsPage implements OnInit {

  form: any = FormGroup;
  ProfileService = inject(ProfileService);
  UiUxService = inject(UiUxService);
  myId: Number;
  firstName: String;
  lastName: String;
  phoneNumber: any;
  password: string;
  email: String;
  settingOption: number;

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private route: ActivatedRoute) { }

  ngOnInit() {

    addIcons({ moonOutline, sunnyOutline })
    this.form = new ProfileUpdateForm(this.formBuilder).createForm();
    console.log(this.form)
    this.settingOption = Number(this.route.snapshot.queryParams['setting'])

    this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
      console.log(results);
      this.myId = results.userId;
      this.ProfileService.getProfileData({ "userId": this.myId }).subscribe((results) => {
        console.log(results)
        this.firstName = results[0].firstName;
        this.lastName = results[0].lastName;
        this.email = results[0].email;
        this.phoneNumber = results[0].phoneNumber;
        this.password = results[0].password;
      })
    })

  }

  submitProfileUpdate(formData: any) {
    console.log(formData);
    formData.firstName = formData.firstName ? formData.firstName : this.firstName
    formData.lastName = formData.lastName ? formData.lastName : this.lastName
    formData.phoneNumber = formData.phoneNumber ? formData.phoneNumber : this.phoneNumber
    formData.email = formData.email ? formData.email : this.email

    if (formData.password == formData.confirmPassword && formData.password.length >= 6) {
      formData.password = formData.password ? formData.password : this.password
    } else {
      formData.password = this.password;
    }
    
    formData.userId = this.myId
    this.ProfileService.updateProfile({data: formData}).subscribe((results) => {
      console.log(results);
      if (results.status == 1) {

      }
    })
  }

}
