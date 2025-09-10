import { Simplify } from 'type-fest';
import { Readable } from 'stream';
import { ForegroundColor } from '../color/colorList';

/**
 * The information needed to run a subprocess
 */
export type SubprocessConfiguration = Simplify<
  (
    | {
        script: string;
        stream?: never;
      }
    | { script?: never; stream: Readable }
  ) & {
    label: string;
    color: ForegroundColor;
    isInitiallyVisible: boolean;
  }
>;
