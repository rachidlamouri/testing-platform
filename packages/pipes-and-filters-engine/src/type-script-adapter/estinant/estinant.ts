import { Zorn } from '../../utilities/semantic-types/zorn';
import { Croarder } from '../croarder';
import { Tropoignant } from '../tropoignant';
import { VoictentTuple, VoictentTupleToGeppTuple } from '../voictent';

export type Estinant<
  TInputVoictentTuple extends VoictentTuple,
  TOutputVoictentTuple extends VoictentTuple,
  TZorn extends Zorn,
> = {
  inputGeppTuple: VoictentTupleToGeppTuple<TInputVoictentTuple>;
  croard: Croarder<TInputVoictentTuple, TZorn>;
  tropoig: Tropoignant<TInputVoictentTuple, TOutputVoictentTuple>;
};
