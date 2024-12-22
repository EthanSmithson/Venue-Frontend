import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonButton, IonIcon, IonMenu, IonMenuToggle, IonToast, IonMenuButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { FindEvents } from 'src/app/services/findEvents.service';
import { inject } from '@angular/core';
import { heart } from 'ionicons/icons';
import { addIcons } from 'ionicons'; 
import { EventDetailsService } from 'src/app/services/eventDetails.service';
import { Router, NavigationEnd } from '@angular/router';
import { UiUxService } from 'src/app/services/UiUx.service';
import { CookieService } from 'ngx-cookie-service';
import { IsSaved } from 'src/app/services/isSaved.service';
import { Platform } from '@ionic/angular/standalone';
import { NavHome } from 'src/app/services/navHome.service';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.page.html',
  styleUrls: ['./venue.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonButton, IonIcon, IonMenu, IonMenuToggle, IonToast, IonMenuButton]
})
export class VenuePage implements OnInit {

  private FindEvents = inject(FindEvents);
  private EventsDetails = inject(EventDetailsService);
  private UiUxService = inject(UiUxService);
  private Navhome = inject(NavHome);
  eventsList: any;
  eventDetails: any;
  venueId: any;
  eventId: any;
  activatedBtn: any;
  isToastOpen = false;
  eventName: String;
  eventImages: String;
  eventStartDate: String;
  eventStartTime: String;
  eventTickets: String;
  userId: String;
  venueName: String;
  
  constructor(private route: ActivatedRoute, private router: Router,  private cookieService: CookieService, public isSaved: IsSaved, public platform: Platform) { }

  ngOnInit() {
    addIcons({ heart });
    this.activatedBtn = [];

    this.venueId = this.route.snapshot.queryParams['venueId'];
    this.venueName = this.route.snapshot.queryParams['venueName'] ? this.route.snapshot.queryParams['venueName'] : this.route.snapshot.queryParams['venueNameMap'] ;

    this.FindEvents.getVenuesEvents({"venueId": this.venueId}).subscribe((results: any) => {
      console.log(results)
      this.eventsList = results.venueEvents;
    });

    this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
      console.log(results);
      this.userId = results.userId;
      this.EventsDetails.getSavedEvents({ "myCookie": results.userId }).subscribe((results: any) => {
        console.log(results)
        for (let i = 0; i < results.length; i++) {
          console.log(results[i].eventId)
          this.activatedBtn.push(results[i].eventId)
        }
      });
    })

  }

  ionViewWillEnter(){
    this.activatedBtn = []
    console.log(this.isSaved.comingFromPageEvents)
    if(this.isSaved.comingFromPageEvents){
      this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
        console.log(results);
        this.EventsDetails.getSavedEvents({ "myCookie": results.userId }).subscribe((results: any) => {
          console.log(results)
          for (let i = 0; i < results.length; i++) {
            console.log(results[i].eventId)
            this.activatedBtn.push(results[i].eventId)
            this.isSaved.comingFromPageEvents = false;
          }
        });
      })
     }
  }

  openEventMenu(eventId: any) {
    this.router.navigate(['/event'], { queryParams: { eventId: eventId } });
  }

  saveEvent(eventId: any) {
    if (this.activatedBtn.includes(eventId)) {
      const index = this.activatedBtn.indexOf(eventId);
      if (index > -1) {
        this.activatedBtn.splice(index, 1);
      }
      // this.activatedBtn.remove(eventId)
      this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
        console.log(results);
        this.EventsDetails.removeEvent({"eventId": eventId, "userId": results.userId, "venueId": this.venueId}).subscribe((results: any) => {
          console.log(results)
          // this.eventDetails = results
        });
      })
    } else {
      this.activatedBtn.push(eventId)
      // console.log(this.activatedBtn)
      this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
        console.log(results);
        this.EventsDetails.getEventDetails({"eventId": eventId}).subscribe((results: any) => {
          console.log(results);
          this.eventDetails = results.venueEvents[0];
          console.log(this.eventDetails);
          console.log("************************")
          this.eventName = this.eventDetails.name;
          this.eventImages = this.eventDetails.images[0].url;
          this.eventTickets = this.eventDetails.url;
          this.eventId = this.eventDetails.id;
          this.venueId = this.eventDetails._embedded.venues[0].id;
          this.eventStartDate = this.formatDate(this.eventDetails.dates.start.localDate).toString().replace(/(^|-)0+/g, "$1");
          console.log(this.eventDetails.dates.start.localTime.slice(0, 5).toString())
          this.eventStartTime = this.convertTo12Hour(this.eventDetails.dates.start.localTime.slice(0, 5).toString());
          console.log(this.eventStartTime)
          this.EventsDetails.saveEvent({"eventId": eventId, "userId": this.userId, "venueId": this.venueId, "eventName": this.eventName, "eventImage": this.eventImages, "eventStartDt": this.eventStartDate, "eventStartTm": this.eventStartTime, "eventTickets": this.eventTickets}).subscribe((results: any) => {
            console.log(results)
            // {"eventId": eventId, "userId": results.userId, "venueId": this.venueId, "eventName": this.eventName, "eventImage": this.eventImages, "eventStartDt": this.eventStartDate, "eventStartTm": this.eventStartTime, "eventTickets": this.eventTickets}
            // this.eventDetails = results
          });
        });
      });
      this.setOpen(true);
    }
    // if (this.isSaved.isSaved !== 1) {
    //   this.setOpen(true);
    // }
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  formatDate(dateString: any) {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  }

  convertTo12Hour(time24: any) {
    let [hours, minutes] = time24.split(':');
    console.log(hours, minutes)
    let period = 'AM';
  
    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }
  
    return `${hours}:${minutes} ${period}`;
  }

  clickedVenueBackBtn() {
    this.Navhome.navHome = true;
  }

}
