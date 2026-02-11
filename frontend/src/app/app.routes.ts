import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '' }
];
