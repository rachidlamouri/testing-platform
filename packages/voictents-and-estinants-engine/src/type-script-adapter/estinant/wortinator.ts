import { Estinant } from './estinant';
import { Pinbetunf } from '../pinbetunf';
import { Tropoignant } from '../tropoignant';
import { Voictent, VoictentToHubblepup } from '../voictent';
import { Vition } from '../vition';

export type WortinatorPinbetunf<TInputVoictent extends Voictent> = Pinbetunf<
  [VoictentToHubblepup<TInputVoictent>],
  void
>;

export type WortinatorTropoignant<TInputVoictent extends Voictent> =
  Tropoignant<Vition<TInputVoictent, []>, []>;

/**
 * A one to zero estinant
 */
export type Wortinator<TInputVoictent extends Voictent> = Estinant<
  Vition<TInputVoictent, []>,
  []
>;

export type WortinatorBuilderInput<TInputVoictent extends Voictent> =
  | {
      inputGepp: TInputVoictent['gepp'];
      isWibiz?: never;
      pinbe: WortinatorPinbetunf<TInputVoictent>;
    }
  | {
      inputGepp: TInputVoictent['gepp'];
      isWibiz: boolean;
      pinbe: WortinatorPinbetunf<TInputVoictent>;
    };

export const buildWortinator = <TInputVoictent extends Voictent>({
  inputGepp,
  isWibiz,
  pinbe,
}: WortinatorBuilderInput<TInputVoictent>): Wortinator<TInputVoictent> => {
  const tropoig: WortinatorTropoignant<TInputVoictent> = (input) => {
    pinbe(input);
    return [];
  };

  const estinant: Wortinator<TInputVoictent> = {
    leftAppreffinge: { gepp: inputGepp, isWibiz },
    rightAppreffingeTuple: [],
    tropoig,
  };

  return estinant;
};
