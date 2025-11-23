import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PaymentsListComponent } from './payments-list.component';
import { PaymentFormComponent } from './payment-form.component';
import { LoginComponent } from './login.component';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: PaymentsListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PaymentFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: PaymentFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [AppComponent, PaymentsListComponent, PaymentFormComponent, LoginComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
