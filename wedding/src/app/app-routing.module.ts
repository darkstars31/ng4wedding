import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './chrome/header/header.component';
import { FooterComponent } from './chrome/footer/footer.component';
import { BodyComponent } from './pages/body/body.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FyiComponent } from './pages/fyi/fyi.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { RegistryComponent } from './pages/registry/registry.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'fyi', component: FyiComponent },
  { path: 'rsvp', component: RsvpComponent },
  { path: 'photos', component: PhotosComponent},
  { path: 'registry', component: RegistryComponent},
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: "" }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
