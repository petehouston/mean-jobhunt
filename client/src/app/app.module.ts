import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {JwtInterceptor} from './services/interceptors/jwt.interceptor';
import {ReactiveFormsModule} from "@angular/forms";
import {JobListingPageComponent} from './job-listing-page/job-listing-page.component';
import {UserAddJobPageComponent} from './user-add-job-page/user-add-job-page.component';
import {ApplicantDetailsComponent} from './applicant-details/applicant-details.component';
import {JobDetailPageComponent} from './job-detail-page/job-detail-page.component';
import {UserMyJobsPageComponent} from './user-my-jobs-page/user-my-jobs-page.component';
import {UserJobInfoPageComponent} from './user-job-info-page/user-job-info-page.component';
import {JobTypePipe} from "./pipes/job_type.pipe";
import {SalaryRangePipe} from "./pipes/salary_range.pipe";
import {UserProfilePageComponent} from "./user-profile-page/user-profile-page.component";
import {UserEditJobPageComponent} from './user-edit-job-page/user-edit-job-page.component';
import {TruncatePipe} from "./pipes/truncate.pipe";
import {TimeAgoPipe} from "time-ago-pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,

    // auth pages
    LoginPageComponent,
    RegisterPageComponent,

    // public pages
    JobListingPageComponent,
    UserAddJobPageComponent,
    ApplicantDetailsComponent,
    JobDetailPageComponent,

    // user pages
    UserProfilePageComponent,
    UserMyJobsPageComponent,
    UserEditJobPageComponent,
    UserJobInfoPageComponent,

    // pipes
    JobTypePipe,
    SalaryRangePipe,
    TruncatePipe,
    TimeAgoPipe, // `time-ago-pipe`
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
