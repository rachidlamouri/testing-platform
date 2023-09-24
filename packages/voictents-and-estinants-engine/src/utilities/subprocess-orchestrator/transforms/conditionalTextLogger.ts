/* eslint-disable no-underscore-dangle */
import { TextTransform } from './textTransform';

type ConditionalTextLoggerInput = {
  isInitiallyVisible: boolean;
};

export class ConditionalTextLogger extends TextTransform {
  private _isVisible: boolean;

  constructor({ isInitiallyVisible }: ConditionalTextLoggerInput) {
    super({
      onTransform: (text): string => {
        if (this.isVisible) {
          // eslint-disable-next-line no-control-regex
          const RESET_TERMINAL_REGEX = /\x1bc/g;
          const outputText = text.replaceAll(RESET_TERMINAL_REGEX, '');
          process.stdout.write(outputText);
        }

        return text;
      },
    });

    this._isVisible = isInitiallyVisible;
  }

  get isVisible(): boolean {
    return this._isVisible;
  }

  set isVisible(isVisible: boolean) {
    this._isVisible = isVisible;
  }

  toggleIsVisible(): void {
    this.isVisible = !this._isVisible;
  }
}
/* eslint-enable no-underscore-dangle */
