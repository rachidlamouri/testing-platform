import { StandardInMemoryVoque } from '../../../core/engine/inMemoryVoque';
import { Voictent } from '../../adapter/voictent';

type ProgramTest = {
  programName: string;
  programFilePath: string;
  prefaceDescription: string;
};

export type CiModel = {
  zorn: string;
  initialCommandList: string[];
  finalCommandList: string[];
  programTestList: ProgramTest[];
};

export const CI_MODEL_GEPP = 'ci-model';

export type CiModelGepp = typeof CI_MODEL_GEPP;

export type CiModelVoictent = Voictent<CiModelGepp, CiModel>;

export type CiModelVoque = StandardInMemoryVoque<CiModelGepp, CiModel>;

export const CI_MODEL_ZORN = 'CI_MODEL';

export const CI_MODEL: CiModel = {
  zorn: CI_MODEL_ZORN,
  initialCommandList: ['set -e'],
  finalCommandList: ['echo "Finished without errors!"'],
  programTestList: [
    {
      programName: 'model-programs',
      programFilePath:
        'packages/voictents-and-estinants-engine/src/custom/programs/model-programs/modelPrograms.ts',
      prefaceDescription: 'Testing program models have not changed',
    },
  ],
};
