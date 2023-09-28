// eslint-disable-next-line import/no-extraneous-dependencies
import Chalk, { ForegroundColor as ChalkForegroundColor } from 'chalk';

export type ForegroundColor = typeof ChalkForegroundColor;

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
