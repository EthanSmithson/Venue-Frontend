import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OpenMap {

    baseUrl: string = "https://www.venueapp.live/";

    constructor(private http: HttpClient) { }

    isOpenMap: boolean;
    latLng: object;

}