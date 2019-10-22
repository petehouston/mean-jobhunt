import {Injectable} from "@angular/core";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {environment as env} from "../../environments/environment";

const BASE_URL = `${env.api.basepath}/api/jobs`;
const LATEST_API = `${BASE_URL}/${env.api.routes['api/jobs'].latest}`;
const VISA_SPONSOR_API = `${BASE_URL}/${env.api.routes['api/jobs'].visa_sponsor}`;
const REMOTE_JOBS_API = `${BASE_URL}/${env.api.routes['api/jobs'].remote_jobs}`;
const HIGH_SALARY_API = `${BASE_URL}/${env.api.routes['api/jobs'].high_salary}`;
const JOB_INFO_API = `${BASE_URL}`; // add: /:job_id

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(private http: HttpClient) {}

  getLatestJobs() {
    return this.http.get(LATEST_API);
  }

  getVisaSponsorJobs() {
    return this.http.get(VISA_SPONSOR_API);
  }

  getRemoteJobs() {
    return this.http.get(REMOTE_JOBS_API);
  }

  getHighSalariesJobs() {
    return this.http.get(HIGH_SALARY_API);
  }

  getJobInfo(jobId: string) {
    return this.http.get(`${JOB_INFO_API}/${jobId}`);
  }

  postJobApplication(jobId: string, {name, email, resume}) {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('resume', resume);

    const req = new HttpRequest('POST', `${JOB_INFO_API}/${jobId}/apply`, formData);
    return this.http.request(req);
  }
}
