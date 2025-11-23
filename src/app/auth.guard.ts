import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  canActivate(): Observable<boolean> {
    return this.http.get('http://localhost:7000/api/auth/me', {
      withCredentials: true
    }).pipe(
      map(() => true),
      catchError(() => {
        this.router.navigate(['/login'], {
          queryParams: { reason: 'auth' }
        });
        return of(false);
      })
    );
  }
}
