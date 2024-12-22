import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../pages/register/registerUser';


@Injectable({
    providedIn: 'root'
})
export class TicketMasterApiService {

    baseUrl: string = "https://www.venueapp.live";

    constructor(private http: HttpClient) { }

    createTracking(formData: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        const formDataJson = JSON.stringify(formData);
        console.log(formData)
        return this.http.post<any>(
            this.baseUrl + `/api/users/createTracking`, formDataJson, {headers: headers}
        ); 
      }

      trackOrder(): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        const formData = {
          "carrier": "shippo",
          "trackingNumber": "SHIPPO_TRANSIT"
        }
        const formDataJson = JSON.stringify(formData);
        return this.http.get<any>(
            this.baseUrl + `/api/users/trackMyPackages`, {headers: headers}
        ); 
    }

    geoHashing(data: any): Observable<any> {
        const headers = { 'content-type': 'application/json'};
        const formDataJson = JSON.stringify(data);
        console.log("this is it" + data)
        return this.http.post<any>(
            this.baseUrl + `/api/users/geoHash`, formDataJson, {headers: headers}
        ); 
    }

    getCurrentLocation():Promise<any> {
        return new Promise((resolve, reject) => {

            navigator.geolocation.getCurrentPosition(resp => {
      
                resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
              },
              err => {
                reject(err);
              });
          });
      }

}