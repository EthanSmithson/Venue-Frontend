import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResetEmailService {

    baseUrl: string = "https://www.venueapp.live/";

    constructor(private http: HttpClient) { }


    checkUserExists(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        console.log(formData)
        return this.http.get<any>(
            this.baseUrl + `api/users/find/${formData.email}`, {headers: headers}
        ); 
    }


    sendRestEmail(formData: any) {
        const headers = { 'content-type': 'application/json'}  
        const formDataJson = JSON.stringify(formData);
        // console.log(formData)
        return this.http.post<any>(
            this.baseUrl + 'resetEmail', formDataJson, {headers: headers}
        );
    }

}