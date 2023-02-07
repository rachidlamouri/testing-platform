import { getNamedSerialization } from './getNamedSerialization';

export const logger = {
  logText: (text: string): void => {
    // eslint-disable-next-line no-console
    console.log(text);
  },
  logData: (data: unknown): void => {
    // eslint-disable-next-line no-console
    console.log(logger.stringifyAsMultipleLines(data));
  },
  feedLine: (): void => {
    // eslint-disable-next-line no-console
    console.log();
  },
  stringifyAsMultipleLines: (data: unknown): string => {
    return getNamedSerialization(data).text;
  },
};
