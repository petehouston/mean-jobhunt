import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

const API_URL = `http://localhost:4000/api/u/profile`
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get('http://localhost:4000/api/u/profile');
  }

  changePassword(pwd: string) {
    return this.http.patch(`${API_URL}/change-password`, {password: pwd});
  }
}
