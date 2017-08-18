import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './pages/body.component';
import { RsvpComponent } from './pages/rsvp.component';
import { ContactComponent } from './pages/contact.component';
import { PhotosComponent } from './pages/photos.component';
// import { AboutComponent } from './about/about.component';
// import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'rsvp', component: RsvpComponent },
  { path: 'photos', component: PhotosComponent},
  { path: 'contact', component: ContactComponent }
//  { path: '**', component: NotFoundComponent }
//   { path: 'about', component: AboutComponent },
//   { path: 'contact', component: ContactComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule{}