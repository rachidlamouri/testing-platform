import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';

type BaseEstinantInputOutput<
  TIsInput extends boolean,
  TIndex extends number | null,
> = {
  id: string;
  voictentName: string;
  isInput: TIsInput;
  index: TIndex;
};

export type EstinantInput2 = BaseEstinantInputOutput<true, number>;

export type EstinantOutput2 = BaseEstinantInputOutput<false, null>;

export type EngineEstinant2 = {
  id: string;
  estinantName: string;
  filePath: string;
  identifierName: string;
  commentText: string;
  inputList: EstinantInput2[];
  outputList: EstinantOutput2[];
  locator: EngineEstinantLocator2;
};

export type EngineEstinant2Grition = Grition<EngineEstinant2>;

export type EngineEstinant2Odeshin = OdeshinFromGrition<EngineEstinant2Grition>;

export const ENGINE_ESTINANT_2_GEPP = 'engine-estinant-2';

export type EngineEstinant2Gepp = typeof ENGINE_ESTINANT_2_GEPP;

export type EngineEstinant2Voictent = Voictent<
  EngineEstinant2Gepp,
  EngineEstinant2Odeshin
>;
