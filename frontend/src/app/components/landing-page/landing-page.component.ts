import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
    private router = inject(Router);

    goToAuth(mode: 'login' | 'register') {
        this.router.navigate(['/auth'], { queryParams: { mode } });
    }
}
