import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {environment as env} from "../../environments/environment";

const API_URL = `${env.api.basepath}/api/u/profile`;

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(API_URL);
  }

  changePassword(pwd: string) {
    return this.http.patch(`${API_URL}/change-password`, {password: pwd});
  }
}
