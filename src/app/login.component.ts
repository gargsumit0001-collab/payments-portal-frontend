import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <section class="card card-narrow">
      <header class="card-header">
        <div>
          <h2>Sign in</h2>
          <p class="card-subtitle">Enter your credentials to access the portal.</p>
        </div>
      </header>

      <form class="form" (ngSubmit)="submit()">
        <div class="form-grid">
          <label class="form-field">
            <span>Username</span>
            <input [(ngModel)]="username" name="username" autocomplete="username" />
          </label>

          <label class="form-field">
            <span>Password</span>
            <input type="password" [(ngModel)]="password" name="password" autocomplete="current-password" />
          </label>
        </div>

        <div *ngIf="error" class="error-text">{{ error }}</div>

        <div class="form-footer">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </section>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
      private svc: AuthService,
      private router: Router
  ) {}

  submit(): void {
    this.svc.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Login failed';
      }
    });
  }
}
