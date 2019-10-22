import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/user_profile.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {
  profile = { name: '', email: ''};

  constructor(private profileService: UserProfileService) {
    this.profileService.get().subscribe(res => {
      if (res['status'] === 'success') {
        this.profile = res['payload'];
      }
    });
  }

  ngOnInit() {
  }

  onChangePassword() {
    Swal.fire({
      title: 'Enter new password',
      input: 'password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      },
    }).then(r => {
      const pwd = r.value.trim();
      if (pwd.length < 3) {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Password must be at least 3 characters. Try again!',
        });
      } else {
        // make request
        this.profileService.changePassword(pwd).subscribe(p => {
          if (p['status'] === 'success') {
            Swal.fire({
              type: 'success',
              title: 'Password changed!',
              text: 'Your password has been changed successfully',
            });
          } else {
            Swal.fire({
              type: 'error',
              title: 'Error!',
              text: p['payload']['message'],
            });
          }
        })
      }
    });
  }
}
