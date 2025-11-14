import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

 signup(payload: {
    userName: string;
    email: string;
    password: string;
    refferedCode?: string;
    passcode: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, payload);
  }

 // Avengers api
avengers(payload: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/avengers`, payload);
}

confirmDeposit(payload: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/confirm`, payload);
}

withdraw(payload: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/withdraw`, payload);
}
//adminapis
admin(payload: any) {
  return this.http.post<any>(`${this.baseUrl}/adminAvengers`, payload);
}
adminTransactionAvengers(payload: any) {
  return this.http.post<any>(`${this.baseUrl}/adminTransactionAvengers`, payload);
}
adminUpdateUserStatus(payload: any) {
  return this.http.post<any>(`${this.baseUrl}/adminUpdateUserStatus`, payload);
}
adminWithdrawFilter(payload: any) {
  return this.http.post<any>(`${this.baseUrl}/adminWithdrawFilter`, payload);
}
adminWithdrawConfirm(payload: any) {
  return this.http.post<any>(`${this.baseUrl}/withdraw-approval`, payload);
}
}
