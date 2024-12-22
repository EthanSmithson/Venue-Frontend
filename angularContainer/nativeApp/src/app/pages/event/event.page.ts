import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonBackButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonImg, IonItem, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonIcon, IonToast, IonRippleEffect, IonRow, IonCol, IonGrid, IonMenuButton } from '@ionic/angular/standalone';
import { EventDetailsService } from 'src/app/services/eventDetails.service';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { heart } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { GoogleMapsModule } from "@angular/google-maps";
import { Loader } from "@googlemaps/js-api-loader"
import { ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UiUxService } from 'src/app/services/UiUx.service';
import { IsSaved } from 'src/app/services/isSaved.service';
import { Router } from '@angular/router';
import { OpenMap } from 'src/app/services/openMap.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonImg, IonItem, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonIcon, GoogleMapsModule, IonToast, IonRippleEffect, IonRow, IonCol, IonGrid, IonMenuButton ]
})
export class EventPage implements AfterViewInit {

  @ViewChild('mapEl') mapEl!: ElementRef;

  private EventsDetails = inject(EventDetailsService);
  private UiUxService = inject(UiUxService);
  eventDetails: any
  eventName: String;
  eventImages: String;
  eventStartDate: String;
  eventStartTime: String;
  eventTickets: String;
  eventId: number;
  LatLng: any;
  // isSaved: number;
  venueId: any;
  userId: number;
  isToastOpen = false;
  
  constructor(private route: ActivatedRoute, private cookieService: CookieService, public isSaved: IsSaved, private router: Router, public openMap: OpenMap) { }

  ngAfterViewInit() {

    addIcons({ heart })
    
    this.EventsDetails.getEventDetails({"eventId": this.route.snapshot.queryParams['eventId']}).subscribe((results: any) => {
      console.log(results);
      this.eventDetails = results.venueEvents[0];
      console.log(this.eventDetails);
      this.eventName = this.eventDetails.name;
      this.eventImages = this.eventDetails.images[0].url;
      this.eventTickets = this.eventDetails.url;
      this.eventId = this.eventDetails.id;
      this.venueId = this.eventDetails._embedded.venues[0].id;
      this.eventStartDate = this.formatDate(this.eventDetails.dates.start.localDate).toString().replace(/(^|-)0+/g, "$1");
      console.log(this.eventDetails.dates.start.localTime.slice(0, 5).toString())
      this.eventStartTime = this.convertTo12Hour(this.eventDetails.dates.start.localTime.slice(0, 5).toString());
      console.log(this.eventStartTime)
      this.LatLng = { "lat": Number(this.eventDetails._embedded.venues[0].location.latitude), "lng" : Number(this.eventDetails._embedded.venues[0].location.longitude) }
      console.log(this.LatLng)

      let map;
      async function initMap(myMap: any, latLng: any): Promise<void> {

        // Request needed libraries.
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        // The map, centered at Uluru
        map = new Map(
          myMap,
          {
            zoom: 11,
            center: latLng,
            mapId: "DEMO_MAP_ID",
            styles: 
            [
              {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.business",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "stylers": [
                  {
                    "visibility": "simplified"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "transit",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              }
            ]
          }
        );

        // The marker, positioned at Uluru
        const marker = new AdvancedMarkerElement({
          map: map,
          position: latLng ? latLng : results,
          title: 'Venue'
        });
      }
      initMap(this.mapEl.nativeElement, this.LatLng);

      this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
        console.log(results);
        this.EventsDetails.getSavedEvent({"eventId": this.route.snapshot.queryParams['eventId'], userId: results.userId}).subscribe((results: any) => {
          this.isSaved.isSaved = results.isSaved
          console.log(this.isSaved.isSaved)
        })
      })
      
      });

  }

  isEventSaved(eventId: number) {
    console.log(eventId)
    this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
      this.userId = results.userId;
      this.EventsDetails.getSavedEvent({"eventId": this.route.snapshot.queryParams['eventId'], userId: results.userId}).subscribe((results: any) => {
        this.isSaved.isSaved = results.isSaved;
        if (this.isSaved.isSaved == 1) {
          this.EventsDetails.removeEvent({"eventId": eventId, "userId": this.userId, "venueId": this.venueId}).subscribe((results: any) => {
            console.log(results)
            this.isSaved.isSaved = 0;
          });
        } else {
          this.EventsDetails.saveEvent({"eventId": eventId, "userId": this.userId, "venueId": this.venueId, "eventName": this.eventName, "eventImage": this.eventImages, "eventStartDt": this.eventStartDate, "eventStartTm": this.eventStartTime, "eventTickets": this.eventTickets}).subscribe((results: any) => {
            console.log(results)
            this.isSaved.isSaved = 1;
          });
        }
      })
    })
    if (this.isSaved.isSaved !== 1) {
      this.setOpen(true);
    }
  }

  redirectToTickets(redirectLink: any) {
    console.log(redirectLink)
    window.location.href = redirectLink;
  }

  clickedEventsBackBtn() {
    this.isSaved.comingFromPageEvents = true;
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

  viewMap(latLng: any) {
    setTimeout(() => {
      this.openMap.latLng = latLng;
      this.openMap.isOpenMap = true; 
      this.router.navigate(['/home']);
    }, 100);
    
  }

}
