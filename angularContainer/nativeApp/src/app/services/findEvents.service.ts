import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class FindEvents {

    baseUrl: string = "https://www.venueapp.live";

    constructor(private http: HttpClient) { }

    getUserId(data: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        console.log(data)
        return this.http.get<any>(
            this.baseUrl + `/api/users/getId/${data.myCookie}`, {headers: headers}
        );
    }

    addPackage(data: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        const formDataJson = JSON.stringify(data);
        console.log(data)
        return this.http.post<any>(
            this.baseUrl + `/api/users/createPackage`, formDataJson, {headers: headers}
        ); 
    }

    getSlug(data: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        console.log(data)
        return this.http.get<any>(
            this.baseUrl + `/api/users/getSlug/${data.trackingNumber}`, {headers: headers}
        );
    }

    getVenues(data: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        const formDataJson = JSON.stringify(data);
        console.log(data)
        return this.http.post<any>(
            this.baseUrl + `/api/users/getMyVenues`, formDataJson, {headers: headers}
        );
    }

    getVenuesEvents(data: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        const formDataJson = JSON.stringify(data);
        console.log(data)
        return this.http.post<any>(
            this.baseUrl + `/api/users/getMyVenuesEvents`, formDataJson, {headers: headers}
        );
    }

    removePackage(trackingNumber: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        const formDataJson = JSON.stringify(trackingNumber);
        return this.http.post<any>(
            this.baseUrl + `/api/users/removePackage`, formDataJson, {headers: headers}
        ); 
    }

}