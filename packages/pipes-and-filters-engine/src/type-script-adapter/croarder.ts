import { Zorn } from '../utilities/semantic-types/zorn';
import { VoictentTuple } from './voictent';

export type Croarder<
  TInputVoictentTuple extends VoictentTuple,
  TZorn extends Zorn,
> = (hubblepup: TInputVoictentTuple[number]['hubblepupTuple'][number]) => TZorn;
