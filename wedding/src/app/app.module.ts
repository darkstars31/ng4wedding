import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './chrome/header/header.component';
import { FooterComponent } from './chrome/footer/footer.component';
import { BodyComponent } from './pages/body/body.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FyiComponent } from './pages/fyi/fyi.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

import { RsvpService } from './services/rsvp.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http/src/interceptor';
import { AuthInterceptor } from './http.interceptor';
import { RegistryComponent } from './pages/registry/registry.component';
import { AdminComponent } from './pages/admin/admin.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    ContactComponent,
    FyiComponent,
    PhotosComponent,
    RsvpComponent,
    NotfoundComponent,
    RegistryComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    RsvpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
