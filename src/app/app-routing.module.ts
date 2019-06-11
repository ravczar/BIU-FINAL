import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationComponent }   from './navigation/navigation.component';
import { PeopleComponent }      from './people/people.component';
import { PersonDetailComponent }  from './person-detail/person-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/navigation', pathMatch: 'full' },
  { path: 'navigation', component: NavigationComponent },
  { path: 'detail/:id', component: PersonDetailComponent },
  { path: 'people', component: PeopleComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
