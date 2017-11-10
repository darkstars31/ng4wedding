import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-notfound',
  template: `404: Not Found.`,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
