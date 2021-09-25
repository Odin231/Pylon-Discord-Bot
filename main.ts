import { FoundValue } from './CalculationClasses';
import { CalculatonPair } from './CalculationClasses';
import { CalculatonPairCelsiusFahrenheit } from './CalculationClasses';
import { CalculatonPairLiterGallons } from './CalculationClasses';
import { CalculatonPairKpaPsi } from './CalculationClasses';
import { CalculatonPairMmInch } from './CalculationClasses';
import { CalculatonPairKphMph } from './CalculationClasses';

const ACCEPTED_CHANNELS: string[] = [
  '833943333268488234',
  '583762264352358429', //(ClassicIndycar)
  '846456297226109088'
];

const CELSIUS_NAMES: string[] = ['Celsius', 'C', '°C'];
const FAHRENHEIT_NAMES: string[] = ['Fahrenheit', 'F', '°F'];
const LITRE_NAMES: string[] = ['Liter', 'L'];
const GALLON_NAMES: string[] = ['Gallon', 'gl', 'gal'];
const KPA_NAMES: string[] = ['kPa'];
const PSI_NAMES: string[] = ['Psi'];
const MM_NAMES: string[] = ['Millimeter', 'mm'];
const INCH_NAMES: string[] = ['Inch'];
const KPH_NAMES: string[] = ['KPH', 'KM/H', 'KMH'];
const MPH_NAMES: string[] = ['MPH'];

const UNIT_LIST: string[][] = [
  CELSIUS_NAMES,
  FAHRENHEIT_NAMES,
  LITRE_NAMES,
  GALLON_NAMES,
  KPA_NAMES,
  PSI_NAMES,
  MM_NAMES,
  INCH_NAMES,
  KPH_NAMES,
  MPH_NAMES
];

const CelsiusFahreheitCalculator = new CalculatonPairCelsiusFahrenheit(
  CELSIUS_NAMES,
  FAHRENHEIT_NAMES
);
const LiterGallonsCalculator = new CalculatonPairLiterGallons(
  LITRE_NAMES,
  GALLON_NAMES
);
const KpaPsiCalculator = new CalculatonPairKpaPsi(KPA_NAMES, PSI_NAMES);
const MmInchCalculator = new CalculatonPairMmInch(MM_NAMES, INCH_NAMES);
const KphMphCalculator = new CalculatonPairKphMph(KPH_NAMES, MPH_NAMES);

const CALCULATOR_LIST: CalculatonPair[] = [
  CelsiusFahreheitCalculator,
  LiterGallonsCalculator,
  KpaPsiCalculator,
  MmInchCalculator,
  KphMphCalculator
];

function contains(stringToCompare: string, units: string[]): boolean {
  var contains: boolean = false;

  units.forEach((unit) => {
    if (
      stringToCompare.toLocaleLowerCase().includes(unit.toLocaleLowerCase())
    ) {
      contains = true;
    }
  });

  return contains;
}

function equals(stringToCompare: string, units: string[]): boolean {
  var equals: boolean = false;

  units.forEach((unit) => {
    if (stringToCompare.toLocaleLowerCase() === unit.toLocaleLowerCase()) {
      equals = true;
    }
  });

  return equals;
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
    var foundValues: FoundValue[] = extractEntriesFromMessage(
      message,
      UNIT_LIST
    );

    foundValues.forEach((foundValue) => {
      CALCULATOR_LIST.forEach((calculator) => {
        if (equals(foundValue.unit, calculator.unit1)) {
          replyString += calculator.calculate1to2(foundValue.value);
        } else if (equals(foundValue.unit, calculator.unit2)) {
          replyString += calculator.calculate2to1(foundValue.value);
        }
      });
    });

    if (replyString == '') {
      return;
    }
    await message.reply(replyString);
  }
});

/** loads all number values found inside the message, that are BEFORE a valid unit
 * Examples:
 *  1 Litre = valid => "1" is added to @resultList
 *  1 2 Litre = valid => "2L" is added to @resultList
 *  2Litre = not valid => nothing is added to @resultList
 */
function extractEntriesFromMessage(
  message: any,
  unitsList: string[][]
): FoundValue[] {
  var splittedMessageLoopvar: number = 1;
  var resultList: FoundValue[] = [];
  var values: string[] = message.content.split(' ');
  var splittedMessage: string[] = message.content.split(' ');

  unitsList.forEach((unit) => {
    for (
      splittedMessageLoopvar;
      splittedMessageLoopvar < splittedMessage.length;
      splittedMessageLoopvar++
    ) {
      if (equals(values[splittedMessageLoopvar], unit)) {
        var inputValue: string = splittedMessage[splittedMessageLoopvar - 1];
        var inputValueArray: RegExpMatchArray | null = inputValue.match(
          '[a-z]'
        );
        if (inputValueArray == null) {
          var inputNumber: number = parseFloat(inputValue);
          if (!isNaN(inputNumber)) {
            resultList.push(new FoundValue(inputNumber, unit[0]));
          }
        }
      }
    }
    splittedMessageLoopvar = 1;
  });
  return resultList;
}
