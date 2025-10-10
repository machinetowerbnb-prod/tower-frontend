import { Routes } from '@angular/router';

import { Layout } from './layout/layout';
import { Home } from './features/home/home';
import { Position } from './features/position/position';
import { Team } from './features/team/team';
import { Profile } from './features/profile/profile';


export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'position', component: Position },
      { path: 'team', component: Team },
      { path: 'profile', component: Profile },
    ],
  },
  { path: '**', redirectTo: '' },
];
