import fs from 'fs';
import assert from 'assert';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  BASH_FILE_GEPP,
  BashFileVoque,
} from '../../programmable-units/bash-file/bashFile';
import {
  SERIALIZED_CI_MODEL_GEPP,
  SerializedCiModelVoque,
} from './serializedCiModel';
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorVoque,
  ReportedProgramError,
  ReportingEstinantLocator,
} from '../../programmable-units/error/programError';
import { OdeshinZorn } from '../../../adapter/odeshin2';

const ESTINANT_NAME = 'assertCiFileIsUpToDate' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
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
  .andFromHubblepupTuple2<BashFileVoque, [OdeshinZorn]>({
    gepp: BASH_FILE_GEPP,
    framate: () => [CI_FILE_PATH],
    croard: (leftInput) => leftInput.hubblepup.filePath.serialized,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((serializeCiModel, [ciFile]) => {
    const onDiskContents = fs.readFileSync(ciFile.filePath.serialized, 'utf-8');

    const actual = onDiskContents;
    const expected = serializeCiModel.grition;

    try {
      assert.strictEqual(actual, expected);
    } catch (error) {
      return [
        {
          name: 'stale-ci-file',
          error: new Error('CI file is not up to date'),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: ciFile.filePath.serialized,
          },
          context: {
            error,
          },
        } satisfies ReportedProgramError<ReportingLocator>,
      ];
    }

    return [];
  })
  .assemble();
