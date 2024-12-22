import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonAvatar, IonRippleEffect, IonButton, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { UiUxService } from './services/UiUx.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { OpenProfileService } from './services/open-profile.service';
import { ResourceLoader } from '@angular/compiler';
import { homeOutline, mapOutline, musicalNotesOutline, personOutline } from 'ionicons/icons';
import { ProfileService } from './services/profile.service';
import { ProfileImageService } from './services/profile-image.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, AsyncPipe, HttpClientModule, IonAvatar, IonRippleEffect, IonButton, IonFooter],
})
export class AppComponent {
  public appPages = [
  ];

  myEmail: String;
  menuDisabled: boolean;
  UiUxService = inject(UiUxService);
  cookieService = inject(CookieService);
  OpenProfileService = inject(OpenProfileService);
  ProfileService = inject(ProfileService);
  ProfileImageService = inject(ProfileImageService);
  myProfileImage: string;
  
  @ViewChild('mainMenu') mainMenu!: any;

  constructor(private router: Router, private el: ElementRef) {} 

  ngOnInit() {
    addIcons({homeOutline, mapOutline, musicalNotesOutline, personOutline})
    this.OpenProfileService.isNowLoggedIn.subscribe(
      (result) => {
        console.log("Now logged in!")
        console.log(result);
        this.myEmail = this.cookieService.get("myCookie");

        this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
          console.log(results);
          this.ProfileService.getProfileData({"userId": results.userId}).subscribe((result) => {
            console.log(result[0].profilePicture);
            // this.ProfileImageService.profileImageString = result[0].profilePicture;
            this.myProfileImage = result[0].profilePicture;
          })
        });

        this.ProfileImageService.profileImageString.subscribe(value => {
          this.myProfileImage = value;
        })
      });
  }

  navigateTab(tabNum : number) { 
    this.router.navigateByUrl('/home')
    setTimeout(() => {
      let backdrop = document.getElementById("hamburgerBtn")?.children[0]
      console.log(backdrop)
      let event = new Event('click')
      backdrop?.dispatchEvent(event)
      this.OpenProfileService.openingProf(tabNum);
    }, 80)
  }

  logout() {
    let backdrop = document.getElementById("hamburgerBtn")?.children[0]
    let event = new Event('click')
    backdrop?.dispatchEvent(event)
    this.router.navigateByUrl('/login');
  }



}