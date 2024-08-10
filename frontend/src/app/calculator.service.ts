// json-rpc.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private http: HttpClient) {}

  add(method: string, params: any[]): Observable<any> {
    const body = {
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: 1,
    };

    return this.http.post('http://localhost:3000', body);
  }

  calculate(method: string, params: any[]): Observable<any> {
    const body = {
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: 1,
    };

    return this.http.post('http://localhost:3000', body);
  }
}
