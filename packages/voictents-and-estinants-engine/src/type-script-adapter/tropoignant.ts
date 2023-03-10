import { Vition, VitionToHubblepupInputList } from './vition';
import { VoictentTuple, VoictentTupleToQuirmList } from './voictent';

export type Tropoignant<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = (
  ...inputTuple: VitionToHubblepupInputList<TInputVition>
) => VoictentTupleToQuirmList<TOutputVoictentTuple>;
