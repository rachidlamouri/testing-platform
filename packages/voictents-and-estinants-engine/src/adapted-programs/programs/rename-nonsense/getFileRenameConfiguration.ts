import Case from 'case';
import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import { FILE_GEPP, FileVoque } from '../../programmable-units/file/file';
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

const ESTINANT_NAME = 'getFileRenameConfiguration' as const;

const linterSource = new ProgrammedTransformSourceInstance({
  filePath: posix.relative('', __filename),
  programmedTransformName: ESTINANT_NAME,
});

/**
 * Gathers sensible names for files that need one, and ignores the rest.
 */
export const getFileRenameConfiguration = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<FileVoque>({
    collectionId: FILE_GEPP,
  })
  .toHubblepupTuple2<FileSystemNodeRenameConfigurationVoque>({
    collectionId: FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .onTransform((file) => {
    const originalName = file.filePath.name.extensionless;

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
        filePath: file.filePath.serialized,
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
      [FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP]: [
        new FileSystemNodeRenameConfigurationInstance({
          zorn: file.zorn,
          isDirectory: false,
          oldNodePath: file.filePath,
          relativeNewPath,
        }),
      ],
      [LINT_ASSERTION_COLLECTION_ID]: [],
    };
  })
  .assemble();
