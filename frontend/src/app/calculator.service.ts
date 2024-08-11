// json-rpc.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// todo : handle errors

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  counter = 0;

  constructor(private http: HttpClient) {}

  calculate(params: string[]): Observable<any> {
    const body = {
      jsonrpc: '2.0',
      method: 'calculate',
      params: params,
      id: this.counter,
    };
    this.counter++;
    return this.http.post('http://localhost:3000/calculator', body);
  }
}
