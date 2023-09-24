import { ForegroundColor, applyColor } from '../../colors/colorList';
import { TextTransform } from './textTransform';

type LineLabelerInput = {
  label: string;
  color: ForegroundColor;
};

export class LineLabeler extends TextTransform {
  constructor({ label, color }: LineLabelerInput) {
    const labelWithColor = applyColor(label, color);
    super({
      onTransform: (text): string => {
        const modifiedText = text.replaceAll(
          /(.*\n)/g,
          `[${labelWithColor}] $1`,
        );
        return modifiedText;
      },
    });
  }
}
