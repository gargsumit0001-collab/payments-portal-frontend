import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:7000/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(
        `${this.api}/login`,
        { username, password },
        { withCredentials: true }   // 👈 send & receive cookies
    );
  }

  refresh() {
    return this.http.post(
        `${this.api}/refresh`,
        {},
        { withCredentials: true }
    );
  }

  revoke() {
    return this.http.post(
        `${this.api}/revoke`,
        {},
        { withCredentials: true }
    );
  }
}
