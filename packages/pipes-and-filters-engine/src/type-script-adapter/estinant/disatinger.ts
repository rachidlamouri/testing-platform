import { Estinant } from './estinant';
import { Pinbetunf } from '../pinbetunf';
import { Tropoignant } from '../tropoignant';
import {
  VoictentTuple,
  VoictentTupleToGeppTuple,
  VoictentTupleToHubblepupTuple,
} from '../voictent';
import { Croarder } from '../croarder';
import { Zorn } from '../../utilities/semantic-types/zorn';

export type DisatingerPinbetunf<TInputVoictentTuple extends VoictentTuple> =
  Pinbetunf<VoictentTupleToHubblepupTuple<TInputVoictentTuple>, void>;

export type DisatingerTropoignant<TInputVoictentTuple extends VoictentTuple> =
  Tropoignant<TInputVoictentTuple, []>;

/**
 * A many to zero estinant
 */
export type Disatinger<
  TInputVoictentTuple extends VoictentTuple,
  TZorn extends Zorn,
> = Estinant<TInputVoictentTuple, [], TZorn>;

export type DisatingerBuilderInput<
  TInputVoictentTuple extends VoictentTuple,
  TZorn extends Zorn,
> = {
  inputGeppTuple: VoictentTupleToGeppTuple<TInputVoictentTuple>;
  croard: Croarder<TInputVoictentTuple, TZorn>;
  pinbe: DisatingerPinbetunf<TInputVoictentTuple>;
};

export const buildDisatinger = <
  TInputVoictentTuple extends VoictentTuple,
  TZorn extends Zorn,
>({
  inputGeppTuple,
  croard,
  pinbe,
}: DisatingerBuilderInput<TInputVoictentTuple, TZorn>): Disatinger<
  TInputVoictentTuple,
  TZorn
> => {
  const tropoig: DisatingerTropoignant<TInputVoictentTuple> = (...inputs) => {
    pinbe(...inputs);
    return [];
  };

  const estinant: Disatinger<TInputVoictentTuple, TZorn> = {
    inputGeppTuple,
    croard,
    tropoig,
  };

  return estinant;
};
