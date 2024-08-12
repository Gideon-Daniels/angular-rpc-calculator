module.exports = class CalculatorService {
  result = 0;
  expression = [];
  // todo: add brackets , square root and powers
  operators = ["/", "*", "+", "-"]; // order of bodmas

  constructor() {
    this.calculate = this.calculate.bind(this);
    return {
      calculate: this.calculate,
    };
  }

  async calculate(params) {
    if (typeof params[0] !== "string") {
      throw new Error("Invalid params. Expected an array with a string.");
    }
    this.convertExpression(params[0]);

    this.BODMASOperation();
    this.result = this.expression[0];

    return this.result;
  }

  convertExpression(expression) {
    const formatDisplay = expression.trim();
    const inputs = formatDisplay
      .split(/(\+|\-|\*|\/)/)
      .map((item) => (isNaN(item) ? item : Number(item)));

    this.expression = inputs;
  }

  BODMASOperation() {
    if (this.expression.length === 1) return;
    this.operators.forEach((operator) => {
      this.expression.find((element, index) =>
        element === operator ? this.resolveExpression(index, operator) : null,
      );
    });

    this.BODMASOperation();
  }

  resolveExpression(index, operator) {
    let func = new Function("a", "b", `return a ${operator} b;`); // replaced with eval() since eval introduces security risks
    let result = func(
      Number(this.expression[index - 1]),
      Number(this.expression[index + 1]),
    );

    this.expression.splice(index - 1, 3);
    this.expression.splice(index - 1, 0, result.toString());
  }
};
