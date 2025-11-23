import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from './payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-payment-form',
  template: `
    <section class="card">
      <header class="card-header">
        <div>
          <h2>{{ isEdit ? 'Edit payment' : 'Create payment' }}</h2>
          <p class="card-subtitle">Fill in the payment details below.</p>
        </div>
      </header>

      <form class="form" [formGroup]="form" (ngSubmit)="save()">
        <div class="form-grid">
          <label class="form-field">
            <span>Amount</span>
            <input formControlName="amount" type="number" step="0.01" />
          </label>

          <label class="form-field">
            <span>Currency</span>
            <select formControlName="currency">
              <option value="">Select currency</option>
              <option>USD</option>
              <option>EUR</option>
              <option>INR</option>
              <option>GBP</option>
            </select>
          </label>

          <label class="form-field">
            <span>Provider</span>
            <select formControlName="provider">
              <option value="demo">Demo Gateway</option>
            </select>
          </label>
        </div>

        <div class="form-footer">
          <button type="button" class="btn btn-secondary" (click)="cancel()">Cancel</button>
          <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
            {{ isEdit ? 'Save changes' : 'Create payment' }}
          </button>
        </div>
      </form>
    </section>
  `
})
export class PaymentFormComponent implements OnInit {
  form = this.fb.group({
    amount: [0, [Validators.required, Validators.min(0.01)]],
    currency: ['USD', Validators.required],
    provider: ['demo', Validators.required]
  });

  isEdit = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private svc: PaymentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.id = +id;
      this.svc.get(this.id).subscribe((p) => {
        this.form.patchValue({
          amount: p.amount,
          currency: p.currency,
          provider: p.provider || 'demo'
        });
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { amount, currency, provider } = this.form.value;
    const payload: any = { amount, currency, provider };

    if (this.isEdit && this.id != null) {
      this.svc.update(this.id, payload).subscribe(() => this.router.navigate(['/']));
    } else {
      const clientRequestId = uuidv4();
      this.svc
        .create({ ...payload, clientRequestId })
        .subscribe(() => this.router.navigate(['/']));
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
