import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <span class="brand-main">Payments Portal</span>
          <span class="brand-sub">Manage and track your payments</span>
        </div>
        <nav class="app-nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Payments</a>
          <a routerLink="/create" routerLinkActive="active">Create</a>
          <a routerLink="/login" routerLinkActive="active">Login</a>
        </nav>
      </header>

      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {}
