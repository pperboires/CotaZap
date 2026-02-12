import { Component, inject, OnInit, signal } from '@angular/core';
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

    isLogin = signal(true);
    email = signal('');
    password = signal('');
    errorMessage = signal('');

    constructor() {
        this.route.queryParams.subscribe(params => {
            this.isLogin.set(params['mode'] !== 'register');
            this.errorMessage.set('');
        });
    }

    ngOnInit() {
        // Initialization logic moved to constructor or signals
    }

    toggleMode() {
        this.isLogin.update(val => !val);
        this.errorMessage.set('');
        this.router.navigate([], {
            queryParams: { mode: this.isLogin() ? 'login' : 'register' }
        });
    }

    goHome() {
        this.router.navigate(['/']);
    }

    onSubmit(event: Event) {
        event.preventDefault();
        this.errorMessage.set('');
        const emailVal = this.email();
        const passwordVal = this.password();

        if (this.isLogin()) {
            this.authService.login(emailVal, passwordVal).subscribe({
                next: () => this.router.navigate(['/home']),
                error: (err) => {
                    console.error('Login error full response:', err);
                    this.errorMessage.set(this.handleError(err, 'Erro ao entrar. Verifique suas credenciais.'));
                }
            });
        } else {
            this.authService.register(emailVal, passwordVal).subscribe({
                next: () => {
                    alert('Cadastro realizado com sucesso! Faça login agora.');
                    this.toggleMode();
                },
                error: (err) => {
                    console.error('Registration error full response:', err);
                    this.errorMessage.set(this.handleError(err, 'Erro ao cadastrar. Tente novamente mais tarde.'));
                }
            });
        }
    }

    private handleError(err: any, defaultMessage: string): string {
        const errorData = err.error;

        // 1. Handle standard .NET ValidationProblemDetails (errors object with arrays)
        if (errorData?.errors) {
            return Object.keys(errorData.errors)
                .map(key => `${errorData.errors[key].join(', ')}`)
                .join('\n');
        }

        // 2. Handle simple detail or title
        if (errorData?.detail) return errorData.detail;
        if (errorData?.title) return errorData.title;

        // 3. Handle string-only error body
        if (typeof errorData === 'string') return errorData;

        // 4. Handle Blob errors (often happens if responseType is wrong or unexpected)
        if (errorData instanceof Blob) {
            return "Erro desconhecido (formato Blob). Verifique o console.";
        }

        // 5. Check if it's a progress event or other non-standard error
        if (err.status === 0) {
            return "Não foi possível conectar ao servidor. Verifique se o backend está rodando.";
        }

        return defaultMessage;
    }

    loginWithGoogle() {
        window.location.href = this.authService.getGoogleAuthUrl();
    }
}
