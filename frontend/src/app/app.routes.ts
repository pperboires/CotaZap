import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './auth.guard';
import { SupplierListComponent } from './components/suppliers/supplier-list/supplier-list.component';
import { SupplierFormComponent } from './components/suppliers/supplier-form/supplier-form.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'suppliers', component: SupplierListComponent, canActivate: [authGuard] },
    { path: 'suppliers/new', component: SupplierFormComponent, canActivate: [authGuard] },
    { path: 'suppliers/edit/:id', component: SupplierFormComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
