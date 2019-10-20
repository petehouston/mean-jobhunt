import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  error: string = null;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/u/jobs']);
    }
  }

  ngOnInit() {
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.controls.name.value, this.registerForm.controls.email.value, this.registerForm.controls.password.value)
      .pipe(first())
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/', 'login']);
          console.log(result);
        } else {
          this.error = 'Invalid input. Make sure you input data correctly.';
        }
      }, err => {
        this.error = err.statusText;
      })
  }

}
