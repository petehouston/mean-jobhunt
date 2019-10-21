import { Component, OnInit } from '@angular/core';
import {UserJobsService} from "../services/user_jobs.service";

@Component({
  selector: 'app-user-my-jobs-page',
  templateUrl: './user-my-jobs-page.component.html',
  styleUrls: ['./user-my-jobs-page.component.css']
})
export class UserMyJobsPageComponent implements OnInit {
  jobs: Array<Object> = [];
  constructor(private jobService: UserJobsService) {
    this.jobService.listJobs().subscribe(r => {
      this.jobs = r['payload']['jobs'];
      console.log(this.jobs);
    })
  }

  ngOnInit() {
  }

}
