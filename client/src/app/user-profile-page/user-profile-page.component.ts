import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/user_profile.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {
  profile = {};

  constructor(private profileService: UserProfileService) {
    this.profileService.get().subscribe(res => {
      if (res['status'] === 'success') {
        this.profile = res['payload'];
      }
    });
  }

  ngOnInit() {
  }

}
