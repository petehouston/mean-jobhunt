import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs/operators";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:4000/api/u/jobs';

@Injectable({
  providedIn: 'root'
})
export class UserJobsService {
  constructor(private http: HttpClient) {}

  addJob({ title, company, location, is_remote, visa_sponsor, job_type, salary_range }) : Observable<Object> {
    return this.http.post(`${API_URL}`, { title, company, location, is_remote, visa_sponsor, job_type, salary_range } );
  }

  listJobs() : Observable<Object> {
    return this.http.get(`${API_URL}`);
  }

  getJob(jobId: string) {
    return this.http.get(`${API_URL}/${jobId}`);
  }

  updateJob(jobId: string, {title, company, location, is_remote, visa_sponsor, job_type, salary_range, description, requirement }) : Observable<Object> {
    return this.http.patch(`${API_URL}/${jobId}`, {title, company, location, is_remote, visa_sponsor, job_type, salary_range, description, requirement });
  }
}
