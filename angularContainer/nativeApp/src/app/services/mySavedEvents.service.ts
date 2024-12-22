import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../pages/register/registerUser';


@Injectable({
    providedIn: 'root'
})
export class MySavedEvents {

    baseUrl: string = "https://www.venueapp.live";

    constructor(private http: HttpClient) { }

    getSavedEvents(data: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        // console.log("testing this " + data.myCookie)
        return this.http.get<any>(
            this.baseUrl + `/api/users/getSavedEvents/${data.userId}`, {headers: headers}
        );
    }

    getMySavedEvents(data: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        // console.log("testing this " + data.myCookie)
        return this.http.get<any>(
            this.baseUrl + `/api/users/getMySavedEvents/${data.userId}`, {headers: headers}
        );
    }

}