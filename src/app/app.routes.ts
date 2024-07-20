import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { ExploreComponent } from './components/explore/explore.component';
import { UserComponent } from './components/user/user.component';
import { AboutComponent } from './components/about/about.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'add-workout',
    component: AddWorkoutComponent,
  },
  {
    path:'explore',
    component:ExploreComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    // user route 
    path: 'user',
    component: UserComponent
  },
  {
    path:'**',
    component:ErrorComponent
  },
];
