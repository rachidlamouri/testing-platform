import { Transform } from 'stream';

type TextTransformInput = {
  onTransform: (text: string) => string | null;
};

export class TextTransform extends Transform {
  constructor({ onTransform }: TextTransformInput) {
    super({
      encoding: 'utf-8',
      transform: (chunk: string, encoding, done): void => {
        const text = chunk.toString();
        const modifiedtText = onTransform(text);
        done(null, modifiedtText);
      },
    });
  }
}
