import { Estinant } from './estinant';
import { Tropoignant } from '../tropoignant';
import {
  Voictent,
  VoictentToHubblepup,
  VoictentToQuirm,
  VoictentTuple,
  VoictentTupleToGeppTuple,
  VoictentTupleToHubblepupTuple,
} from '../voictent';
import { Zorn } from '../../utilities/semantic-types/zorn';
import { Croarder } from '../croarder';
import { Pinbetunf } from '../pinbetunf';

export type WattlectionPinbetunf<
  TInputVoictentTuple extends VoictentTuple,
  TOutputVoictent extends Voictent,
> = Pinbetunf<
  VoictentTupleToHubblepupTuple<TInputVoictentTuple>,
  VoictentToHubblepup<TOutputVoictent>
>;

export type WattlectionTropoignant<
  TInputVoictentTuple extends VoictentTuple,
  TOutputVoictent extends Voictent,
> = Tropoignant<TInputVoictentTuple, [TOutputVoictent]>;

/**
 * A many to one estinant
 */
export type Wattlection<
  TInputVoictentTuple extends VoictentTuple,
  TOutputVoictent extends Voictent,
  TZorn extends Zorn,
> = Estinant<TInputVoictentTuple, [TOutputVoictent], TZorn>;

export type WattlectionBuilderInput<
  TInputVoictentTuple extends VoictentTuple,
  TOutputVoictent extends Voictent,
  TZorn extends Zorn,
> = {
  inputGeppTuple: VoictentTupleToGeppTuple<TInputVoictentTuple>;
  outputGepp: TOutputVoictent['gepp'];
  croard: Croarder<TInputVoictentTuple, TZorn>;
  pinbe: WattlectionPinbetunf<TInputVoictentTuple, TOutputVoictent>;
};

export const buildWattlection = <
  TInputVoictentTuple extends VoictentTuple,
  TOutputVoictent extends Voictent,
  TZorn extends Zorn,
>({
  inputGeppTuple,
  outputGepp,
  croard,
  pinbe,
}: WattlectionBuilderInput<
  TInputVoictentTuple,
  TOutputVoictent,
  TZorn
>): Wattlection<TInputVoictentTuple, TOutputVoictent, TZorn> => {
  const tropoig: WattlectionTropoignant<
    TInputVoictentTuple,
    TOutputVoictent
  > = (...inputs) => {
    const output = pinbe(...inputs);

    const outputQuirm: VoictentToQuirm<TOutputVoictent> = {
      gepp: outputGepp,
      hubblepup: output,
    };

    return [outputQuirm];
  };

  const estinant: Wattlection<TInputVoictentTuple, TOutputVoictent, TZorn> = {
    inputGeppTuple,
    croard,
    tropoig,
  };

  return estinant;
};
