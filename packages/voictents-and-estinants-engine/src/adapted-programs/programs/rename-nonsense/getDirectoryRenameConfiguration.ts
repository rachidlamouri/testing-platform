import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import {
  FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP,
  FileSystemNodeRenameConfigurationInstance,
  FileSystemNodeRenameConfigurationVoque,
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
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../programmable-units/file/directory';

const ESTINANT_NAME = 'getDirectoryRenameConfiguration' as const;

const linterSource = new ProgrammedTransformSourceInstance({
  filePath: posix.relative('', __filename),
  programmedTransformName: ESTINANT_NAME,
});

/**
 * Gathers sensible names for directories that need one, and ignores the rest.
 */
export const getDirectoryRenameConfiguration = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<DirectoryVoque>({
    collectionId: DIRECTORY_GEPP,
  })
  .toHubblepupTuple2<FileSystemNodeRenameConfigurationVoque>({
    collectionId: FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .onTransform((directory) => {
    const originalName = directory.directoryPath.name.serialized;

    const sensibleNameResult = getSensibleNameState(originalName);

    if (sensibleNameResult.isOriginalNameSensible) {
      return {
        [FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP]: [],
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
        [FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP]: [],
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
      [FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP]: [
        new FileSystemNodeRenameConfigurationInstance({
          zorn: directory.zorn,
          isDirectory: true,
          oldNodePath: directory.directoryPath,
          relativeNewPath,
        }),
      ],
      [LINT_ASSERTION_COLLECTION_ID]: [],
    };
  })
  .assemble();
