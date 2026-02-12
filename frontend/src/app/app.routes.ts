import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
