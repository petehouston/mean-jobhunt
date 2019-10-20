import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-add-job-page',
  templateUrl: './user-add-job-page.component.html',
  styleUrls: ['./user-add-job-page.component.css']
})
export class UserAddJobPageComponent implements OnInit {
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({

    });
  }

  ngOnInit() {
  }

}
