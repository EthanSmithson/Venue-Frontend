import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonButton, IonList, IonButtons, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFab, IonFabButton, IonFabList, IonPopover, IonInput, IonLabel, IonCol, IonNote, IonText, IonAvatar, IonRippleEffect, IonAccordion, IonAccordionGroup, IonModal, IonCheckbox, IonImg, IonGrid, IonRow, IonAlert, IonSearchbar, IonRefresher, IonRefresherContent, IonMenuButton} from '@ionic/angular/standalone';
import { homeOutline, cubeOutline, cogOutline, personOutline, mapOutline, addOutline, add, musicalNotesOutline, searchOutline, trashOutline, fileTray } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PackageCreationForm } from './form/eventSearch.page.form';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FindEvents } from 'src/app/services/findEvents.service';
import { TicketMasterApiService } from 'src/app/services/ticketMasterApi.service';
import { inject, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { UiUxService } from 'src/app/services/UiUx.service';
import { CheckboxCustomEvent } from '@ionic/angular/standalone';
import { ActionSheetController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OpenMap } from 'src/app/services/openMap.service';
import { Output, EventEmitter } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { MySavedEvents } from 'src/app/services/mySavedEvents.service';
import { EventDetailsService } from 'src/app/services/eventDetails.service';
import { NavHome } from 'src/app/services/navHome.service';
import { CountdownPage } from '../countdown/countdown.page';
import { CountdownDateService } from 'src/app/services/countdown-date.service';
import { ClickedOutsideDirective } from './directive/clicked-outside.directive';
import { FocusSearchbarDirective } from './directive/focus-searchbar.directive';
import { OpenProfileService } from 'src/app/services/open-profile.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileImageService } from 'src/app/services/profile-image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CountdownPage, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonButton, IonList, IonButtons, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFab, IonFabButton, IonFabList, IonPopover, IonInput, ReactiveFormsModule, IonLabel, IonCol, IonNote, IonText, IonAvatar, IonRippleEffect, IonAccordion, IonAccordionGroup, IonModal, IonCheckbox, IonImg, IonGrid, IonRow, IonAlert, IonSearchbar, ClickedOutsideDirective, FocusSearchbarDirective, IonRefresher, IonRefresherContent, IonMenuButton]
})
export class HomePage implements OnInit {

  form: any = FormGroup;
  presentingElement: any = null;
  latLng: any;
  savedEvents: any;
  // openMap: boolean;
  @ViewChild('mapTab') mapTab!: ElementRef;
  @ViewChild('profTab') profTab!: ElementRef;
  @ViewChild('homeTab') homeTab!: ElementRef;
  @ViewChild('eventsTab') eventsTab!: ElementRef;
  mapTabBtn: any;
  profTabBtn: any;
  homeTabBtn: any;
  eventsTabBtn: any;
  @ViewChild('mapEl') mapEl!: ElementRef;
  @ViewChild('svgPerson') svgPerson!: ElementRef;
  @ViewChild('openModal') openModal!: ElementRef;
  @ViewChild('searchbar') searchbar!: ElementRef;
  @ViewChild('searchbar') searchbarAlter!: any;
  @ViewChild('searchbarV2') searchbarAlterV2!: any;
  @ViewChild('searchbarV2') searchbarAlterV2Focus!: IonSearchbar;
  @ViewChild('searchbarItem') searchbarItem!: any;
  @ViewChild('fabBtnV2') fabBtnV2!: any;
  @ViewChild('hamburgerBtn') hamburgerBtn: any;
  @ViewChild('profileUpload') profileUpload: any;
  eventModal: any;
  isModalOpen = false;
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
  seatMap: any;
  searchResults: any;
  searchResultsV2: any;
  mapAlert: boolean;
  _this: this = this;
  filterTheseEvents: Array<any>;
  myProfileImage: any;
  
  
  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private renderer: Renderer2, private actionSheetCtrl: ActionSheetController, public router:Router, public route: ActivatedRoute, public openMap: OpenMap, public el: ElementRef) { }

  ngOnInit() {
    addIcons({ homeOutline, cubeOutline, cogOutline, personOutline, mapOutline, addOutline, add, musicalNotesOutline, searchOutline, trashOutline })

    this.form = new PackageCreationForm(this.formBuilder).createForm();
    console.log(this.form);
    this.eventModal = document.querySelector('.eventPage');
    this.searchResults = null
    this.searchResultsV2 = null
    this.filterTheseEvents = []

    this.OpenProfileService.openedProf.subscribe(
      (result) => {
        // console.log(this.hamburgerBtn)
        // this.hamburgerBtn.el.click();
        switch (result) {
          case 1:
            this.profTabBtn = this.profTab
            this.profTabBtn.el.click();
            break
          case 2:
            this.homeTabBtn = this.homeTab
            this.homeTabBtn.el.click();
            break
          case 3:
            this.mapTabBtn = this.mapTab
            this.mapTabBtn.el.click();
            break
          case 4:
            this.eventsTabBtn = this.eventsTab
            this.eventsTabBtn.el.click();
            break
        }
      }
    );

    this.TicketMasterApiService.getCurrentLocation().then(results => {
      console.log(results);
      this.TicketMasterApiService.geoHashing(results).subscribe((results: any) => {
        console.log(results.geoHash)
        if (results.geoHash) {
          this.FindEvents.getVenues(results).subscribe((results: any) => {
            console.log(results.nearbyVenues)
            let eventsList = [];
            for (let i=0; i<results.nearbyVenues.length; i++) {
              if (results.nearbyVenues[i].images[0].url) {
                eventsList.push(results.nearbyVenues[i])
              }
              this.events = eventsList
            }
          })
        }
      })
    })

    this.myProfileImage = this.ProfileImageService.profileImageString 

    this.UiUxService.getMe({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
      console.log(results);
      this.myName = results.firstName;
    })

    this.OpenProfileService.isNowLoggedInFunc(true);

    this.presentingElement = document.querySelector('.ion-page');

    if (this.openMap.latLng) {
      this.latLng = this.openMap.latLng
    } else {
      // this.latLng = 
    }

    this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
      console.log(results);
      this.ProfileService.getProfileData({"userId": results.userId}).subscribe((result) => {
        console.log(result[0].profilePicture);
        this.ProfileImageService.profileImageString = result[0].profilePicture;
        this.myProfileImage = result[0].profilePicture;
        console.log(this.ProfileImageService.profileImageString + " " + this.myProfileImage)
      })
    });

    this.ProfileImageService.profileImageString.subscribe(value => {
      this.myProfileImage = value;
    })

  }

  ionViewWillEnter() {
     if (this.openMap.isOpenMap) {
        this.openMapTab();
      }
      this.searchResults = null
      this.searchResultsV2 = null

      this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
        console.log(results);
        this.MySavedEvents.getSavedEvents({ "userId": results.userId }).subscribe((results: any) => {
          this.savedEvents = results;
          console.log(this.savedEvents)
        });
      });

      if (this.navHome.navHome) {
        this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
          console.log(results);
          this.MySavedEvents.getMySavedEvents({"userId": results.userId}).subscribe((results) => {
            this.savedEvents = results;
          });
        });
        this.navHome.navHome = false;
      }
      this.UiUxService.getMe({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
        console.log(results);
        this.myName = results.firstName;
      })
  }

  // canDismiss = async () => {
  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: 'Are you sure?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         role: 'confirm',
  //       },
  //       {
  //         text: 'No',
  //         role: 'cancel',
  //       },
  //     ],
  //   });

  //   actionSheet.present();

  //   const { role } = await actionSheet.onWillDismiss();

  //   return role === 'confirm';
  // };

  @ViewChild("removeLabelInUseError") thisLabelError: any = ElementRef;

  private FindEvents = inject(FindEvents);
  private TicketMasterApiService = inject(TicketMasterApiService);
  private UiUxService = inject(UiUxService);
  private MySavedEvents = inject(MySavedEvents);
  private EventsDetails = inject(EventDetailsService);
  private navHome = inject(NavHome);
  private CountdownDate = inject(CountdownDateService);
  private OpenProfileService = inject(OpenProfileService);
  private ProfileService = inject(ProfileService);
  private ProfileImageService = inject(ProfileImageService);
  userId: any;
  labelInUseError: any;
  labelCreatedAlert: any;
  packages: any;
  myName: any;
  events: any;

  submitPackage(formData: any) {
    let myCookie = this.cookieService.get("myCookie");
    formData["myCookie"] = myCookie;
    console.log(formData);
    this.FindEvents.getUserId(formData).subscribe((results: any) => {
      console.log(results);
      this.userId = results.userId;
      console.log(this.userId);
      if (this.userId != null) {
        formData['userId'] = this.userId;
        this.FindEvents.getSlug(formData).subscribe((results: any) => {
          // console.log(results)
          formData['slug'] = results.slug;
          // console.log(formData);
          if (results.slug != undefined && results.slug != null) {
            this.FindEvents.addPackage(formData).subscribe((results: any) => {
              console.log(results);
              if (results.dupe) {
                console.log(this.thisLabelError)
                this.labelInUseError = "Tracking Number is in Use.";
                // this.hideLabelError(this.labelInUseError);
              } else {
                this.TicketMasterApiService.createTracking(formData).subscribe((results: any) => {
                  console.log(results);
                })
                this.labelCreatedAlert = "Package Added!";
                this.hideLabelAlert(this.labelCreatedAlert);
              }
            })
          }
        })
      }
    })
  }

  removeThisPackage(trackingNumber: any) {
    console.log(trackingNumber);
    this.FindEvents.removePackage({"trackingNumber": trackingNumber}).subscribe((results: any) => {
      console.log(results);
    });
  }

  hideLabelAlert(data: any) {
    setTimeout(() => {
      this.labelCreatedAlert = "";
    }, 3000);
  }

  handleClickOutside(data: any) {

  }

  openProfModal() {
    console.log("test")
  }

  onProfModalClose() {
    
  }

  viewVenue(venueId: any, venueName: string) {
    setTimeout(() => {
      this.router.navigate(['/venue'], { queryParams: { venueId: venueId, venueName: venueName } });
    }, 100);
    // this.FindEvents.getVenuesEvents({"venueId": data}).subscribe((results: any) => {
    //   console.log(results)
    // });
  }

  openMapTab() {
    this.mapTabBtn = this.mapTab;
    this.mapTabBtn.el.click();
    this.openMap.isOpenMap = false;
  }
  
  openProfTab() {
    this.profTabBtn = this.profTab;
    this.profTabBtn.el.click();
  }

  openMainMap() {

    this.TicketMasterApiService.getCurrentLocation().then(results => {
      console.log(results);
      this.TicketMasterApiService.geoHashing(results).subscribe((results: any) => {
        console.log(results.geoHash)
        if (results.geoHash) {
          this.FindEvents.getVenues(results).subscribe((results: any) => {
            console.log(results.nearbyVenues)
            let eventsList = [];
            for (let i=0; i<results.nearbyVenues.length; i++) {
              if (results.nearbyVenues[i].images[0].url) {
                eventsList.push(results.nearbyVenues[i])
              }
              this.events = eventsList
            }
          })
        }
      })
    });

    console.log(this.mapEl.nativeElement)
    console.log(this.events)
    let venuesLatLng = [];

    for (let i=0; i < this.events.length; i++) {
      venuesLatLng.push(this.events[i].location)
      venuesLatLng[i].lng = Number(venuesLatLng[i].longitude)
      venuesLatLng[i].lat = Number(venuesLatLng[i].latitude)
      venuesLatLng[i].id = this.events[i].id;
      venuesLatLng[i].name = this.events[i].name;
      delete venuesLatLng[i].latitude;
      delete venuesLatLng[i].longitude;
    }
    console.log(venuesLatLng)

    this.latLng = this.openMap.latLng

    this.TicketMasterApiService.getCurrentLocation().then(results => {
      console.log(results);
      venuesLatLng.push(results);

      let map;
      async function initMap(myMap: any, latLng: object, venuesLatLng: any, _this: any) {

        // Request needed libraries.
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        // The map, centered at Uluru
        map = new Map(
          myMap,
          {
            zoom: 12.5,
            center: latLng ? latLng : results,
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

        const myPerson = document.createElement('img');
        myPerson.id = "svgPerson";
        myPerson.style.height = "5vh";
        myPerson.src = 'https://www.svgrepo.com/show/451178/person.svg';

        let myVenueList = [];
        for (let i=0; i<venuesLatLng.length; i++) {
          const myVenue = document.createElement('div');
          myVenue.innerHTML = '<i class="fa fa-pizza-slice fa-lg"></i>';
          const faPin = new PinElement({
              scale: 1
          });
          myVenueList.push(faPin)
        }

        const marker = [];
        for (let i=0; i<venuesLatLng.length; i++) {
          console.log(venuesLatLng[i])
          marker.push(new AdvancedMarkerElement({
            map: map,
            position: venuesLatLng ? venuesLatLng[i] : results,
            title: venuesLatLng[i].id + "&venueNameMap&&=" + venuesLatLng[i].name,
            content: (venuesLatLng.length - 1) == i ? myPerson : myVenueList[i].element
          }));
        }
        for (var i=0; i<marker.length; i++) {
          console.log(marker[i].position)
          let markerPos: any = {}
          console.log(markerPos)
          markerPos.lat = marker[i].position?.lat
          markerPos.lng = marker[i].position?.lng
          markerPos.id = marker[i].title
          markerPos.name = marker[i].title.split("&&=")
          // marker[i].addEventListener("click", _this.router.navigate(['/venue'], { queryParams: { venueId: markerPos.id } }))
          marker[i].addListener("click", function(event: any) {
            console.log(markerPos)
            console.log(markerPos.name)
            _this.router.navigate(['/venue'], { queryParams: { venueId: markerPos.id, venueName: markerPos.name[markerPos.name.length - 1] } });
            // this.mapAlert = true;
          })
        }
      }

      initMap(this.mapEl.nativeElement, this.latLng, venuesLatLng, this._this);
      this.openMap.latLng = results;

      })
      
    }

    openSavedEvent(data: any) {
      this.isModalOpen = true;
      this.EventsDetails.getEventDetails({"eventId": data.eventId}).subscribe((results: any) => {
        console.log(results);
        this.eventDetails = results.venueEvents[0];
        console.log(this.eventDetails);
        this.eventName = this.eventDetails.name;
        this.eventImages = this.eventDetails.images[0].url;
        this.seatMap = this.eventDetails.seatmap.staticUrl;
        this.eventTickets = this.eventDetails.url;
        this.eventId = this.eventDetails.id;
        this.venueId = this.eventDetails._embedded.venues[0].id;
        this.eventStartDate = this.formatDate(this.eventDetails.dates.start.localDate).toString().replace(/(^|-)0+/g, "$1");
        this.eventStartTime = this.convertTo12Hour(this.eventDetails.dates.start.localTime.slice(0, 5).toString());
        this.CountdownDate.eventDate = this.eventDetails.dates.start.localDate;
        this.LatLng = { "lat": Number(this.eventDetails._embedded.venues[0].location.latitude), "lng" : Number(this.eventDetails._embedded.venues[0].location.longitude) }
      });

    }
    
    async canDismiss(data?: any, role?: string) {
      return role !== 'gesture';
    }

    closeModal() {
      this.isModalOpen = false;
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

    isEventSaved(eventId: number) {
      console.log(eventId)
    }
  
    redirectToTickets(redirectLink: any) {
      console.log(redirectLink)
      window.location.href = redirectLink;
    }

    deleteThisEvent(eventId: any) {
      console.log(eventId)
      this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
        console.log(results);
        this.EventsDetails.removeEvent({"eventId": eventId, "userId": results.userId, "venueId": this.venueId}).subscribe((results: any) => {
          console.log(results)
          this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
            console.log(results);
            this.MySavedEvents.getSavedEvents({ "userId": results.userId }).subscribe((results: any) => {
              this.savedEvents = results;
              console.log(this.savedEvents)
            });
          });
        });
      });
      this.isModalOpen = false;
    }

    public alertButtons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'Delete',
        role: 'confirm',
        handler: () => {
          console.log('Alert confirmed');
        },
      },
    ];
  
    setResult(ev: any, eventId: number) {
      console.log(`Dismissed with role: ${ev.detail.role}`);
      if (ev.detail.role === "confirm") {
        this.deleteThisEvent(eventId);
      }
    }

    setResultMap(ev: any) {
      this.mapAlert = true;
    }

    goToSettings(page: number) {
      this.router.navigate(['/settings'], { queryParams: { setting: page } });
    }

    searchKeyUp(event: any) {
      let searchKey = event.target.value;
      console.log(this.searchbar)
      if (searchKey == "") {
        this.searchResults = null
      } else {
        this.EventsDetails.searchForEvent({"searchKey": searchKey }).subscribe((results: any) => {
          console.log(results);
          for (let i=0; i<results.eventSearch._embedded.events.length; i++) {
            if (results.eventSearch._embedded.events[i].name.length > 24) {
              let cleaningName = results.eventSearch._embedded.events[i].name.slice(0, 24) + "..."; 
              results.eventSearch._embedded.events[i].name = cleaningName;
            }
          }

          for (let i=0; i<results.eventSearch._embedded.events.length; i++) {
            if (results.eventSearch._embedded.events[i]._embedded.venues[0].name.length > 15) {
              let cleaningVenueName = results.eventSearch._embedded.events[i]._embedded.venues[0].name.slice(0, 15) + "..."; 
              results.eventSearch._embedded.events[i]._embedded.venues[0].name = cleaningVenueName;
            }
          }

          this.searchResults = results.eventSearch._embedded.events
          console.log(this.searchResults)
        });
      }
    }

    filterEvents(event: any) {
      let searchKey = event.target.value
      console.log(searchKey.length)
      if (searchKey.length > 0) {
        let filteredEvents: Array<any>;
        filteredEvents = this.savedEvents.map((event: any) => {
          console.log(event)
          if (!event.eventName.toLowerCase().includes(searchKey)) {
            return event.eventId
          }
        })
        console.log(filteredEvents)
        this.filterTheseEvents = filteredEvents
      }
      console.log(this.filterTheseEvents)
    }

    handleSavedEventsRefresh(event: any) {
      setTimeout(() => {
        // Any calls to load data go here
        if (this.openMap.isOpenMap) {
          this.openMapTab();
        }
        this.searchResults = null
        this.searchResultsV2 = null
  
        this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
          console.log(results);
          this.MySavedEvents.getSavedEvents({ "userId": results.userId }).subscribe((results: any) => {
            this.savedEvents = results;
            console.log(this.savedEvents)
          });
        });
  
        if (this.navHome.navHome) {
          this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
            console.log(results);
            this.MySavedEvents.getMySavedEvents({"userId": results.userId}).subscribe((results) => {
              this.savedEvents = results;
            });
          });
          this.navHome.navHome = false;
        }
        this.UiUxService.getMe({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
          console.log(results);
          this.myName = results.firstName;
        })
        event.target.complete();
      }, 2000);
    }

    handleHomeRefresh(event: any) {
      setTimeout(() => {
        // Any calls to load data go here
        this.TicketMasterApiService.getCurrentLocation().then(results => {
          console.log(results);
          this.TicketMasterApiService.geoHashing(results).subscribe((results: any) => {
            console.log(results.geoHash)
            if (results.geoHash) {
              this.FindEvents.getVenues(results).subscribe((results: any) => {
                console.log(results.nearbyVenues)
                let eventsList = [];
                for (let i=0; i<results.nearbyVenues.length; i++) {
                  if (results.nearbyVenues[i].images[0].url) {
                    eventsList.push(results.nearbyVenues[i])
                  }
                  this.events = eventsList
                }
              })
            }
          })
        })
        event.target.complete();
      }, 2000);
    }

    searchKeyUpV2(event: any) {
      let searchKey = event.target.value;
      console.log(this.searchbar)
      if (searchKey == "") {
        this.searchResultsV2 = null
      } else {
        this.EventsDetails.searchForEvent({"searchKey": searchKey }).subscribe((results: any) => {
          console.log(results);
          for (let i=0; i<results.eventSearch._embedded.events.length; i++) {
            if (results.eventSearch._embedded.events[i].name.length > 24) {
              let cleaningName = results.eventSearch._embedded.events[i].name.slice(0, 24) + "..."; 
              results.eventSearch._embedded.events[i].name = cleaningName;
            }
          }

          for (let i=0; i<results.eventSearch._embedded.events.length; i++) {
            if (results.eventSearch._embedded.events[i]._embedded.venues[0].name.length > 15) {
              let cleaningVenueName = results.eventSearch._embedded.events[i]._embedded.venues[0].name.slice(0, 15) + "..."; 
              results.eventSearch._embedded.events[i]._embedded.venues[0].name = cleaningVenueName;
            }
          }

          this.searchResultsV2 = results.eventSearch._embedded.events.slice(0, 11);
          console.log(this.searchResults)
        });
      }
    }

    clearSearchedItems() {
      this.searchResults = null;
      this.searchResultsV2 = null
      this.searchbarAlter.el.children[0].children[2].click()
      this.searchbarAlterV2.el.children[0].children[2].click()
      this.fabBtnV2.el.fab.activated = false;
    }

    clearSearchedItemsCloseFab() {
      this.searchResults = null;
      this.searchResultsV2 = null;
      this.fabBtnV2.el.fab.activated = false;
      this.searchbarAlter.el.children[0].children[2].click()
      this.searchbarAlterV2.el.children[0].children[2].click()
    }

    focuseSearchbar() {
      console.log("its working")
      console.log(this.searchbarAlterV2Focus)
      let input = this.searchbarAlterV2Focus
      setTimeout(() => {
        input.setFocus();
      });
    }

    clickedSearchEvent(event: any) {
      this.router.navigate(['/event'], { queryParams: { eventId: event.id } });
    }

    uploadMyProfileImg() {
      this.profileUpload.nativeElement.click()
    }

    selectedProfPic(event: any) {
      console.log(event.target.files[0]);
      let file = event.target.files[0];
      this.myProfileImage = file.name;
      this.ProfileService.uploadProfileImage({"file": file}).subscribe((result) => {
        console.log(result);
        this.UiUxService.getMyId({myCookie: this.cookieService.get("myCookie")}).subscribe((results: any) => {
          let userId = results.userId;
          this.ProfileService.uploadProfileImageToDb({"fileName": this.myProfileImage, "userId": userId}).subscribe((result) => {
            console.log(result)
            this.ProfileImageService.setFileName(file.name);
            this.myProfileImage = file.name;
          });
        });
      })
    }

  }
