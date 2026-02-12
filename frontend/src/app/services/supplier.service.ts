import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5000/api/suppliers';

    getSuppliers(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(this.apiUrl);
    }

    getSupplier(id: number): Observable<Supplier> {
        return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
    }

    createSupplier(supplier: Omit<Supplier, 'id'>): Observable<Supplier> {
        return this.http.post<Supplier>(this.apiUrl, supplier);
    }

    updateSupplier(id: number, supplier: Supplier): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, supplier);
    }

    deleteSupplier(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
