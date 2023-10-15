import fs from 'fs';
import assert from 'assert';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  BASH_FILE_COLLECTION_ID,
  BashFileStreamMetatype,
} from '../../programmable-units/bash-file/bashFile';
import {
  SERIALIZED_CI_MODEL_COLLECTION_ID,
  SerializedCiModelStreamMetatype,
} from './serializedCiModel';
import {
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorStreamMetatype,
  ReportedProgramError,
  ReportingProgrammedTransformLocator,
} from '../../programmable-units/error/programError';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';

const PROGRAMMED_TRANSFORM_NAME = 'assertCiFileIsUpToDate' as const;
type ProgrammedTransformName = typeof PROGRAMMED_TRANSFORM_NAME;
type ReportingLocator =
  ReportingProgrammedTransformLocator<ProgrammedTransformName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: PROGRAMMED_TRANSFORM_NAME,
  filePath: __filename,
};

const CI_FILE_PATH = 'packages/voictents-and-estinants-engine/ci.sh';

/**
 * Produces a ProgramError if ci.sh does not match the serialized model
 */
export const assertCiFileIsUpToDate = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<SerializedCiModelStreamMetatype>({
    collectionId: SERIALIZED_CI_MODEL_COLLECTION_ID,
  })
  .andFromItemTuple2<BashFileStreamMetatype, [IdentifiableItemId]>({
    collectionId: BASH_FILE_COLLECTION_ID,
    getRightKeyTuple: () => [CI_FILE_PATH],
    getRightKey: (leftInput) => leftInput.item.filePath.serialized,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((serializeCiModel, [ciFile]) => {
    const onDiskContents = fs.readFileSync(ciFile.filePath.serialized, 'utf-8');

    const actual = onDiskContents;
    const expected = serializeCiModel.subitem;

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
