import Case from 'case';
import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import { FILE_GEPP, FileVoque } from '../../programmable-units/file/file';
import {
  FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP,
  FileSystemNodeRenameConfigurationInstance,
  FileSystemNodeRenameConfigurationVoque,
} from './fileSystemNodeRenameConfiguration';
import { getSensibleNameState } from './getSensibleNameState';
import {
  LINT_ASSERTION_GEPP,
  LintAssertion,
  LintAssertionVoque,
} from '../../programmable-units/linting/lintAssertion';
import { nonsenseIsDocumentedRule } from './nonsenseIsDocumentedRule';
import { FileSourceInstance } from '../../programmable-units/linting/source/fileSource';
import { RequestSourceInstance } from '../../programmable-units/linting/source/requestSource';
import { EstinantSourceInstance } from '../../programmable-units/linting/source/estinantSource';
import { getPhraseSensibilityState } from '../../../layer-agnostic-utilities/nonsense/isSensiblePhrase';

const ESTINANT_NAME = 'getFileRenameConfiguration' as const;

const linterSource = new EstinantSourceInstance({
  filePath: posix.relative('', __filename),
  estinantName: ESTINANT_NAME,
});

/**
 * Gathers sensible names for files that need one, and ignores the rest.
 */
export const getFileRenameConfiguration = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<FileVoque>({
    gepp: FILE_GEPP,
  })
  .toHubblepupTuple2<FileSystemNodeRenameConfigurationVoque>({
    gepp: FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .onPinbe((file) => {
    const originalName = file.filePath.name.extensionless;

    const sensibleNameResult = getSensibleNameState(originalName);

    if (sensibleNameResult.isOriginalNameSensible) {
      return {
        [FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP]: [],
        [LINT_ASSERTION_GEPP]: [],
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
        [LINT_ASSERTION_GEPP]: [
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

    const newFilePath = posix.join(
      file.filePath.parentDirectoryPath,
      `${newName}.${file.filePath.name.extension.serialized}`,
    );

    return {
      [FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP]: [
        new FileSystemNodeRenameConfigurationInstance({
          zorn: file.zorn,
          newPath: newFilePath,
        }),
      ],
      [LINT_ASSERTION_GEPP]: [],
    };
  })
  .assemble();
