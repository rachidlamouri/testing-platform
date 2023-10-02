// eslint-disable-next-line import/no-extraneous-dependencies
import Chalk, { ForegroundColor as ChalkForegroundColor } from 'chalk';

export type ForegroundColor = typeof ChalkForegroundColor;

/**
 * An enumerated list of chalk foreground colors so that each color is
 * represented once for other use cases.
 */
export const colorList: ForegroundColor[] = [
  'black',
  'blue',
  'cyan',
  'gray',
  'green',
  'grey',
  'magenta',
  'blackBright',
  'blueBright',
  'cyanBright',
  'greenBright',
  'magentaBright',
];

export const applyColor = (text: string, color: ForegroundColor): string => {
  return Chalk[color](text);
};
