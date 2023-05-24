import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  BASH_FILE_GEPP,
  BashFileVoque,
} from '../../programmable-units/bash-file/bashFile';
import {
  ErrorLocatorTypeName,
  PROGRAM_ERROR_GEPP,
  ProgramError,
  ProgramErrorVoque,
} from '../../programmable-units/error/programError';
import {
  SERIALIZED_CI_MODEL_GEPP,
  SerializedCiModelVoque,
} from './serializedCiModel';

const CI_FILE_PATH = 'packages/voictents-and-estinants-engine/ci.sh';

/**
 * Produces a ProgramError if ci.sh does not match the serialized model
 */
export const assertCiFileIsUpToDate = buildEstinant({
  name: 'assertCiFileIsUpToDate',
})
  .fromHubblepup2<SerializedCiModelVoque>({
    gepp: SERIALIZED_CI_MODEL_GEPP,
  })
  .andFromHubblepupTuple2<BashFileVoque, [string]>({
    gepp: BASH_FILE_GEPP,
    framate: () => [CI_FILE_PATH],
    croard: (leftInput) => leftInput.hubblepup.filePath,
  })
  .toHubblepupTuple2<ProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((serializeCiModel, [ciFile]) => {
    const onDiskContents = fs.readFileSync(ciFile.filePath, 'utf-8');

    if (serializeCiModel.grition !== onDiskContents) {
      return [
        {
          errorId: 'assertCiFileIsUpToDate/stale-ci-file',
          message: 'CI file is not up to date',
          locator: {
            typeName: ErrorLocatorTypeName.FileErrorLocator,
            filePath: ciFile.filePath,
          },
          metadata: null,
        } satisfies ProgramError,
      ];
    }

    return [];
  })
  .assemble();
