import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RsvpService } from './../../services/rsvp.service';
import { RsvpQuestionaire } from './rsvpquestionaire.model'

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class RsvpComponent {

  public rsvpCode: string = "";
  public stage: number = 0;
  private isAttending: boolean = null;
  public attendingReason: string;
  public songName: string;

  public isApiOk: boolean = null;
  public isLoading: boolean = false;
  public inputError: boolean = false;
  public errorMessage: string;



  public RsvpQuestionaire: RsvpQuestionaire;

  constructor(private RsvpService: RsvpService){
    this.RsvpService.verifyApiStatus().then(data => {
		this.isApiOk = data.health;   
		this.errorMessage = `<a href="https://www.google.com/search?q=R%C3%A9pondez+s%27il+vous+pla%C3%AEt">Répondez s'il vous plaît system</a> is currently disabled. This feature will be enabled shortly before you recieve your RVSP in the mail. <strong>Please come back later</strong>`;

    }, error => {
      this.isApiOk = false;
      console.log('ApiStatus Bad: '+ error);     
    });
   }

   public onKey(event: any) {
     console.log(event);
   }


  public finishAndUpdate(songName: string) {   
	console.log('songName:',songName);
    this.RsvpService.updateRsvpData(this.rsvpCode, {"attending": this.isAttending, "attendingReason": this.attendingReason, "songName": songName});
    this.stage = 3;
  }

  public submitRsvpCode (rsvpCode: string): void {
    this.inputError = false;
    this.isLoading = true;
    if(this.isApiOk) {
      this.RsvpService.verifyRsvpCode(rsvpCode).then(accessToken => {   
        if(accessToken) {
          this.rsvpCode = rsvpCode;
          this.stage = 1;
        } else {
          this.inputError = true;
          this.isLoading = false;
        }
      });
    } else {
		this.errorMessage = `Don't press that button yet!`;
	}
  }

  public attendingButton(event){
	this.isAttending = event.target.className.indexOf('primary') > -1;
	this.attendingReason = event.target.innerText;
	this.stage = 2;
  }

  public onSubmit(form) {
	console.log('Form', form);
	  if(form.$valid) {
		  console.log('Form is Valid');
		  
	  }
  }

  public removeNotification(event): void {
    this[event] = !this[event];    
  }

}
