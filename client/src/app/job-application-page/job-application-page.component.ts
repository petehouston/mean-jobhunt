import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JobsService} from "../services/jobs.service";
import {faLandmark, faMapMarker, faHandPointRight, faMoneyBill, faFileContract, faFlagUsa, faGlobe} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-job-application-page',
  templateUrl: './job-application-page.component.html',
  styleUrls: ['./job-application-page.component.css']
})
export class JobApplicationPageComponent implements OnInit {
  jobId: string = null;
  job: Object = {};
  form: FormGroup;

  faLandMark = faLandmark;
  faMapMarker = faMapMarker;
  faHandPointRight = faHandPointRight;
  faMoneyBill = faMoneyBill;
  faFileContract = faFileContract;
  faFlagUsa = faFlagUsa;
  faGlobe = faGlobe;


  constructor(private route: ActivatedRoute, private jobService: JobsService, private formBuilder: FormBuilder) {
    this.jobId = route.snapshot.params.job_id;
    this.jobService.getJobInfo(this.jobId).subscribe(r => {
      this.job = r['payload'];
    });
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      resume: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

}
