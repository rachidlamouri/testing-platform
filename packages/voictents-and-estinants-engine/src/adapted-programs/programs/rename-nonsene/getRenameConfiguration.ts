import Case from 'case';
import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import { getPhraseSensibilityState } from '../../../layer-agnostic-utilities/nonsense/isSensiblePhrase';
import {
  IDENTIFIER_NODE_LOCATOR_GEPP,
  IdentifierNodeLocatorVoque,
} from './identifierNodeLocator';
import {
  RENAME_CONFIGURATION_GEPP,
  RenameConfigurationInstance,
  RenameConfigurationVoque,
} from './renameConfiguration';
import {
  EmptyMessageContext,
  TypedRule,
} from '../../programmable-units/linting/rule';
import { EstinantSourceInstance } from '../../programmable-units/linting/source/estinantSource';
import {
  LINT_ASSERTION_GEPP,
  LintAssertion,
  LintAssertionVoque,
} from '../../programmable-units/linting/lintAssertion';
import { nonsenseDictionary } from '../../../layer-agnostic-utilities/nonsense/nonsenseDictionary';
import { FileSourceInstance } from '../../programmable-units/linting/source/fileSource';
import { FileLineSourceInstance } from '../../programmable-units/linting/source/fileLineSource';
import { renameDictionary } from '../../../layer-agnostic-utilities/nonsense/renameDictionary';
import { TypeScriptFunction } from '../../../package-agnostic-utilities/function/typeScriptFunction';
import { isNotNull } from '../../../package-agnostic-utilities/nil/isNotNull';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import { assertNotNull } from '../../../package-agnostic-utilities/nil/assertNotNull';

const ESTINANT_NAME = 'getRenameConfiguration' as const;

const ruleSource = new EstinantSourceInstance({
  filePath: posix.relative('', __filename),
  estinantName: ESTINANT_NAME,
});

const nonsenseIsDocumentedRule = new TypedRule<EmptyMessageContext>({
  name: 'nonsense-is-documented',
  description:
    'Nonsense should be documented for automatic renaming and for posterity',
  source: ruleSource,
  getErrorMessage: (): string => {
    return 'One or more nonsense words were not found in the nonsense dictionary';
  },
});

const renameIsDocumentedRule = new TypedRule<EmptyMessageContext>({
  name: 'rename-is-documented',
  description: 'Full identifier renames should be documented for posterity',
  source: ruleSource,
  getErrorMessage: (): string => {
    return 'A nonsense phrase was not found in the renameDictionary';
  },
});

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
    const caseTypeName = Case.of(originalName) as keyof typeof Case;

    const applyCase = (text: string): string => {
      const method = Case[caseTypeName] as (text: string) => string;
      const result = method(text);

      return result;
    };

    const sensibilityState = getPhraseSensibilityState(originalName);

    if (sensibilityState.isSensible) {
      return {
        [RENAME_CONFIGURATION_GEPP]: [],
        [LINT_ASSERTION_GEPP]: [],
      };
    }

    const lintSource = new FileLineSourceInstance({
      filePath: identifierLocator.filePath.serialized,
      // TODO: make a FileLineColumnSourceInstance
      lineNumber: `${oneBasedLineNumber}:${oneBasedLineOffset} ${identifierLocator.zorn.forMachine}`,
    });

    const replacementList = sensibilityState.wordList
      .map((word) => {
        if (word.isSensible) {
          return {
            word: word.word,
            originalWord: word.word,
            isSensible: word.isSensible,
            isFinal: true,
          };
        }

        const replacement = nonsenseDictionary.get(word.word) ?? null;

        if (replacement === null) {
          return {
            word: word.word,
            originalWord: word.word,
            isSensible: word.isSensible,
            isFinal: false,
          };
        }

        return {
          word: replacement.suggestion,
          originalWord: word.word,
          isSensible: word.isSensible,
          isFinal: replacement.isFinal ?? false,
        };
      })
      .filter((replacement) => replacement.word.trim() !== '');

    if (
      replacementList.some(
        (replacement) => replacement === null || !replacement.isFinal,
      )
    ) {
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
              replacementList,
            },
          }),
        ],
      };
    }

    const renamedName = renameDictionary.get(originalName) ?? null;
    const suggestedName = applyCase(
      replacementList
        .map((replacement) => {
          assertNotNull(replacement);
          return replacement.word;
        })
        .join('-'),
    );

    if (
      replacementList.some((replacement) => !(replacement?.isFinal ?? false)) &&
      renamedName === null
    ) {
      return {
        [RENAME_CONFIGURATION_GEPP]: [],
        [LINT_ASSERTION_GEPP]: [
          new LintAssertion({
            rule: renameIsDocumentedRule,
            lintSource,
            errorMessageContext: {},
            isValid: false,
            context: {
              filePath: identifierLocator.filePath.serialized,
              oneBasedLineNumber,
              oneBasedLineOffset,
              originalName,
              suggestedName,
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
          sensibilityState,
        }),
      ],
      [LINT_ASSERTION_GEPP]: [],
    };
  })
  .assemble();
