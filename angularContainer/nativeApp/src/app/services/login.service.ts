import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    baseUrl: string = "https://www.venueapp.live/";

    constructor(private http: HttpClient) { }

    loginUser(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};  
        const formDataJson = JSON.stringify(formData);
        // console.log(formData)
        return this.http.get<any>(
            this.baseUrl + `api/users/login/${formData.email}/${formData.password}`, {headers: headers}
        );
    }

    isConfirmed(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};  
        const formDataJson = JSON.stringify(formData);
        // console.log(formData)
        return this.http.get<any>(
            this.baseUrl + `api/users/login/${formData.email}`, {headers: headers}
        );
    }

}