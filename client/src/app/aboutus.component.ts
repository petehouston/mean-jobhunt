import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-aboutus',
  template: `

  <div>
      <h1>Advantages of Our JobHunt Website</h1>
    <p>
    Indeed strives to put job seekers first, giving them free access to search for jobs,
     <b></b>post resumes, and research companies. Every day, we connect millions of people
     <b></b> to new opportunities. ... Indeed helps companies of all sizes hire the best talent 
     <b></b>  and offers the best opportunity for job seekers to get hired.
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
