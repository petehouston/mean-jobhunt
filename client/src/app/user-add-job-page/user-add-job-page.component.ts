import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserJobsService} from "../services/user_jobs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-add-job-page',
  templateUrl: './user-add-job-page.component.html',
  styleUrls: ['./user-add-job-page.component.css']
})
export class UserAddJobPageComponent implements OnInit {
  addForm: FormGroup;
  error: string = null;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private jobService: UserJobsService, private router: Router) {
    this.addForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      is_remote: 0,
      visa_sponsor: 0,
      job_type: 0,
      salary_range: 0,
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    console.log(this.f.title.value);
    console.log(this.f.company.value);
    console.log(this.f.location.value);
    console.log(this.f.is_remote.value);
    console.log(this.f.visa_sponsor.value);
    console.log(this.f.job_type.value);
    console.log(this.f.salary_range.value);

    const data = {
      title: this.f.title.value,
      company: this.f.company.value,
      location: this.f.location.value,
      is_remote: this.f.is_remote.value,
      visa_sponsor: this.f.visa_sponsor.value,
      job_type: this.f.job_type.value,
      salary_range: this.f.salary_range.value,
    };

    this.jobService.addJob(data).subscribe(response => {
      if (response['status'] === 'success') {
        this.router.navigate(['/u/jobs']);
      }
    })
  }

}
