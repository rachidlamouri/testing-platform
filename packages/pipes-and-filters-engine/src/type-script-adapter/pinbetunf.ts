import { StralineTuple, Straline } from '../utilities/semantic-types/straline';

/**
 * Like a Tropoignant, but it is abstracted from the engine's concerns
 */
export type Pinbetunf<
  TInputTuple extends StralineTuple,
  TOutput extends Straline,
> = (...inputTuple: TInputTuple) => TOutput;
