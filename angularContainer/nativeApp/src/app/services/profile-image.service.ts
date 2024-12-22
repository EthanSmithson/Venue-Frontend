import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  constructor() { }

  private profileImageChange = new Subject<any>();

  profileImageString: Observable<any> = this.profileImageChange.asObservable();

  setFileName(value: any) {
    this.profileImageChange.next(value);
  }


}
