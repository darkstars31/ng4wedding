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
  private attending: boolean = null;
  public rsvpAnswer: rsvpAnswers; 

  public isApiOk: boolean = null;
  public isLoading: boolean = false;
  public inputError: boolean = false;

  public favoriteFamily: string;
  public yesAdjective: string;

  public familyNames: string[] = ['Santi','Winberg'];
  public yesAdjectives: string[] = ['fun','drama', 'rediculousness'];

  public RsvpQuestionaire: RsvpQuestionaire;

  constructor(private RsvpService: RsvpService){
      this.RsvpService.verifyApiStatus().then(data => {
        console.log(data);
      if(data) {
        this.isApiOk = true;   
      } else {
        this.isApiOk = false;
      }
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
    console.log(this.RsvpQuestionaire);
    this.RsvpService.updateRsvpData(this.rsvpCode, {"attending": this.attending, "questionaire": this.RsvpQuestionaire});
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
