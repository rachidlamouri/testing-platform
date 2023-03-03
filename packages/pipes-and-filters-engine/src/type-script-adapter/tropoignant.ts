import {
  VoictentTuple,
  VoictentTupleToHubblepupTuple,
  VoictentTupleToQuirmList,
} from './voictent';

export type Tropoignant<
  TInputVoictentTuple extends VoictentTuple,
  TOutputVoictentTuple extends VoictentTuple,
> = (
  ...inputTuple: VoictentTupleToHubblepupTuple<TInputVoictentTuple>
) => VoictentTupleToQuirmList<TOutputVoictentTuple>;
