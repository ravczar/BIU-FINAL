import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationComponent }   from './navigation/navigation.component';
import { PeopleComponent }      from './people/people.component';
import { PersonDetailComponent }  from './person-detail/person-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MessagesComponent } from './messages/messages.component';


const routes: Routes = [
  { path: '', redirectTo: '/navigation', pathMatch: 'full' },
  { path: 'navigation', component: NavigationComponent },
  { path: 'detail/:id', component: PersonDetailComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'user-form', component: UserFormComponent},
  { path: 'messages', component: MessagesComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
