import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JobsService} from "../services/jobs.service";
import {faLandmark, faMapMarker, faHandPointRight, faMoneyBill, faFileContract, faFlagUsa, faGlobe} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-job-detail-page',
  templateUrl: './job-detail-page.component.html',
  styleUrls: ['./job-detail-page.component.css']
})
export class JobDetailPageComponent implements OnInit {
  job = {
    _id: '', title: '', company: '', location: '', salary_range: '', job_type: '', is_remote: '', visa_sponsor: '',
    description: '', requirement: '',
  };
  jobId: string = null;

  faLandMark = faLandmark;
  faMapMarker = faMapMarker;
  faHandPointRight = faHandPointRight;
  faMoneyBill = faMoneyBill;
  faFileContract = faFileContract;
  faFlagUsa = faFlagUsa;
  faGlobe = faGlobe;

  constructor(private jobService: JobsService, private router: Router, private route: ActivatedRoute) {
    this.jobId = route.snapshot.params.job_id;
    this.jobService.getJobInfo(this.jobId).subscribe(r => {
      this.job = r['payload'];
    });
  }


  ngOnInit() {
  }

}
