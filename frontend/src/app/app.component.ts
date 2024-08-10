import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatorService } from './calculator.service';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'calculator';
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  operations: {
    name: string;
    symbol: string;
  }[];
  inputs: number[] = [];
  result = '';
  display = '0';
  operation = '';

  constructor(private calculatorService: CalculatorService) {
    this.operations = [
      {
        name: 'add',
        symbol: '+',
      },
      {
        name: 'multiply',
        symbol: 'x',
      },
      {
        name: 'subtract',
        symbol: '-',
      },
      {
        name: 'divide',
        symbol: '/',
      },
      {
        name: 'clear',
        symbol: 'C',
      },
    ];
  }

  onCalculate() {
    this.calculatorService
      .calculate(this.operation, this.inputs)
      .subscribe((data) => {
        console.log(data);
        this.result = data.result;
      });

    this.reset();
  }

  setOperation(operation: string, display: string) {
    if (operation === 'clear') return this.reset();
    if (this.inputs.length >= 2) {
      return alert('only two inputs is allowed');
    }
    this.display += `${display} `;
    this.operation = operation;
  }

  onNumber(number: number) {
    if (this.display === '0') {
      this.display = '';
    }
    this.display += `${number} `;
    this.inputs.push(number);
  }

  reset() {
    this.inputs = [];
    this.display = '0';
    this.operation = '';
  }
}
