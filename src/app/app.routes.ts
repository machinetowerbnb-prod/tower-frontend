import { Routes } from '@angular/router';

import { Layout } from './layout/layout';
import { Home } from './features/home/home';
import { Position } from './features/position/position';
import { Team } from './features/team/team';
import { Profile } from './features/profile/profile';
import { Game } from './features/game/game';
import { Signin } from './features/signin/signin';
import { Signup } from './features/signup/signup';
import { VerifyEmail } from './features/verify-email/verify-email'
import { EmailConfirmation } from './features/email-confirmation/email-confirmation'
import { Withdrawal } from './features/withdrawal/withdrawal'
import { History } from './features/history/history'
import { Commision } from './features/commision/commision'
import { Members } from './features/members/members'


export const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
   { path: 'signin', component: Signin },
   { path: 'signup', component: Signup },
   { path: 'verify-email', component: VerifyEmail },
   { path: 'email-confirm', component: EmailConfirmation },
   { path: 'withdraw', component: Withdrawal },
   { path: 'history', component: History },
   { path: 'commission', component: Commision },
   { path: 'members', component: Members },
{
    path: '',
    component: Layout,
    children: [
      { path: 'home', component: Home },
      { path: 'position', component: Position },
      { path: 'game', component: Game },
      { path: 'team', component: Team },
      { path: 'profile', component: Profile },
      
    ],
  },
  { path: '**', redirectTo: '' },
];
