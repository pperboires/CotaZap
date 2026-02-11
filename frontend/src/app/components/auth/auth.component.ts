import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private authService = inject(AuthService);

    isLogin = true;
    email = '';
    password = '';

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.isLogin = params['mode'] !== 'register';
        });
    }

    toggleMode() {
        this.isLogin = !this.isLogin;
        this.router.navigate([], {
            queryParams: { mode: this.isLogin ? 'login' : 'register' }
        });
    }

    goHome() {
        this.router.navigate(['/']);
    }

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.isLogin) {
            this.authService.login(this.email, this.password).subscribe({
                next: () => this.router.navigate(['/home']),
                error: (err) => alert('Erro ao entrar: ' + err.message)
            });
        } else {
            this.authService.register(this.email, this.password).subscribe({
                next: () => {
                    alert('Cadastro realizado com sucesso! Faça login agora.');
                    this.toggleMode();
                },
                error: (err) => alert('Erro ao cadastrar: ' + err.message)
            });
        }
    }

    loginWithGoogle() {
        window.location.href = this.authService.getGoogleAuthUrl();
    }
}
