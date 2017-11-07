import { Component } from '@angular/core';
import { RsvpService } from './../rsvp.service';

@Component({
  selector: 'rsvp-component',
  templateUrl: './rsvp.component.html'
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



  constructor(private RsvpService: RsvpService){ 
    this.RsvpService.verifyApiStatus().then(data => {
      this.isApiOk = true;   
    }).catch(e => {
      this.isApiOk = false;
      console.log('ApiStatus Bad: '+ e);     
    });
   }
  
  public areYouAttending(isAttending: boolean) {
    this.attending = isAttending;
    this.stage = 2;
  }

  public finishAndUpdate() {
    this.RsvpService.updateRsvpData(this.rsvpCode, {"attending": this.attending});
    this.stage = 3;
  }

  public submitRsvpCode (rsvpCode: string): void {
    this.inputError = false;
    this.isLoading = true;
    this.RsvpService.verifyRsvpCode(rsvpCode).then(data => {
      if(data) {
        this.rsvpCode = rsvpCode;
        localStorage.setItem('accessToken', data);
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
