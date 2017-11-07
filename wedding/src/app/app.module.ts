import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
//import { InterceptorModule } from './interceptor.module';
import { HeaderComponent } from './chrome/header.component';
import { FooterComponent } from './chrome/footer.component';

import { BodyComponent } from './pages/body.component';
import { FyiComponent } from './pages/fyi.component';
import { RsvpComponent } from './pages/rsvp.component';
import { ContactComponent } from './pages/contact.component';
import { PhotosComponent } from './pages/photos.component';

import { NotFoundComponent } from './pages/NotFound.component';


import { RsvpService } from './rsvp.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    FyiComponent,
    RsvpComponent,
    ContactComponent,
    PhotosComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule, 
    HttpModule,
    //InterceptorModule,
    FormsModule
  ],
  providers: [
    RsvpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
