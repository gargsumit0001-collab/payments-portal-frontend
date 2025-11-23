import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PaymentService {
  private api = 'http://localhost:5000/api/payments';
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> { return this.http.get<any[]>(this.api); }
  get(id:number) { return this.http.get<any>(`${this.api}/${id}`); }
  create(payload:any) { return this.http.post(this.api, payload); }
  update(id:number, payload:any) { return this.http.put(`${this.api}/${id}`, payload); }
  delete(id:number) { return this.http.delete(`${this.api}/${id}`); }
}
