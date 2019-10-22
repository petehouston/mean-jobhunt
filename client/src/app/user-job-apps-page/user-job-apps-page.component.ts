import { Component, OnInit } from '@angular/core';
import {UserJobsService} from "../services/user_jobs.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-user-job-apps-page',
  templateUrl: './user-job-apps-page.component.html',
  styleUrls: ['./user-job-apps-page.component.css']
})
export class UserJobAppsPageComponent implements OnInit {
  jobId;
  job = {};
  applications: [];
  assetsUrl = `${environment.api.basepath}`;
  constructor(private jobService: UserJobsService, private route: ActivatedRoute) {
    this.jobId = this.route.snapshot.params.job_id;
    this.job = this.jobService.getJob(this.jobId).subscribe(r => {
      this.job = r['payload'];
    });
    this.jobService.getApplications(this.jobId).subscribe(r => {
      this.applications = r['payload']['applications'];
    });
  }

  ngOnInit() {
  }

}
