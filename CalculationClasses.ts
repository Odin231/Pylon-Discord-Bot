/**
 * Helper Class
 * This class is used to save found input values
 */
class FoundValue {
  value: number;
  valueString: string;
  unit: string;

  constructor(value: number, unit: string) {
    this.value = value;
    this.valueString = value.toString();
    this.unit = unit;
  }
}

/** Base class of the CalculationPairs. This needs to be implemented to make calculations work!
 * @unit1 contains the possible unitnames for the first unit
 * @unit2  contains the possible unitnames for the second unit
 *
 * Example: CalculatonPairCelsiusFahrenheit => unit1 = Celsius; unit2 = Fahrenheit
 */
interface CalculatonPair {
  readonly unit1: string[];
  readonly unit2: string[];

  calculate1to2(inputValue: number): string;
  calculate2to1(inputValue: number): string;
}

function returnStringBuilder(
  inputNumber: number,
  unitInput: string,
  valueResult: number,
  unitResult: string
): string {
  return (
    inputNumber +
    ' ' +
    unitInput +
    ' = ' +
    valueResult +
    ' ' +
    unitResult +
    '\n'
  );
}

class CalculatonPairCelsiusFahrenheit implements CalculatonPair {
  readonly unit1: string[];
  readonly unit2: string[];

  constructor(unit1: string[], unit2: string[]) {
    this.unit1 = unit1;
    this.unit2 = unit2;
  }

  calculate1to2(inputNumber: number) {
    var unitInput: string = this.unit1[0];
    var unitResult: string = this.unit2[0];
    var valueResult: number;

    valueResult = inputNumber * 1.8 + 32;
    valueResult = parseFloat(valueResult.toFixed(1));

    return returnStringBuilder(inputNumber, unitInput, valueResult, unitResult);
  }

  calculate2to1(inputNumber: number) {
    var unitInput: string = this.unit2[0];
    var unitResult: string = this.unit1[0];
    var valueResult: number;

    valueResult = (inputNumber - 32) / 1.8;
    valueResult = parseFloat(valueResult.toFixed(1));

    return returnStringBuilder(inputNumber, unitInput, valueResult, unitResult);
  }
}

class CalculatonPairLiterGallons implements CalculatonPair {
  readonly unit1: string[];
  readonly unit2: string[];

  constructor(unit1: string[], unit2: string[]) {
    this.unit1 = unit1;
    this.unit2 = unit2;
  }

  calculate1to2(inputNumber: number) {
    var unitInput: string = this.unit1[0];
    var unitResult: string = this.unit2[0];
    var valueResult: number;

    valueResult = inputNumber / 3.7854118;
    valueResult = parseFloat(valueResult.toFixed(3));

    return returnStringBuilder(inputNumber, unitInput, valueResult, unitResult);
  }

  calculate2to1(inputNumber: number) {
    var unitInput: string = this.unit2[0];
    var unitResult: string = this.unit1[0];
    var valueResult: number;

    valueResult = inputNumber * 3.7854118;
    valueResult = parseFloat(valueResult.toFixed(3));

    return returnStringBuilder(inputNumber, unitInput, valueResult, unitResult);
  }
}

class CalculatonPairKpaPsi implements CalculatonPair {
  readonly unit1: string[];
  readonly unit2: string[];

  constructor(unit1: string[], unit2: string[]) {
    this.unit1 = unit1;
    this.unit2 = unit2;
  }

  calculate1to2(inputNumber: number) {
    var unitInput: string = this.unit1[0];
    var unitResult: string = this.unit2[0];
    var valueResult: number;

    valueResult = inputNumber / 0.14503773773;
    valueResult = parseFloat(valueResult.toFixed(3));

    return returnStringBuilder(inputNumber, unitInput, valueResult, unitResult);
  }

  calculate2to1(inputNumber: number) {
    var unitInput: string = this.unit2[0];
    var unitResult: string = this.unit1[0];
    var valueResult: number;

    valueResult = inputNumber * 0.14503773773;
    valueResult = parseFloat(valueResult.toFixed(3));

    return returnStringBuilder(inputNumber, unitInput, valueResult, unitResult);
  }
}

class CalculatonPairMmInch implements CalculatonPair {
  readonly unit1: string[];
  readonly unit2: string[];

  constructor(unit1: string[], unit2: string[]) {
    this.unit1 = unit1;
    this.unit2 = unit2;
  }

  calculate1to2(inputNumber: number) {
    var unitInput: string = this.unit1[0];
    var unitResult: string = this.unit2[0];
    var valueResult: number;

    valueResult = inputNumber / 25.4;
    valueResult = parseFloat(valueResult.toFixed(3));

    return returnStringBuilder(inputNumber, unitInput, valueResult, unitResult);
  }

  calculate2to1(inputNumber: number) {
    var unitInput: string = this.unit2[0];
    var unitResult: string = this.unit1[0];
    var valueResult: number;

    valueResult = inputNumber * 25.4;
    valueResult = parseFloat(valueResult.toFixed(3));

    return returnStringBuilder(inputNumber, unitInput, valueResult, unitResult);
  }
}

class CalculatonPairKphMph implements CalculatonPair {
  readonly unit1: string[];
  readonly unit2: string[];

  constructor(unit1: string[], unit2: string[]) {
    this.unit1 = unit1;
    this.unit2 = unit2;
  }

  calculate1to2(inputNumber: number) {
    var unitInput: string = this.unit1[0];
    var unitResult: string = this.unit2[0];
    var valueResult: number;

    valueResult = inputNumber / 1.609344;
    valueResult = parseFloat(valueResult.toFixed(3));

    return returnStringBuilder(inputNumber, unitInput, valueResult, unitResult);
  }

  calculate2to1(inputNumber: number) {
    var unitInput: string = this.unit2[0];
    var unitResult: string = this.unit1[0];
    var valueResult: number;

    valueResult = inputNumber * 1.609344;
    valueResult = parseFloat(valueResult.toFixed(3));

    return returnStringBuilder(inputNumber, unitInput, valueResult, unitResult);
  }
}

export { FoundValue };
export { CalculatonPair };
export { CalculatonPairCelsiusFahrenheit };
export { CalculatonPairLiterGallons };
export { CalculatonPairKpaPsi };
export { CalculatonPairMmInch };
export { CalculatonPairKphMph };
