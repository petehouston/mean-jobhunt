import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-detail-page',
  templateUrl: './job-detail-page.component.html',
  styleUrls: ['./job-detail-page.component.css']
})
export class JobDetailPageComponent implements OnInit {
         jobdetails: FormGroup;  
  constructor(private router: Router){}

  onNavigate() {
    // Imperative Routing
    this.router.navigate(['./jobs/:job_id/application']);
  }

  ngOnInit() {
  }

}
