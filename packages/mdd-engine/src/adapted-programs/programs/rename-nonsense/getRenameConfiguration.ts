import Case from 'case';
import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  IDENTIFIER_NODE_LOCATOR_COLLECTION_ID,
  IdentifierNodeLocatorStreamMetatype,
} from './identifierNodeLocator';
import {
  RENAME_CONFIGURATION_COLLECTION_ID,
  RenameConfigurationInstance,
  RenameConfigurationStreamMetatype,
} from './renameConfiguration';
import { ProgrammedTransformSourceInstance } from '../../programmable-units/linting/source/programmedTransformSource';
import {
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from '../../programmable-units/linting/lintAssertion';
import { FileLineColumnSourceInstance } from '../../programmable-units/linting/source/fileLineColumnSource';
import { getSensibleNameState } from './getSensibleNameState';
import { RequestSourceInstance } from '../../programmable-units/linting/source/requestSource';
import { nonsenseIsDocumentedRule } from './nonsenseIsDocumentedRule';

const literalAllowSet = new Set(['_']);

const PROGRAMMED_TRANSFORM_NAME = 'getRenameConfiguration' as const;

const linterSource = new ProgrammedTransformSourceInstance({
  filePath: posix.relative('', __filename),
  programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
});

/**
 * Gathers information for renaming nonsense identifiers while ignoring sensible
 * ones.
 */
export const getRenameConfiguration = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<IdentifierNodeLocatorStreamMetatype>({
    collectionId: IDENTIFIER_NODE_LOCATOR_COLLECTION_ID,
  })
  .toItemTuple2<RenameConfigurationStreamMetatype>({
    collectionId: RENAME_CONFIGURATION_COLLECTION_ID,
  })
  .toItemTuple2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .onTransform((identifierLocator) => {
    const originalName = identifierLocator.node.name;
    const oneBasedLineNumber = identifierLocator.node.loc.start.line;
    const oneBasedLineOffset = identifierLocator.node.loc.start.column + 1;

    const sensibleNameResult = getSensibleNameState(originalName);

    if (
      originalName === '__filename' ||
      sensibleNameResult.isOriginalNameSensible ||
      literalAllowSet.has(originalName)
    ) {
      return {
        [RENAME_CONFIGURATION_COLLECTION_ID]: [],
        [LINT_ASSERTION_COLLECTION_ID]: [],
      };
    }

    const lintSource = new RequestSourceInstance({
      requestor: linterSource,
      requestee: new FileLineColumnSourceInstance({
        filePath: identifierLocator.filePath.serialized,
        lineNumber: `${oneBasedLineNumber}:`,
        // TODO: figure out why we need the locator id
        columnNumber: `${oneBasedLineOffset} ${identifierLocator.id.forMachine}`,
      }),
    });

    if (sensibleNameResult.sensibleName === null) {
      return {
        [RENAME_CONFIGURATION_COLLECTION_ID]: [],
        [LINT_ASSERTION_COLLECTION_ID]: [
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
      [RENAME_CONFIGURATION_COLLECTION_ID]: [
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
      [LINT_ASSERTION_COLLECTION_ID]: [],
    };
  })
  .assemble();
