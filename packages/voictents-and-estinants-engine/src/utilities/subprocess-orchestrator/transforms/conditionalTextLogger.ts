/* eslint-disable no-underscore-dangle */
import { TextTransform } from './textTransform';

type ConditionalTextLoggerInput = {
  isInitiallyEnabled: boolean;
};

export class ConditionalTextLogger extends TextTransform {
  private _isEnabled: boolean;

  constructor({ isInitiallyEnabled }: ConditionalTextLoggerInput) {
    super({
      onTransform: (text): string => {
        if (this.isEnabled) {
          // eslint-disable-next-line no-control-regex
          const RESET_TERMINAL_REGEX = /\x1bc/g;
          const outputText = text.replaceAll(RESET_TERMINAL_REGEX, '');
          process.stdout.write(outputText);
        }

        return text;
      },
    });

    this._isEnabled = isInitiallyEnabled;
  }

  get isEnabled(): boolean {
    return this._isEnabled;
  }

  set isEnabled(isEnabled: boolean) {
    this._isEnabled = isEnabled;
  }

  toggleIsEnabled(): void {
    this.isEnabled = !this._isEnabled;
  }
}
/* eslint-enable no-underscore-dangle */
