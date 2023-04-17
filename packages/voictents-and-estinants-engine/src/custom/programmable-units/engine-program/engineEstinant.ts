import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { EstinantInputList } from './estinant-input-output/estinantInputList';
import { EstinantOutputList } from './estinant-input-output/estinantOutputList';

// TODO: rename this so it's not confused with an actual Estinant
export type EngineEstinant = {
  id: string;
  programName: string;
  estinantName: string;
  estinantFilePath: string;
  exportedIdentifierName: string;
  inputList: EstinantInputList;
  outputList: EstinantOutputList;
};

export type EngineEstinantGrition = Grition<EngineEstinant>;

export type EngineEstinantOdeshin = OdeshinFromGrition<EngineEstinant>;

export const ENGINE_ESTINANT_GEPP = 'engine-estinant';

export type EngineEstinantGepp = typeof ENGINE_ESTINANT_GEPP;

export type EngineEstinantVoictent = Voictent<
  EngineEstinantGepp,
  EngineEstinantOdeshin
>;

export const getEngineEstinantIdentifier = (
  programName: string,
  estinantNodeIdentifierName: string,
): string => `${programName}/${estinantNodeIdentifierName}`;
