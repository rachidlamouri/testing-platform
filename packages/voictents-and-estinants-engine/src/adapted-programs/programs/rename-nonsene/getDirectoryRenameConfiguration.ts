import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
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
import { shishKebab } from '../../../package-agnostic-utilities/case/shishKebab';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../programmable-units/file/directory';

const ESTINANT_NAME = 'getDirectoryRenameConfiguration' as const;

const linterSource = new EstinantSourceInstance({
  filePath: posix.relative('', __filename),
  estinantName: ESTINANT_NAME,
});

/**
 * Gathers sensible names for directories that need one, and ignores the rest.
 */
export const getDirectoryRenameConfiguration = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<DirectoryVoque>({
    gepp: DIRECTORY_GEPP,
  })
  .toHubblepupTuple2<FileSystemNodeRenameConfigurationVoque>({
    gepp: FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .onPinbe((directory) => {
    const originalName = directory.directoryPath.name.serialized;

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
        filePath: directory.directoryPath.serialized,
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

    const newDirectoryPath = posix.join(
      directory.directoryPath.parentDirectoryPath,
      `${newName}`,
    );

    return {
      [FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP]: [
        new FileSystemNodeRenameConfigurationInstance({
          zorn: directory.zorn,
          newPath: newDirectoryPath,
        }),
      ],
      [LINT_ASSERTION_GEPP]: [],
    };
  })
  .assemble();
