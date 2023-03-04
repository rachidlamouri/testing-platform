import { Predicate } from '../../utilities/predicate';
import { Tropoignant } from '../tropoignant';
import { Vition } from '../vition';
import {
  Voictent,
  VoictentToHubblepup,
  VoictentTuple,
  VoictentTupleToQuirm,
} from '../voictent';
import { Estinant } from './estinant';

export type MattomerPinbetunf<
  TInputVoictent extends Voictent,
  TOutputVoictentOptionTuple extends VoictentTuple,
  TOutputVoictent extends TOutputVoictentOptionTuple[number],
> = Predicate<
  VoictentToHubblepup<TInputVoictent>,
  VoictentToHubblepup<TOutputVoictent>
>;

/**
 * A collection of a MattomerPinbetunf, and the Gepp that will recategorize a Hubblepup, if the Hubblepup passes the MattomerPinbetunf
 */
type Kerz<
  TInputVoictent extends Voictent,
  TOutputVoictentOptionTuple extends VoictentTuple,
  TOutputVoictent extends TOutputVoictentOptionTuple[number],
> = {
  gepp: TOutputVoictent['gepp'];
  pinbe: MattomerPinbetunf<
    TInputVoictent,
    TOutputVoictentOptionTuple,
    TOutputVoictent
  >;
};

export type KerzTuple<
  TInputVoictent extends Voictent,
  TOutputVoictentOptionTuple extends VoictentTuple,
> = {
  [Index in keyof TOutputVoictentOptionTuple]: Kerz<
    TInputVoictent,
    TOutputVoictentOptionTuple,
    TOutputVoictentOptionTuple[Index]
  >;
};

type MattomerOutput<TOutputVoictentOptionTuple extends VoictentTuple> =
  | []
  | [TOutputVoictentOptionTuple[number]];

export type MattomerTropoignant<
  TInputVoictent extends Voictent,
  TOutputVoictentOptionTuple extends VoictentTuple,
> = Tropoignant<
  Vition<TInputVoictent, []>,
  MattomerOutput<TOutputVoictentOptionTuple>
>;

/**
 * An Estinant for recategorizing a Hubblepup
 */
export type Mattomer<
  TInputVoictent extends Voictent,
  TOutputVoictentOptionTuple extends VoictentTuple,
> = Estinant<
  Vition<TInputVoictent, []>,
  MattomerOutput<TOutputVoictentOptionTuple>
>;

export type MattomerBuilderInput<
  TInputVoictent extends Voictent,
  TOutputVoictentOptionTuple extends VoictentTuple,
> = {
  inputGepp: TInputVoictent['gepp'];
  kerzTuple: KerzTuple<TInputVoictent, TOutputVoictentOptionTuple>;
};

export const buildMattomer = <
  TInputVoictent extends Voictent,
  TOutputVoictentOptionTuple extends VoictentTuple,
>({
  inputGepp,
  kerzTuple,
}: MattomerBuilderInput<TInputVoictent, TOutputVoictentOptionTuple>): Mattomer<
  TInputVoictent,
  TOutputVoictentOptionTuple
> => {
  const tropoig: MattomerTropoignant<
    TInputVoictent,
    TOutputVoictentOptionTuple
  > = (input: VoictentToHubblepup<TInputVoictent>) => {
    const matchingKerz = kerzTuple.find((kerz) => kerz.pinbe(input));

    if (matchingKerz === undefined) {
      return [];
    }

    const outputQuirm: VoictentTupleToQuirm<TOutputVoictentOptionTuple> = {
      gepp: matchingKerz.gepp,
      hubblepup: input,
    };

    return [outputQuirm];
  };

  const estinant: Mattomer<TInputVoictent, TOutputVoictentOptionTuple> = {
    leftAppreffinge: { gepp: inputGepp },
    rightAppreffingeTuple: [],
    tropoig,
  };

  return estinant;
};
