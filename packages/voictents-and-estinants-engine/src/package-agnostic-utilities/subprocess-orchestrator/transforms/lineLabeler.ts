import { ForegroundColor, applyColor } from '../../color/colorList';
import { TextTransform } from './textTransform';

type LineLabelerInput = {
  label: string;
  color: ForegroundColor;
};

/**
 * A node stream transform that applies a colored label to each line of the
 * stream's text
 */
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
