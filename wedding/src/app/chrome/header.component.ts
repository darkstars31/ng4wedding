import { Component } from '@angular/core';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html'
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
