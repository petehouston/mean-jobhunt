import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

const API_URL = `http://localhost:4000/api/jobs`;

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(private http: HttpClient) {}

  getLatestJobs() {
    return this.http.get(`${API_URL}/latest`);
  }

  getVisaSponsorJobs() {
    return this.http.get(`${API_URL}/visa-sponsor`);
  }

  getRemoteJobs() {
    return this.http.get(`${API_URL}/remote-jobs`);
  }

  getHighSalariesJobs() {
    return this.http.get(`${API_URL}/high-salary`);
  }
}
