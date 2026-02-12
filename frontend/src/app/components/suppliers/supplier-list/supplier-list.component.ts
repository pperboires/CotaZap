import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from '../../../models/supplier';

@Component({
    selector: 'app-supplier-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './supplier-list.component.html',
    styleUrl: './supplier-list.component.css'
})
export class SupplierListComponent implements OnInit {
    private supplierService = inject(SupplierService);
    private router = inject(Router);

    suppliers = signal<Supplier[]>([]);

    ngOnInit() {
        this.loadSuppliers();
    }

    loadSuppliers() {
        this.supplierService.getSuppliers().subscribe({
            next: (data) => this.suppliers.set(data),
            error: (err) => console.error('Error loading suppliers', err)
        });
    }

    deleteSupplier(id: number) {
        if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
            this.supplierService.deleteSupplier(id).subscribe({
                next: () => this.loadSuppliers(),
                error: (err) => alert('Erro ao excluir fornecedor')
            });
        }
    }

    editSupplier(id: number) {
        this.router.navigate(['/suppliers/edit', id]);
    }
}
