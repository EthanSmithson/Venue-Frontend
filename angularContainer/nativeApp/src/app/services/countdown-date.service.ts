import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountdownDateService {

  constructor() { }

  eventDate: Date;
}
