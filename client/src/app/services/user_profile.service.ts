import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get('http://localhost:4000/api/u/profile');
  }
}
