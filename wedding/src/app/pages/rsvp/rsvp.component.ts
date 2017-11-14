import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { RsvpService } from './../../services/rsvp.service';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class RsvpComponent {

  public rsvpCode: string = "";
  public stage: number = 0;
  private attending: boolean = null;
  public rsvpAnswer: rsvpAnswers;

  public isApiOk: boolean = null;
  public isLoading: boolean = false;
  public inputError: boolean = false;

  public favoriteFamily: string;
  public yesAdjective: string;

  public questionaire: {
    attendingReason,
    cakeOrDeath,
    scifiPreference
  };

  public familyNames: string[] = ['Santi','Winberg'];
  public yesAdjectives: string[] = ['fun','drama', 'rediculousness'];



  constructor(private RsvpService: RsvpService){ 
     this.RsvpService.verifyApiStatus().then(data => {
      this.isApiOk = true;   
    }).catch(e => {
      this.isApiOk = false;
      console.log('ApiStatus Bad: '+ e);     
    });
   }

   public onKey(event: any) {
     console.log(event);
   }
  
  public areYouAttending(isAttending: boolean) {
    this.attending = isAttending;
    this.stage = 2;
  }

  public finishAndUpdate() {
    console.log(this.questionaire);
    this.RsvpService.updateRsvpData(this.rsvpCode, {"attending": this.attending, "questionaire": this.questionaire});
    this.stage = 3;
  }

  public submitRsvpCode (rsvpCode: string): void {
    this.inputError = false;
    this.isLoading = true;
    this.RsvpService.verifyRsvpCode(rsvpCode).then(accessToken => {   
      if(accessToken) {
        this.rsvpCode = rsvpCode;
        this.stage = 1;
      } else {
        this.inputError = true;
        this.isLoading = false;
      }
    });
  }

  public removeNotification(event): void {
    this[event] = !this[event];    
  }

}

class rsvpAnswers {
  attending: boolean = false;
  favoriteFamily: string = '';
  yesAdjective: string = '';
}
