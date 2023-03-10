import { Pinbetunf } from '../../../type-script-adapter/pinbetunf';
import { OdeshinVoictent, OdeshinVoictentToGrition } from '../odeshinVoictent';
import {
  buildOnama as buildTypeScriptAdaptedOnama,
  Onama,
} from '../../../type-script-adapter/estinant/onama';

export type OnamaPinbetunf<
  TInputVoictent extends OdeshinVoictent,
  TOutputVoictent extends OdeshinVoictent,
> = Pinbetunf<
  [OdeshinVoictentToGrition<TInputVoictent>],
  OdeshinVoictentToGrition<TOutputVoictent>
>;

export type OnamaBuilderInput<
  TInputVoictent extends OdeshinVoictent,
  TOutputVoictent extends OdeshinVoictent,
> = {
  inputGepp: TInputVoictent['gepp'];
  outputGepp: TOutputVoictent['gepp'];
  pinbe: OnamaPinbetunf<TInputVoictent, TOutputVoictent>;
};

export const buildOnama = <
  TInputVoictent extends OdeshinVoictent,
  TOutputVoictent extends OdeshinVoictent,
>({
  inputGepp,
  outputGepp,
  pinbe,
}: OnamaBuilderInput<TInputVoictent, TOutputVoictent>): Onama<
  TInputVoictent,
  TOutputVoictent
> =>
  buildTypeScriptAdaptedOnama<TInputVoictent, TOutputVoictent>({
    inputGepp,
    outputGepp,
    pinbe: ({ identifier, grition }) => ({
      identifier,
      grition: pinbe(grition),
    }),
  });
