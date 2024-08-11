module.exports = class CalculatorService {
  result = 0;

  constructor() {
    this.calculate = this.calculate.bind(this);
    return {
      calculate: this.calculate,
    };
  }

  calculate(expression, callback) {
    if (expression.length < 3) {
      return callback(null, this.result);
    }

    if (isNaN(Number(expression[0])) || isNaN(Number(expression[2]))) {
      this.result = "NaN";
      return callback(null, this.result);
    }

    const operator = expression[1];
    const numbers = [Number(expression[0]), Number(expression[2])];

    if (operator === "+") {
      this.result = this.add(numbers);
    } else if (operator === "-") {
      this.result = this.subtract(numbers);
    } else if (operator === "*") {
      this.result = this.multiply(numbers);
    } else if (operator === "/") {
      this.result = this.divide(numbers);
    }

    expression.splice(0, 3); // removes the first three items in the array
    expression.unshift(this.result); // adds results at the beginning of the expression array.

    return this.calculate(expression, callback); // recursive call without sending a response
  }

  add(numbers) {
    return numbers[0] + numbers[1];
  }

  subtract(numbers) {
    return numbers[0] - numbers[1];
  }

  divide(numbers) {
    return numbers[0] / numbers[1];
  }

  multiply(numbers) {
    return numbers[0] * numbers[1];
  }
};
