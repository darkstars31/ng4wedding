import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './body.component';
import { RsvpComponent } from './rsvp.component';
import { ContactComponent } from './contact.component';
// import { AboutComponent } from './about/about.component';
// import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'rsvp', component: RsvpComponent },
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