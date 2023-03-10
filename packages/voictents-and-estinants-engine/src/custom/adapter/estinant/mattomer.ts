import { Predicate } from '../../../utilities/predicate';
import {
  OdeshinVoictent,
  OdeshinVoictentTuple,
  OdeshinVoictentToGrition,
} from '../odeshinVoictent';
import {
  buildMattomer as buildTypeScriptAdaptedMattomer,
  KerzTuple as TypeScriptAdaptedKerzTuple,
  Mattomer,
} from '../../../type-script-adapter/estinant/mattomer';

export type MattomerPinbetunf<
  TInputVoictent extends OdeshinVoictent,
  TOutputVoictentOptionTuple extends OdeshinVoictentTuple,
  TOutputVoictent extends TOutputVoictentOptionTuple[number],
> = Predicate<
  OdeshinVoictentToGrition<TInputVoictent>,
  OdeshinVoictentToGrition<TOutputVoictent>
>;

/**
 * A collection of a MattomerPinbetunf, and the Gepp that will recategorize a Hubblepup, if the Hubblepup passes the MattomerPinbetunf
 */
type Kerz<
  TInputVoictent extends OdeshinVoictent,
  TOutputVoictentOptionTuple extends OdeshinVoictentTuple,
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
  TInputVoictent extends OdeshinVoictent,
  TOutputVoictentOptionTuple extends OdeshinVoictentTuple,
> = {
  [Index in keyof TOutputVoictentOptionTuple]: Kerz<
    TInputVoictent,
    TOutputVoictentOptionTuple,
    TOutputVoictentOptionTuple[Index]
  >;
};

export type MattomerBuilderInput<
  TInputVoictent extends OdeshinVoictent,
  TOutputVoictentOptionTuple extends OdeshinVoictentTuple,
> = {
  inputGepp: TInputVoictent['gepp'];
  kerzTuple: KerzTuple<TInputVoictent, TOutputVoictentOptionTuple>;
};

export const buildMattomer = <
  TInputVoictent extends OdeshinVoictent,
  TOutputVoictentOptionTuple extends OdeshinVoictentTuple,
>({
  inputGepp,
  kerzTuple,
}: MattomerBuilderInput<TInputVoictent, TOutputVoictentOptionTuple>): Mattomer<
  TInputVoictent,
  TOutputVoictentOptionTuple
> =>
  buildTypeScriptAdaptedMattomer<TInputVoictent, TOutputVoictentOptionTuple>({
    inputGepp,
    kerzTuple: kerzTuple.map(({ gepp, pinbe }) => ({
      gepp,
      pinbe: (hubblepup) => pinbe(hubblepup.grition),
    })) as TypeScriptAdaptedKerzTuple<
      TInputVoictent,
      TOutputVoictentOptionTuple
    >,
  });
