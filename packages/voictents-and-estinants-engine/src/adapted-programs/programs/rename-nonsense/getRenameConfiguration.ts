import Case from 'case';
import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import {
  IDENTIFIER_NODE_LOCATOR_GEPP,
  IdentifierNodeLocatorVoque,
} from './identifierNodeLocator';
import {
  RENAME_CONFIGURATION_GEPP,
  RenameConfigurationInstance,
  RenameConfigurationVoque,
} from './renameConfiguration';
import { EstinantSourceInstance } from '../../programmable-units/linting/source/estinantSource';
import {
  LINT_ASSERTION_GEPP,
  LintAssertion,
  LintAssertionVoque,
} from '../../programmable-units/linting/lintAssertion';
import { FileLineColumnSourceInstance } from '../../programmable-units/linting/source/fileLineColumnSource';
import { getSensibleNameState } from './getSensibleNameState';
import { RequestSourceInstance } from '../../programmable-units/linting/source/requestSource';
import { nonsenseIsDocumentedRule } from './nonsenseIsDocumentedRule';

const ESTINANT_NAME = 'getRenameConfiguration' as const;

const linterSource = new EstinantSourceInstance({
  filePath: posix.relative('', __filename),
  estinantName: ESTINANT_NAME,
});

/**
 * Gathers information for renaming nonsense identifiers while ignoring sensible
 * ones.
 */
export const getRenameConfiguration = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<IdentifierNodeLocatorVoque>({
    gepp: IDENTIFIER_NODE_LOCATOR_GEPP,
  })
  .toHubblepupTuple2<RenameConfigurationVoque>({
    gepp: RENAME_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .onPinbe((identifierLocator) => {
    const originalName = identifierLocator.node.name;
    const oneBasedLineNumber = identifierLocator.node.loc.start.line;
    const oneBasedLineOffset = identifierLocator.node.loc.start.column + 1;

    const sensibleNameResult = getSensibleNameState(originalName);

    if (sensibleNameResult.isOriginalNameSensible) {
      return {
        [RENAME_CONFIGURATION_GEPP]: [],
        [LINT_ASSERTION_GEPP]: [],
      };
    }

    const lintSource = new RequestSourceInstance({
      requestor: linterSource,
      requestee: new FileLineColumnSourceInstance({
        filePath: identifierLocator.filePath.serialized,
        lineNumber: `${oneBasedLineNumber}:`,
        // TODO: figure out why we need the locator id
        columnNumber: `${oneBasedLineOffset} ${identifierLocator.zorn.forMachine}`,
      }),
    });

    if (sensibleNameResult.sensibleName === null) {
      return {
        [RENAME_CONFIGURATION_GEPP]: [],
        [LINT_ASSERTION_GEPP]: [
          new LintAssertion({
            rule: nonsenseIsDocumentedRule,
            lintSource,
            errorMessageContext: {},
            isValid: false,
            context: {
              filePath: identifierLocator.filePath.serialized,
              oneBasedLineNumber,
              oneBasedLineOffset,
              originalName,
              wordStateList: sensibleNameResult.wordStateList,
            },
          }),
        ],
      };
    }

    return {
      [RENAME_CONFIGURATION_GEPP]: [
        new RenameConfigurationInstance({
          identifierLocator,
          originalName,
          casing: Case.of(originalName),
          oneBasedLineNumber,
          oneBasedLineOffset,
          newName: sensibleNameResult.sensibleName,
          nameSensibilityState: sensibleNameResult,
        }),
      ],
      [LINT_ASSERTION_GEPP]: [],
    };
  })
  .assemble();
