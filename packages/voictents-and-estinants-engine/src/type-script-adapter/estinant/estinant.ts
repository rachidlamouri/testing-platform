import { LeftAppreffinge, RightAppreffingeTuple } from '../appreffinge';
import { Tropoignant } from '../tropoignant';
import { Vition } from '../vition';
import { VoictentTuple } from '../voictent';

export type Estinant<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = {
  leftAppreffinge: LeftAppreffinge<TInputVition>;
  rightAppreffingeTuple: RightAppreffingeTuple<TInputVition>;
  tropoig: Tropoignant<TInputVition, TOutputVoictentTuple>;
};
