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
  public isAttending: boolean = null;
  public attendingReason: string;
  public songName: string;
  public hasErrorOccured: boolean = false;

  public numAdults: number = 1;
  public numChildren: number = 0;

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
      this.errorMessage = `<a href="https://www.google.com/search?q=R%C3%A9pondez+s%27il+vous+pla%C3%AEt">Répondez s'il vous plaît system</a> is not responding. <strong>Please check back later.</strong>`;
      console.log('ApiStatus Bad: '+ error);     
    });
   }

   public onKey(event: any) {
     console.log(event);
   }


  public updateUser(jsonObject: any) {   
    console.log(jsonObject);
    this.RsvpService.updateRsvpData(this.rsvpCode.toLowerCase(), jsonObject).then(() => {
      this.stage++;
      console.log('Stage:',this.stage);
    }).catch(() => {
      this.hasErrorOccured = true;
      this.stage = -9999;
    });
  }

  public submitRsvpCode (form): void {
    if(form.status == 'VALID') {
      this.inputError = false;
      this.isLoading = true;
      if(this.isApiOk && this.rsvpCode.length > 0) {
        this.RsvpService.verifyRsvpCode(this.rsvpCode.toLowerCase()).then(accessToken => {   
          if(accessToken) {
            this.stage = 1;
          } else {
            this.inputError = true;
            this.isLoading = false;
          }
        });
      } else {
      this.errorMessage = `Don't press that button yet!`;
      }
    } else {
      this.inputError = true;
      this.isLoading = false;
    }
  }


  public attendingButton(event){
    this.isAttending = event.target.className.indexOf('primary') > -1;
    if(!this.isAttending) {
      this.stage = -9999;
    }
    this.attendingReason = event.target.innerText;
    this.updateUser({'isAttending': this.isAttending, 'attendingReason': this.attendingReason});
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
