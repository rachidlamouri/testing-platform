import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  BASH_FILE_GEPP,
  BashFileVoque,
} from '../../programmable-units/bash-file/bashFile';
import {
  SERIALIZED_CI_MODEL_GEPP,
  SerializedCiModelVoque,
} from './serializedCiModel';
import {
  PROGRAM_ERROR_2_GEPP,
  ProgramError2ElementLocatorTypeName,
  GenericProgramError2Voque,
  ReportedProgramError2,
  ReportingEstinantLocator,
} from '../../programmable-units/error/programError2';

const ESTINANT_NAME = 'assertCiFileIsUpToDate' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramError2ElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

const CI_FILE_PATH = 'packages/voictents-and-estinants-engine/ci.sh';

/**
 * Produces a ProgramError if ci.sh does not match the serialized model
 */
export const assertCiFileIsUpToDate = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<SerializedCiModelVoque>({
    gepp: SERIALIZED_CI_MODEL_GEPP,
  })
  .andFromHubblepupTuple2<BashFileVoque, [string]>({
    gepp: BASH_FILE_GEPP,
    framate: () => [CI_FILE_PATH],
    croard: (leftInput) => leftInput.hubblepup.filePath,
  })
  .toHubblepupTuple2<GenericProgramError2Voque>({
    gepp: PROGRAM_ERROR_2_GEPP,
  })
  .onPinbe((serializeCiModel, [ciFile]) => {
    const onDiskContents = fs.readFileSync(ciFile.filePath, 'utf-8');

    if (serializeCiModel.grition !== onDiskContents) {
      return [
        {
          name: 'stale-ci-file',
          error: new Error('CI file is not up to date'),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramError2ElementLocatorTypeName.SourceFileLocator,
            filePath: ciFile.filePath,
          },
          context: null,
        } satisfies ReportedProgramError2<ReportingLocator>,
      ];
    }

    return [];
  })
  .assemble();
