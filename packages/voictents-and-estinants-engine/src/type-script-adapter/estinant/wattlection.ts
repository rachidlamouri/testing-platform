import { Estinant } from './estinant';
import { Tropoignant } from '../tropoignant';
import { Voictent, VoictentToHubblepup, VoictentToQuirm } from '../voictent';
import { Pinbetunf } from '../pinbetunf';
import { RightAppreffingeTuple } from '../appreffinge';
import { Vition, VitionToHubblepupInputList } from '../vition';

export type WattlectionPinbetunf<
  TInputVition extends Vition,
  TOutputVoictent extends Voictent,
> = Pinbetunf<
  VitionToHubblepupInputList<TInputVition>,
  VoictentToHubblepup<TOutputVoictent>
>;

export type WattlectionTropoignant<
  TInputVition extends Vition,
  TOutputVoictent extends Voictent,
> = Tropoignant<TInputVition, [TOutputVoictent]>;

/**
 * A many to one estinant
 */
export type Wattlection<
  TInputVition extends Vition,
  TOutputVoictent extends Voictent,
> = Estinant<TInputVition, [TOutputVoictent]>;

export type WattlectionBuilderInput<
  TInputVition extends Vition,
  TOutputVoictent extends Voictent,
> = {
  leftGepp: TInputVition['leftVoictent']['gepp'];
  rightAppreffingeTuple: RightAppreffingeTuple<TInputVition>;
  outputGepp: TOutputVoictent['gepp'];
  pinbe: WattlectionPinbetunf<TInputVition, TOutputVoictent>;
};

export const buildWattlection = <
  TInputVition extends Vition,
  TOutputVoictent extends Voictent,
>({
  leftGepp,
  rightAppreffingeTuple,
  outputGepp,
  pinbe,
}: WattlectionBuilderInput<TInputVition, TOutputVoictent>): Wattlection<
  TInputVition,
  TOutputVoictent
> => {
  const tropoig: WattlectionTropoignant<TInputVition, TOutputVoictent> = (
    ...inputs
  ) => {
    const output = pinbe(...inputs);

    const outputQuirm: VoictentToQuirm<TOutputVoictent> = {
      gepp: outputGepp,
      hubblepup: output,
    };

    return [outputQuirm];
  };

  const estinant: Wattlection<TInputVition, TOutputVoictent> = {
    leftAppreffinge: { gepp: leftGepp },
    rightAppreffingeTuple,
    tropoig,
  };

  return estinant;
};
