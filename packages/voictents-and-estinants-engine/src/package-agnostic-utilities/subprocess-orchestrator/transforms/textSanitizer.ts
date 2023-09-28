import { TextTransform } from './textTransform';

export class TextSanitizer extends TextTransform {
  constructor() {
    super({
      onTransform: (text): string => {
        // eslint-disable-next-line no-control-regex
        const RESET_TERMINAL_REGEX = /\x1bc/g;
        const outputText = text.replaceAll(RESET_TERMINAL_REGEX, '');

        return outputText;
      },
    });
  }
}
