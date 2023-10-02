import { TextTransform } from './textTransform';

/**
 * A node stream transform that removes problematic characters from subprocess
 * output. Right now it only removes the control code for clearing the terminal,
 * since doing so would cutoff the output of other processes as well, and is
 * annoying
 */
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
