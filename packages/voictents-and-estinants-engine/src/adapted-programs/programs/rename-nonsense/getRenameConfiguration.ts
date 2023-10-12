import Case from 'case';
import { posix } from 'path';
import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import {
  IDENTIFIER_NODE_LOCATOR_GEPP,
  IdentifierNodeLocatorVoque,
} from './identifierNodeLocator';
import {
  RENAME_CONFIGURATION_GEPP,
  RenameConfigurationInstance,
  RenameConfigurationVoque,
} from './renameConfiguration';
import { ProgrammedTransformSourceInstance } from '../../programmable-units/linting/source/estinantSource';
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

const ESTINANT_NAME = 'getRenameConfiguration' as const;

const linterSource = new ProgrammedTransformSourceInstance({
  filePath: posix.relative('', __filename),
  programmedTransformName: ESTINANT_NAME,
});

/**
 * Gathers information for renaming nonsense identifiers while ignoring sensible
 * ones.
 */
export const getRenameConfiguration = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<IdentifierNodeLocatorVoque>({
    collectionId: IDENTIFIER_NODE_LOCATOR_GEPP,
  })
  .toHubblepupTuple2<RenameConfigurationVoque>({
    collectionId: RENAME_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .onTransform((identifierLocator) => {
    // TODO: identifiers are heavily integrated everywhere in the project. There are only a few instances left in the file to update. Do so when all other objects are renamed.
    if (
      identifierLocator.filePath.serialized ===
        'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/data-structure/id.ts' ||
      identifierLocator.filePath.serialized ===
        'packages/voictents-and-estinants-engine/src/adapter/odeshin/identifiableItem.ts' ||
      identifierLocator.filePath.serialized ===
        'packages/voictents-and-estinants-engine/src/layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2.ts' ||
      identifierLocator.filePath.serialized ===
        'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/type-script-file-relationships/filterEngineProgramFile.ts' ||
      identifierLocator.filePath.serialized ===
        'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/engine-program/getEngineProgramLocator3.ts'
    ) {
      return {
        [RENAME_CONFIGURATION_GEPP]: [],
        [LINT_ASSERTION_COLLECTION_ID]: [],
      };
    }

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
        [RENAME_CONFIGURATION_GEPP]: [],
        [LINT_ASSERTION_COLLECTION_ID]: [],
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
      [LINT_ASSERTION_COLLECTION_ID]: [],
    };
  })
  .assemble();
