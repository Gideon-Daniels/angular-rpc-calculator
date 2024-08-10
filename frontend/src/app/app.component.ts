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

  constructor(private calculatorService: CalculatorService) {}

  addNumbers() {
    this.calculatorService.add('add', [1, 2]).subscribe((data) => {
      console.log(data);
      this.result = data.result;
    });
  }
}
