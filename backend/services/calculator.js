module.exports = class CalculatorService {
  constructor() {
    return {
      add: this.add,
      subtract: this.subtract,
      divide: this.divide,
      multiply: this.multiply,
    };
  }

  add(args, callback) {
    callback(null, args[0] + args[1]);
  }

  subtract(args, callback) {
    callback(null, args[0] - args[1]);
  }

  divide(args, callback) {
    callback(null, args[0] / args[1]);
  }

  multiply(args, callback) {
    callback(null, args[0] * args[1]);
  }
};
