import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent {
  
  public menuIsActive: string = "";

  public mobileMenuClick () : void {
    if(this.menuIsActive == "is-active"){
      this.menuIsActive = "";
    } else {
      this.menuIsActive = "is-active";
    }
  }
}
