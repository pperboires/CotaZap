import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5000/auth';

    register(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, { email, password });
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap(response => {
                if (response.accessToken) {
                    localStorage.setItem('token', response.accessToken);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getGoogleAuthUrl(): string {
        return `http://localhost:5000/auth/login/google`;
    }
}
