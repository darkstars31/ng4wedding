import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RsvpService } from '../../services/rsvp.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  public loggedIn: boolean = false;
  public adminPassword: string;

  constructor(private rsvpService: RsvpService) { }

  ngOnInit() {
  }

  public onSubmit(){
    this.rsvpService.adminLogin(this.adminPassword).then( response => {
      if(response.accessToken){
        localStorage.setItem('accessToken', response.accessToken);
        this.rsvpService.adminDashboard().then( data => {
          console.log(data);
        })
      }
    })
  }

}
