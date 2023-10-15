import { Transform as NodeStreamTransform } from 'stream';

type TextTransformInput = {
  onTransform: (text: string) => string | null;
};

/**
 * A node stream transform that encapsulates converting the input data to a
 * string. Specialized node stream transforms should subclass this class.
 */
export class TextTransform extends NodeStreamTransform {
  constructor({ onTransform }: TextTransformInput) {
    super({
      encoding: 'utf-8',
      transform: (chunk: string, encoding, done): void => {
        const text = chunk.toString();
        const modifiedText = onTransform(text);
        done(null, modifiedText);
      },
    });
  }
}
