import { Json } from './json';

export const logger = {
  logText: (text: string): void => {
    // eslint-disable-next-line no-console
    console.log(text);
  },
  logJson: (data: Json): void => {
    // eslint-disable-next-line no-console
    console.log(logger.stringifyAsMultipleLines(data));
  },
  feedLine: (): void => {
    // eslint-disable-next-line no-console
    console.log();
  },
  stringifyAsSingleLine: (data: Json): string => {
    return JSON.stringify(data);
  },
  stringifyAsMultipleLines: (data: Json): string => {
    return JSON.stringify(data, null, 2);
  },
};
