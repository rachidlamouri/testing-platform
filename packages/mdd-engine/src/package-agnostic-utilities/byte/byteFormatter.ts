import { Simplify } from 'type-fest';
import { assertNotUndefined } from '../nil/assertNotUndefined';
import { ByteCount } from './byteCount';
import {
  BYTES_PER_BYTE,
  BYTES_PER_GIGABYTE,
  BYTES_PER_KILOBYTE,
  BYTES_PER_MEGABYTE,
} from './constants';
import { isNotNull } from '../nil/isNotNull';

type ByteFormattingConfigurationInput = Simplify<
  (
    | {
        suffix: string;
        inputSuffix?: never;
        outputSuffix?: never;
      }
    | {
        suffix?: never;
        inputSuffix: string;
        outputSuffix: string;
      }
  ) & { byteCount: ByteCount }
>;

class ByteFormattingConfiguration {
  private inputSuffix: string;

  private outputSuffix: string;

  private byteCount: ByteCount;

  private inputMatcher: RegExp;

  constructor(input: ByteFormattingConfigurationInput) {
    const inputSuffix =
      input.suffix !== undefined ? input.suffix : input.inputSuffix;

    this.inputSuffix = inputSuffix;

    this.outputSuffix =
      input.suffix !== undefined ? input.suffix : input.outputSuffix;

    this.byteCount = input.byteCount;

    this.inputMatcher = new RegExp(`^(?<byteCount>\\d+)${inputSuffix}$`);
  }

  parseInput(text: string): ByteCount | null {
    const match = text.match(this.inputMatcher);
    if (match === null) {
      return null;
    }

    const unitCountText = match.groups?.byteCount;

    if (unitCountText === undefined) {
      return null;
    }

    const unitCountNumber = Number.parseInt(unitCountText, 10);
    const byteCount = new ByteCount(unitCountNumber * this.byteCount.value);

    return byteCount;
  }

  getIsOfMagnitude(byteCount: ByteCount): boolean {
    return byteCount.value > this.byteCount.value;
  }

  format(byteCount: ByteCount): string {
    const adjustedBytes = byteCount.value / this.byteCount.value;

    const formattedNumber: string = adjustedBytes.toFixed(1);

    const result = `${formattedNumber}${this.outputSuffix}`;
    return result;
  }
}

/**
 * Abstracts formatting byte counts, and parsing text representing an amount of
 * bytes, kilobytes, megabytes, or gigabytes
 *
 * @canonicalDeclaration
 */
class ByteFormatter {
  configurationList = [
    new ByteFormattingConfiguration({
      suffix: 'GB',
      byteCount: BYTES_PER_GIGABYTE,
    }),
    new ByteFormattingConfiguration({
      suffix: 'MB',
      byteCount: BYTES_PER_MEGABYTE,
    }),
    new ByteFormattingConfiguration({
      suffix: 'KB',
      byteCount: BYTES_PER_KILOBYTE,
    }),
    new ByteFormattingConfiguration({
      inputSuffix: '',
      outputSuffix: 'B',
      byteCount: BYTES_PER_BYTE,
    }),
  ] as const;

  parseInput(text: string): ByteCount {
    const byteCount = this.configurationList
      .map((configuration) => {
        return configuration.parseInput(text);
      })
      .find(isNotNull);

    assertNotUndefined(byteCount);
    return byteCount;
  }

  format(byteCount: ByteCount): string {
    const firstMatchingConfiguration = this.configurationList.find(
      (configuration) => {
        return configuration.getIsOfMagnitude(byteCount);
      },
    );

    assertNotUndefined(firstMatchingConfiguration);
    const result = firstMatchingConfiguration.format(byteCount);

    return result;
  }
}

export const byteFormatter = new ByteFormatter();
