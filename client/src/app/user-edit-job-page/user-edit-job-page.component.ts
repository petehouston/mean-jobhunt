import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserJobsService} from "../services/user_jobs.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularEditorConfig} from "@kolkov/angular-editor";

@Component({
  selector: 'app-user-edit-job-page',
  templateUrl: './user-edit-job-page.component.html',
  styleUrls: ['./user-edit-job-page.component.css']
})
export class UserEditJobPageComponent implements OnInit {
  job: Object = {};
  editForm: FormGroup;
  jobId: string = null;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '15rem',
    minHeight: '5rem',
    translate: 'no',
    defaultFontName: 'Helvetica Neue',
    customClasses: [],
  };

  submitted = false;
  error: string = null;
  errors;
  constructor(private formBuilder: FormBuilder, private jobService: UserJobsService, private route: ActivatedRoute, private router: Router){
    this.editForm = this.createFormGroup();
    this.jobId = this.route.snapshot.params.job_id;
    jobService.getJob(route.snapshot.params.job_id).subscribe(r => {
      this.job = r['payload'];
      this.editForm.patchValue(this.job);
    });
  }

  createFormGroup() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      is_remote: [false, Validators.required],
      visa_sponsor: [false, Validators.required],
      salary_range: [0, Validators.required],
      job_type: [0, Validators.required],
      description: ['', Validators.required],
      requirement: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.editForm.controls;
  }

  getFormValidationErrors() {
    Object.keys(this.editForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.editForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.f.location.value);

    if (this.editForm.invalid) {
      this.submitted = false;
      this.getFormValidationErrors();
      return;
    }

    this.jobService.updateJob(this.jobId, {
      title: this.f.title.value,
      company: this.f.company.value,
      location: this.f.location.value,
      is_remote: this.f.is_remote.value,
      job_type: this.f.job_type.value,
      visa_sponsor: this.f.visa_sponsor.value,
      salary_range: this.f.salary_range.value,
      description: this.f.description.value,
      requirement: this.f.requirement.value,
    }).subscribe(r => {
      if (r['status'] === 'success') {
        this.router.navigate(['/u/jobs']);
      } else {
        this.error = JSON.stringify(r);
      }
    })
  }

}
