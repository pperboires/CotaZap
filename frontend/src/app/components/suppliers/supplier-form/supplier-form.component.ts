import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from '../../../models/supplier';

@Component({
    selector: 'app-supplier-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './supplier-form.component.html',
    styleUrl: './supplier-form.component.css'
})
export class SupplierFormComponent implements OnInit {
    private supplierService = inject(SupplierService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    isEditMode = signal(false);
    supplierId = signal<number | null>(null);

    name = signal('');
    contactName = signal('');
    whatsapp = signal('');
    comment = signal('');

    errorMessage = signal('');

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.isEditMode.set(true);
                this.supplierId.set(+id);
                this.loadSupplier(+id);
            }
        });
    }

    loadSupplier(id: number) {
        this.supplierService.getSupplier(id).subscribe({
            next: (data) => {
                this.name.set(data.name);
                this.contactName.set(data.contactName || '');
                this.whatsapp.set(data.whatsapp);
                this.comment.set(data.comment || '');
            },
            error: (err) => {
                console.error('Error loading supplier', err);
                this.errorMessage.set('Erro ao carregar o fornecedor.');
            }
        });
    }

    onSubmit() {
        const supplierData: any = {
            name: this.name(),
            contactName: this.contactName(),
            whatsapp: this.whatsapp(),
            comment: this.comment()
        };

        if (this.isEditMode() && this.supplierId()) {
            supplierData.id = this.supplierId()!;
            this.supplierService.updateSupplier(this.supplierId()!, supplierData).subscribe({
                next: () => this.router.navigate(['/suppliers']),
                error: (err) => this.errorMessage.set('Erro ao atualizar fornecedor.')
            });
        } else {
            this.supplierService.createSupplier(supplierData).subscribe({
                next: () => this.router.navigate(['/suppliers']),
                error: (err) => this.errorMessage.set('Erro ao criar fornecedor.')
            });
        }
    }

    cancel() {
        this.router.navigate(['/suppliers']);
    }
}
