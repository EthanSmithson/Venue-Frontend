import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../pages/register/registerUser';


@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    baseUrl: string = "https://www.venueapp.live/api/users";

    constructor(private http: HttpClient) { }

    getProfileData(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        // const formDataJson = JSON.stringify(formData);
        console.log(formData)
        return this.http.get<UserInfo>(
            this.baseUrl + `/getProfileData/${formData.userId}`, {headers: headers}
        ); 
    }

    updateProfile(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'}  
        const formDataJson = JSON.stringify(formData);
        console.log(formData)
        return this.http.post<UserInfo>(
            this.baseUrl + '/updateProfile', formDataJson, {headers: headers}
        );
    }

    uploadProfileImage(formData: any): Observable<any> {
        const uploadFile = new FormData();
        uploadFile.append("file", formData.file);
        return this.http.post<any>(
            'https://www.venueapp.live/uploadProfileImage', uploadFile
        );
    }

    uploadProfileImageToDb(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'}  
        const formDataJson = JSON.stringify(formData);
        console.log(formDataJson)
        return this.http.post<any>(
            this.baseUrl + '/uploadProfileImageToDb', formDataJson, {headers: headers}
        );
    }

}