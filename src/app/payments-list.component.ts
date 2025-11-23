import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments-list',
  template: `
    <section class="card">
      <header class="card-header">
        <div>
          <h2>Payments</h2>
          <p class="card-subtitle">View and manage all payments.</p>
        </div>
        <button type="button" class="btn btn-primary" (click)="create()">Add payment</button>
      </header>

      <div class="table-container" *ngIf="payments?.length; else emptyState">
        <table class="data-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of payments">
              <td data-label="Reference">{{ p.reference }}</td>
              <td data-label="Amount">{{ p.amount | number:'1.2-2' }}</td>
              <td data-label="Currency">{{ p.currency }}</td>
              <td data-label="Created">{{ p.createdAt | date:'short' }}</td>
              <td class="actions">
                <button type="button" class="btn btn-secondary" (click)="edit(p.id)">Edit</button>
                <button type="button" class="btn btn-danger" (click)="delete(p.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #emptyState>
        <div class="empty-state">
          <p>No payments yet.</p>
          <button type="button" class="btn btn-primary" (click)="create()">Create your first payment</button>
        </div>
      </ng-template>
    </section>
  `
})
export class PaymentsListComponent implements OnInit {
  payments: any[] = [];

  constructor(
    private svc: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.svc.list().subscribe({
      next: (r) => this.payments = r,
      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          this.router.navigate(['/login'], { queryParams: { reason: 'auth' } });
        }
      }
    });
  }

  create(): void {
    this.router.navigate(['/create']);
  }

  edit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  delete(id: number): void {
    if (!confirm('Delete payment?')) {
      return;
    }
    this.svc.delete(id).subscribe(() => this.load());
  }
}
