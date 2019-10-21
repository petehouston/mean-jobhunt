import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./home/home.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {JobListingPageComponent} from "./job-listing-page/job-listing-page.component";
import {UserAddJobPageComponent} from "./user-add-job-page/user-add-job-page.component";
import { ApplicantDetailsComponent} from './applicant-details/applicant-details.component';
import {AuthGuard} from "./guards/auth.guard";
import {UserMyJobsPageComponent} from "./user-my-jobs-page/user-my-jobs-page.component";
import {UserJobInfoPageComponent} from "./user-job-info-page/user-job-info-page.component";
import {UserProfilePageComponent} from "./user-profile-page/user-profile-page.component";

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'jobs', component: JobListingPageComponent },
  { path: 'jobs/:job_id/application', component: ApplicantDetailsComponent },

  { path: 'u/jobs', component: UserMyJobsPageComponent,
    canActivate: [
      // AuthGuard
    ]
  },
  { path: 'u/jobs/add', component: UserAddJobPageComponent,
    canActivate: [
      // AuthGuard,
    ]
  },
  { path: 'u/jobs/:job_id', component: UserJobInfoPageComponent,
    canActivate: [
      // AuthGuard,
    ]
  },


  {
    path: 'u/profile', component: UserProfilePageComponent,
    canActivate: [
      AuthGuard,
    ]
  },

  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
