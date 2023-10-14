import Case from 'case';
import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  FILE_COLLECTION_ID,
  FileStreamMetatype,
} from '../../programmable-units/file/file';
import {
  FILE_SYSTEM_NODE_RENAME_CONFIGURATION_COLLECTION_ID,
  FileSystemNodeRenameConfigurationInstance,
  FileSystemNodeRenameConfigurationStreamMetatype,
} from './fileSystemNodeRenameConfiguration';
import { getSensibleNameState } from './getSensibleNameState';
import {
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from '../../programmable-units/linting/lintAssertion';
import { nonsenseIsDocumentedRule } from './nonsenseIsDocumentedRule';
import { FileSourceInstance } from '../../programmable-units/linting/source/fileSource';
import { RequestSourceInstance } from '../../programmable-units/linting/source/requestSource';
import { ProgrammedTransformSourceInstance } from '../../programmable-units/linting/source/estinantSource';
import { getPhraseSensibilityState } from '../../../layer-agnostic-utilities/nonsense/isSensiblePhrase';

const PROGRAMMED_TRANSFORM_NAME = 'getFileRenameConfiguration' as const;

const linterSource = new ProgrammedTransformSourceInstance({
  filePath: posix.relative('', __filename),
  programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
});

/**
 * Gathers sensible names for files that need one, and ignores the rest.
 */
export const getFileRenameConfiguration = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<FileStreamMetatype>({
    collectionId: FILE_COLLECTION_ID,
  })
  .toItemTuple2<FileSystemNodeRenameConfigurationStreamMetatype>({
    collectionId: FILE_SYSTEM_NODE_RENAME_CONFIGURATION_COLLECTION_ID,
  })
  .toItemTuple2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .onTransform((file) => {
    const originalName = file.filePath.name.extensionless;

    const sensibleNameResult = getSensibleNameState(originalName);

    if (sensibleNameResult.isOriginalNameSensible) {
      return {
        [FILE_SYSTEM_NODE_RENAME_CONFIGURATION_COLLECTION_ID]: [],
        [LINT_ASSERTION_COLLECTION_ID]: [],
      };
    }

    const lintSource = new RequestSourceInstance({
      requestor: linterSource,
      requestee: new FileSourceInstance({
        filePath: file.filePath.serialized,
      }),
    });

    if (sensibleNameResult.sensibleName === null) {
      return {
        [FILE_SYSTEM_NODE_RENAME_CONFIGURATION_COLLECTION_ID]: [],
        [LINT_ASSERTION_COLLECTION_ID]: [
          new LintAssertion({
            rule: nonsenseIsDocumentedRule,
            lintSource,
            errorMessageContext: {},
            isValid: false,
            context: {
              filePath: file.filePath.serialized,
              originalName,
              wordStateList: sensibleNameResult.wordStateList,
              sensibilityState: getPhraseSensibilityState(originalName),
            },
          }),
        ],
      };
    }

    const newName = Case.camel(sensibleNameResult.sensibleName);

    const relativeNewPath = posix.join(
      file.filePath.parentDirectoryPath,
      `${newName}.${file.filePath.name.extension.serialized}`,
    );

    return {
      [FILE_SYSTEM_NODE_RENAME_CONFIGURATION_COLLECTION_ID]: [
        new FileSystemNodeRenameConfigurationInstance({
          id: file.id,
          isDirectory: false,
          oldNodePath: file.filePath,
          relativeNewPath,
        }),
      ],
      [LINT_ASSERTION_COLLECTION_ID]: [],
    };
  })
  .assemble();
