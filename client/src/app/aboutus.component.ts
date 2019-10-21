import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-aboutus',
  template: `

  <div>
      <h1>Advantages of Our JobHunt Website</h1>
    <p>
    Indeed strives to put job seekers first, giving them free access to search for jobs,
     <br>post resumes, and research companies. Every day, we connect millions of people
     <br> to new opportunities. ... Indeed helps companies of all sizes hire the best talent 
     <br> and offers the best opportunity for job seekers to get hired.
    </p>
    <p>
    At Indeed, our mission is to help people get jobs. We have more than 8,900 global
     <br> employees passionately pursuing this purpose and improving the recruitment
     <br> journey through real stories and data. We foster a collaborative workplace that 
      <br> strives to create the best experience for job seekers.

    </p>
    </div>
    <button (click)="onNavigate()">Go Home</button>
  `,
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent  implements OnInit{

  constructor(private router: Router){}

  onNavigate() {
    
    this.router.navigate(['/']);
  }
  ngOnInit(){
    
  }
 
}
