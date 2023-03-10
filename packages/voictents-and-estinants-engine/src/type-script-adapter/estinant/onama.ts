import { Estinant } from './estinant';
import { Pinbetunf } from '../pinbetunf';
import { Tropoignant } from '../tropoignant';
import { Voictent, VoictentToHubblepup, VoictentToQuirm } from '../voictent';
import { Vition } from '../vition';

export type OnamaPinbetunf<
  TInputVoictent extends Voictent,
  TOutputVoictent extends Voictent,
> = Pinbetunf<
  [VoictentToHubblepup<TInputVoictent>],
  VoictentToHubblepup<TOutputVoictent>
>;

export type OnamaTropoignant<
  TInputVoictent extends Voictent,
  TOutputVoictent extends Voictent,
> = Tropoignant<Vition<TInputVoictent, []>, [TOutputVoictent]>;

/**
 * A one to one estinant
 */
export type Onama<
  TInputVoictent extends Voictent,
  TOutputVoictent extends Voictent,
> = Estinant<Vition<TInputVoictent, []>, [TOutputVoictent]>;

export type OnamaBuilderInput<
  TInputVoictent extends Voictent,
  TOutputVoictent extends Voictent,
> = {
  inputGepp: TInputVoictent['gepp'];
  outputGepp: TOutputVoictent['gepp'];
  pinbe: OnamaPinbetunf<TInputVoictent, TOutputVoictent>;
};

export const buildOnama = <
  TInputVoictent extends Voictent,
  TOutputVoictent extends Voictent,
>({
  inputGepp,
  outputGepp,
  pinbe,
}: OnamaBuilderInput<TInputVoictent, TOutputVoictent>): Onama<
  TInputVoictent,
  TOutputVoictent
> => {
  const tropoig: OnamaTropoignant<TInputVoictent, TOutputVoictent> = (
    input,
  ) => {
    const output = pinbe(input);

    const outputQuirm: VoictentToQuirm<TOutputVoictent> = {
      gepp: outputGepp,
      hubblepup: output,
    };

    return [outputQuirm];
  };

  const estinant: Onama<TInputVoictent, TOutputVoictent> = {
    leftAppreffinge: { gepp: inputGepp },
    rightAppreffingeTuple: [],
    tropoig,
  };

  return estinant;
};
