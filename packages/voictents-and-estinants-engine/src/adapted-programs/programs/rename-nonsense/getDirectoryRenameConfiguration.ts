import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
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
import { shishKebab } from '../../../package-agnostic-utilities/case/shishKebab';
import {
  DIRECTORY_COLLECTION_ID,
  DirectoryStreamMetatype,
} from '../../programmable-units/file/directory';

const PROGRAMMED_TRANSFORM_NAME = 'getDirectoryRenameConfiguration' as const;

const linterSource = new ProgrammedTransformSourceInstance({
  filePath: posix.relative('', __filename),
  programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
});

/**
 * Gathers sensible names for directories that need one, and ignores the rest.
 */
export const getDirectoryRenameConfiguration = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<DirectoryStreamMetatype>({
    collectionId: DIRECTORY_COLLECTION_ID,
  })
  .toItemTuple2<FileSystemNodeRenameConfigurationStreamMetatype>({
    collectionId: FILE_SYSTEM_NODE_RENAME_CONFIGURATION_COLLECTION_ID,
  })
  .toItemTuple2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .onTransform((directory) => {
    const originalName = directory.directoryPath.name.serialized;

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
        filePath: directory.directoryPath.serialized,
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
              filePath: directory.directoryPath.serialized,
              originalName,
              wordStateList: sensibleNameResult.wordStateList,
              sensibilityState: getPhraseSensibilityState(originalName),
            },
          }),
        ],
      };
    }

    const newName = shishKebab(sensibleNameResult.sensibleName);

    const relativeNewPath = posix.join(
      directory.directoryPath.parentDirectoryPath,
      `${newName}`,
    );

    return {
      [FILE_SYSTEM_NODE_RENAME_CONFIGURATION_COLLECTION_ID]: [
        new FileSystemNodeRenameConfigurationInstance({
          id: directory.id,
          isDirectory: true,
          oldNodePath: directory.directoryPath,
          relativeNewPath,
        }),
      ],
      [LINT_ASSERTION_COLLECTION_ID]: [],
    };
  })
  .assemble();
