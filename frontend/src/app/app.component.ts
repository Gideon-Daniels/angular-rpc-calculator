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
  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reverse();
  operations: {
    name: string;
    symbol: string;
  }[];
  result = '';
  display = '0';

  constructor(private calculatorService: CalculatorService) {
    this.operations = [
      {
        name: 'add',
        symbol: '+',
      },
      {
        name: 'multiply',
        symbol: '*',
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
    const inputs = this.convertToInputs(this.display);
    this.calculatorService.calculate(inputs).subscribe((data) => {
      console.log(data);
      this.result = data.result;
    });

    this.reset();
  }

  convertToInputs(display: string) {
    const formatDisplay = display.trim();
    const inputs = formatDisplay.split(/(\+|\-|\*|\/)/);
    console.log(inputs);
    return inputs;
  }

  setOperation(operation: string, symbol: string) {
    if (operation === 'clear') return this.reset();

    this.display += ` ${symbol} `;
  }

  onNumber(number: number) {
    if (this.display === '0') {
      this.display = '';
    }
    this.display += `${number}`;
  }

  reset() {
    this.display = '0';
    this.result = '';
  }
}
