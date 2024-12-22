import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../pages/register/registerUser';


@Injectable({
    providedIn: 'root'
})
export class UiUxService {

    baseUrl: string = "https://www.venueapp.live";

    constructor(private http: HttpClient) { }

    getMe(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        return this.http.get<any>(
            this.baseUrl + `/api/users/getMe/${formData.myCookie}`, {headers: headers}
        ); 
    }

    getMyId(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        return this.http.get<any>(
            this.baseUrl + `/api/users/getMyId/${formData.myCookie}`, {headers: headers}
        ); 
    }

    getEmail(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        return this.http.get<any>(
            this.baseUrl + `/api/users/getEmail/${formData.myCookie}`, {headers: headers}
        ); 
    }

}