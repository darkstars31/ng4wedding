import { Component } from '@angular/core';
import { RsvpService } from './../rsvp.service';

@Component({
  selector: 'rsvp-component',
  templateUrl: './rsvp.component.html'
})

export class RsvpComponent {

  public rsvpType: string = "";
  public stage: number = 0;
  private attending: boolean = null;
  public rsvpAnswer: rsvpAnswers;

  public favoriteFamily: string;
  public yesAdjective: string;

  public familyNames: string[] = ['Santi','Winberg'];
  public yesAdjectives: string[] = ['fun','drama', 'rediculousness'];



  constructor(private RsvpService: RsvpService){  }
  
  public areYouAttending(isAttending: boolean) {
    this.attending = isAttending;
    this.stage = 2;
  }

  public submitRsvpCode (rsvpCode: string): void {
    this.RsvpService.verifyRsvpCode(rsvpCode).then(data =>
       this.rsvpType = data,
      );
      if(this.rsvpType == "true") {
        this.stage = 1;
      }
  }
}

class rsvpAnswers {
  attending: boolean = false;
  favoriteFamily: string = '';
  yesAdjective: string = '';
}
