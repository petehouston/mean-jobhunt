import {Injectable} from "@angular/core";
import {HttpClient, HttpRequest} from "@angular/common/http";

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

  getJobInfo(jobId: string) {
    return this.http.get(`${API_URL}/${jobId}`);
  }

  postJobApplication(jobId: string, {name, email, resume}) {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('resume', resume);

    const req = new HttpRequest('POST', `${API_URL}/${jobId}/apply`, formData);
    return this.http.request(req);
  }
}
