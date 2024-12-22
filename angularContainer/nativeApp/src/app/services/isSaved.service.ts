import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IsSaved {

    constructor(private http: HttpClient) { }

    isSaved: number;
    comingFromPageEvents: boolean;

}