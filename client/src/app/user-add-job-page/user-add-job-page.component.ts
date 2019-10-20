import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-add-job-page',
  templateUrl: './user-add-job-page.component.html',
  styleUrls: ['./user-add-job-page.component.css']
})
export class UserAddJobPageComponent implements OnInit {
  addForm: FormGroup;
  error: string = null;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {
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
  }

}
