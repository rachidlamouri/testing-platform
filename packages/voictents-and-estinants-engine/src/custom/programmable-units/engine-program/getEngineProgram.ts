import * as uuid from 'uuid';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_ESTINANT_GEPP,
  EngineEstinantVoictent,
  getEngineEstinantIdentifier,
} from './engineEstinant';
import { ENGINE_PROGRAM_GEPP, EngineProgramVoictent } from './engineProgram';
import {
  ENGINE_PROGRAM_LOCATOR_GEPP,
  EngineProgramLocatorVoictent,
} from './engineProgramLocator';

export const getEngineProgram = buildEstinant({
  name: 'getEngineProgram',
})
  .fromGrition<EngineProgramLocatorVoictent>({
    gepp: ENGINE_PROGRAM_LOCATOR_GEPP,
  })
  .andFromGritionTuple<EngineEstinantVoictent, Tuple<string>>({
    gepp: ENGINE_ESTINANT_GEPP,
    framate: (leftInput) => leftInput.grition.estinantIdentifierList,
    croard: (rightInput) =>
      getEngineEstinantIdentifier(
        rightInput.grition.programName,
        rightInput.grition.estinantName,
      ),
  })
  .toGrition<EngineProgramVoictent>({
    gepp: ENGINE_PROGRAM_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((programLocator, estinantList) => {
    const { programName, filePath } = programLocator;

    return {
      id: uuid.v4(),
      programName,
      filePath,
      estinantList,
    };
  })
  .assemble();
