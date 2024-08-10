import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'calculator';
  result = '';
  inputOne = 5;
  inputTwo = 5;

  constructor(private calculatorService: CalculatorService) {}

  onCalculate(action: string) {
    this.calculatorService
      .calculate(action, [this.inputOne, this.inputTwo])
      .subscribe((data) => {
        console.log(data);
        this.result = data.result;
      });
  }
}
