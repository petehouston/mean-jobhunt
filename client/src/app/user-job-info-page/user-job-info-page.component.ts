import { Component, OnInit } from '@angular/core';
import {UserJobsService} from "../services/user_jobs.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-job-info-page',
  templateUrl: './user-job-info-page.component.html',
  styleUrls: ['./user-job-info-page.component.css']
})
export class UserJobInfoPageComponent implements OnInit {
  job = {};
  jobId: string = null;
  error: string = null;
  constructor(private jobService: UserJobsService, private route: ActivatedRoute) {
    this.jobId = route.snapshot.params.job_id;
    this.jobService.getJob(route.snapshot.params.job_id).subscribe(
      res => {
        if (res['status'] === 'success') {
          this.job = res['payload'];
        }
      }
    )
  }

  ngOnInit() {
  }

  onPublish() {
    this.jobService.publishJob(this.jobId).subscribe(r => {
      location.reload();
    });
  }

}
