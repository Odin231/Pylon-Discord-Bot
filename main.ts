const ACCEPTED_CHANNELS: string[] = [
  '583762264352358429', // ClassicIndycar
  '846685734031327252', // bot-testing
  '647452685968080908' // specialevents
];

const CELSIUS_NAMES: string[] = ['Celsius', 'C', '°C'];
const FAHRENHEIT_NAMES: string[] = ['Fahrenheit', 'F', '°F'];
const LITRE_NAMES: string[] = ['Liter', 'L', 'Litre', 'Litres', 'Liters'];
const GALLON_NAMES: string[] = ['Gallon', 'gl', 'gal', 'Gallons', 'g'];
const KPA_NAMES: string[] = ['kPa'];
const PSI_NAMES: string[] = ['Psi'];
const MM_NAMES: string[] = ['Millimeter', 'mm', 'Millimeters'];
const INCH_NAMES: string[] = ['Inch', 'Inches'];
const KPH_NAMES: string[] = ['KPH', 'KM/H', 'KMH', 'KMHS', 'KM/HS', 'KPHS'];
const MPH_NAMES: string[] = ['MPH', 'MPHS'];
const KM_NAMES: string[] = ['Kilometer', 'km', 'kms', 'Kilometers'];
const MILES_NAMES: string[] = ['Miles', 'Mile'];

function contains(stringToCompare: string, units: string[]): boolean {
  var returnboolean: boolean = false;

  units.forEach((unit) => {
    if (
      stringToCompare.toLocaleLowerCase().includes(unit.toLocaleLowerCase())
    ) {
      returnboolean = true;
    }
  });

  return returnboolean;
}

function equals(stringToCompare: string, units: string[]): boolean {
  var isContain: boolean = false;

  units.forEach((unit) => {
    if (stringToCompare.toLocaleLowerCase() === unit.toLocaleLowerCase()) {
      isContain = true;
    }
  });

  return isContain;
}

function isValidChannel(
  channelIds: string[],
  CHANNEL_ID_MESSAGED_IN: string
): boolean {
  var returnValue: boolean = false;

  channelIds.forEach((channelId) => {
    if (CHANNEL_ID_MESSAGED_IN == channelId) {
      returnValue = true;
    }
  });
  return returnValue;
}

discord.on('MESSAGE_CREATE', async (message) => {
  var replyString: string = '';
  const CHANNEL_ID_MESSAGED_IN: any = (await message.getChannel()).id;

  if (isValidChannel(ACCEPTED_CHANNELS, CHANNEL_ID_MESSAGED_IN)) {
    if (contains(message.content.toLocaleLowerCase(), LITRE_NAMES)) {
      extractEntriesFromMessage(message, LITRE_NAMES).forEach((inputNumber) => {
        replyString += translateLitre2Gallon(inputNumber);
        replyString += '\n';
      });
    }

    if (contains(message.content.toLocaleLowerCase(), GALLON_NAMES)) {
      extractEntriesFromMessage(message, GALLON_NAMES).forEach(
        (inputNumber) => {
          replyString += translateGallon2Litre(inputNumber);
          replyString += '\n';
        }
      );
    }

    if (contains(message.content.toLocaleLowerCase(), CELSIUS_NAMES)) {
      extractEntriesFromMessage(message, CELSIUS_NAMES).forEach(
        (inputNumber) => {
          replyString += translateCelcius2Fahrenheit(inputNumber);
          replyString += '\n';
        }
      );
    }

    if (contains(message.content.toLocaleLowerCase(), FAHRENHEIT_NAMES)) {
      extractEntriesFromMessage(message, FAHRENHEIT_NAMES).forEach(
        (inputNumber) => {
          replyString += translateFahrenheit2Celcius(inputNumber);
          replyString += '\n';
        }
      );
    }

    if (contains(message.content.toLocaleLowerCase(), PSI_NAMES)) {
      extractEntriesFromMessage(message, PSI_NAMES).forEach((inputNumber) => {
        replyString += translatePsi2KPa(inputNumber);
        replyString += '\n';
      });
    }

    if (contains(message.content.toLocaleLowerCase(), KPA_NAMES)) {
      extractEntriesFromMessage(message, KPA_NAMES).forEach((inputNumber) => {
        replyString += translateKPa2Psi(inputNumber);
        replyString += '\n';
      });
    }

    if (contains(message.content.toLocaleLowerCase(), MM_NAMES)) {
      extractEntriesFromMessage(message, MM_NAMES).forEach((inputNumber) => {
        replyString += translateMm2Inch(inputNumber);
        replyString += '\n';
      });
    }

    if (contains(message.content.toLocaleLowerCase(), INCH_NAMES)) {
      extractEntriesFromMessage(message, INCH_NAMES).forEach((inputNumber) => {
        replyString += translateInch2Mm(inputNumber);
        replyString += '\n';
      });
    }

    if (contains(message.content.toLocaleLowerCase(), KPH_NAMES)) {
      extractEntriesFromMessage(message, KPH_NAMES).forEach((inputNumber) => {
        replyString += translateKph2Mph(inputNumber);
        replyString += '\n';
      });
    }

    if (contains(message.content.toLocaleLowerCase(), MPH_NAMES)) {
      extractEntriesFromMessage(message, MPH_NAMES).forEach((inputNumber) => {
        replyString += translateMph2Kph(inputNumber);
        replyString += '\n';
      });
    }

    if (contains(message.content.toLocaleLowerCase(), KM_NAMES)) {
      extractEntriesFromMessage(message, KM_NAMES).forEach((inputNumber) => {
        replyString += translateKm2Ml(inputNumber);
        replyString += '\n';
      });
    }

    if (contains(message.content.toLocaleLowerCase(), MILES_NAMES)) {
      extractEntriesFromMessage(message, MILES_NAMES).forEach((inputNumber) => {
        replyString += translateMl2Km(inputNumber);
        replyString += '\n';
      });
    }

    if (replyString == '') {
      return;
    }
    await message.reply(replyString);
  }
});

function extractEntriesFromMessage(message: any, units: string[]): number[] {
  var loopvar: number = 1;
  var entries: number[] = [];
  var values: string[] = message.content.split(' ');

  for (loopvar; loopvar < values.length; loopvar++) {
    if (equals(values[loopvar], units)) {
      var inputValue: string = values[loopvar - 1];
      var inputValueArray: RegExpMatchArray | null = inputValue.match('[a-z]');
      if (inputValueArray == null) {
        var inputNumber: number = parseFloat(inputValue);
        if (!isNaN(inputNumber)) {
          entries.push(inputNumber);
        }
      }
    }
  }
  return entries;
}

function translateCelcius2Fahrenheit(valueInput: number): string {
  var unitInput: string = CELSIUS_NAMES[0];
  var unitResult: string = FAHRENHEIT_NAMES[0];
  var valueResult: number;

  valueResult = valueInput * 1.8 + 32;
  valueResult = parseFloat(valueResult.toFixed(1));

  return valueInput + ' ' + unitInput + ' = ' + valueResult + ' ' + unitResult;
}

function translateFahrenheit2Celcius(valueInput: number): string {
  var unitInput: string = FAHRENHEIT_NAMES[0];
  var unitResult: string = CELSIUS_NAMES[0];
  var valueResult: number;

  valueResult = (valueInput - 32) / 1.8;
  valueResult = parseFloat(valueResult.toFixed(1));

  return valueInput + ' ' + unitInput + ' = ' + valueResult + ' ' + unitResult;
}

function translateLitre2Gallon(valueInput: number): string {
  var unitInput: string = LITRE_NAMES[0];
  var unitResult: string = GALLON_NAMES[0];
  var valueResult: number;

  valueResult = valueInput / 3.7854118;
  valueResult = parseFloat(valueResult.toFixed(3));

  return valueInput + ' ' + unitInput + ' = ' + valueResult + ' ' + unitResult;
}

function translateGallon2Litre(valueInput: number): string {
  var unitInput: string = GALLON_NAMES[0];
  var unitResult: string = LITRE_NAMES[0];
  var valueResult: number;

  valueResult = valueInput * 3.7854118;
  valueResult = parseFloat(valueResult.toFixed(3));

  return valueInput + ' ' + unitInput + ' = ' + valueResult + ' ' + unitResult;
}

function translatePsi2KPa(valueInput: number): string {
  var unitInput: string = PSI_NAMES[0];
  var unitResult: string = KPA_NAMES[0];
  var valueResult: number;

  valueResult = valueInput / 0.14503773773;
  valueResult = parseFloat(valueResult.toFixed(3));

  return valueInput + ' ' + unitInput + ' = ' + valueResult + ' ' + unitResult;
}

function translateKPa2Psi(valueInput: number): string {
  var unitInput: string = KPA_NAMES[0];
  var unitResult: string = PSI_NAMES[0];
  var valueResult: number;

  valueResult = valueInput * 0.14503773773;
  valueResult = parseFloat(valueResult.toFixed(3));

  return valueInput + ' ' + unitInput + ' = ' + valueResult + ' ' + unitResult;
}

function translateMm2Inch(valueInput: number): string {
  var unitInput: string = MM_NAMES[0];
  var unitResult: string = INCH_NAMES[0];
  var valueResult: number;

  valueResult = valueInput / 25.4;
  valueResult = parseFloat(valueResult.toFixed(3));

  return valueInput + ' ' + unitInput + ' = ' + valueResult + ' ' + unitResult;
}

function translateInch2Mm(valueInput: number): string {
  var unitInput: string = INCH_NAMES[0];
  var unitResult: string = MM_NAMES[0];
  var valueResult: number;

  valueResult = valueInput * 25.4;
  valueResult = parseFloat(valueResult.toFixed(3));

  return valueInput + ' ' + unitInput + ' = ' + valueResult + ' ' + unitResult;
}

function translateKph2Mph(valueInput: number): string {
  var unitInput: string = KPH_NAMES[0];
  var unitResult: string = MPH_NAMES[0];
  var valueResult: number;

  valueResult = valueInput / 1.609344;
  valueResult = parseFloat(valueResult.toFixed(3));

  return valueInput + ' ' + unitInput + ' = ' + valueResult + ' ' + unitResult;
}

function translateMph2Kph(valueInput: number): string {
  var unitInput: string = MPH_NAMES[0];
  var unitResult: string = KPH_NAMES[0];
  var valueResult: number;

  valueResult = valueInput * 1.609344;
  valueResult = parseFloat(valueResult.toFixed(3));

  return valueInput + ' ' + unitInput + ' = ' + valueResult + ' ' + unitResult;
}

function translateKm2Ml(valueInput: number): string {
  var unitInput: string = KM_NAMES[0];
  var unitResult: string = MILES_NAMES[0];
  var valueResult: number;

  valueResult = valueInput / 1.609344;
  valueResult = parseFloat(valueResult.toFixed(3));

  return valueInput + ' ' + unitInput + ' = ' + valueResult + ' ' + unitResult;
}

function translateMl2Km(valueInput: number): string {
  var unitInput: string = MILES_NAMES[0];
  var unitResult: string = KM_NAMES[0];
  var valueResult: number;

  valueResult = valueInput * 1.609344;
  valueResult = parseFloat(valueResult.toFixed(3));

  return valueInput + ' ' + unitInput + ' = ' + valueResult + ' ' + unitResult;
}
