import { EventEmitter, Injectable } from '@angular/core';
import { exit } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class OpenProfileService {

  openedProf =  new EventEmitter<any>();
  isNowLoggedIn = new EventEmitter<any>();

  constructor() { }

  whichTab: number;
  isLoggedIn: boolean;

  openingProf(tabNum: number) {
    this.whichTab = tabNum;

    this.openedProf.emit(this.whichTab);
  }

  isNowLoggedInFunc(value: boolean) {
    this.isLoggedIn = value; 
    this.isNowLoggedIn.emit(this.isLoggedIn);
  }

}
