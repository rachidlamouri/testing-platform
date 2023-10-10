import Case from 'case';
import { getPhraseSensibilityState } from '../../../layer-agnostic-utilities/nonsense/isSensiblePhrase';
import { nonsenseDictionary } from '../../../layer-agnostic-utilities/nonsense/nonsenseDictionary';

type WordState = {
  wordToUse: string;
  originalWord: string;
  isSensible: boolean;
  isReady: boolean;
};

type SuccessState = {
  isOriginalNameSensible: true;
  sensibleName: string;
  wordStateList: null;
};

type ErrorState = {
  isOriginalNameSensible: false;
  sensibleName: string | null;
  wordStateList: WordState[];
};

export type SensibleNameState = SuccessState | ErrorState;

/**
 * Acquires information about a name (eg. a file or TypeScript identifier) to
 * see if it can be automatically renamed
 */
export const getSensibleNameState = (
  originalName: string,
): SensibleNameState => {
  const sensibilityState = getPhraseSensibilityState(originalName);
  const originalCaseTypeName = Case.of(originalName) as keyof typeof Case;

  const modifiedCaseTypeName = ((): keyof typeof Case => {
    switch (originalCaseTypeName) {
      case 'capital':
        return 'pascal';
      case 'lower':
        return 'camel';
      case 'pascal':
      case 'camel':
      case 'kebab':
      case 'constant':
        return originalCaseTypeName;
      case 'upper':
      case 'snake':
      case 'header':
      case 'title':
      case 'sentence':
      case 'of':
      case 'flip':
      case 'random':
      case 'type':
        throw Error(
          `Unhandled key: "${originalCaseTypeName}" for value "${originalName}"`,
        );
    }
  })();

  const applyCase = (text: string): string => {
    const method = Case[modifiedCaseTypeName] as (text: string) => string;
    const result = method(text);

    return result;
  };

  if (sensibilityState.isSensible) {
    return {
      isOriginalNameSensible: true,
      sensibleName: originalName,
      wordStateList: null,
    };
  }

  const wordStateList: WordState[] = sensibilityState.wordList
    .map((word) => {
      if (word.isSensible) {
        return {
          wordToUse: word.word,
          originalWord: word.word,
          isSensible: word.isSensible,
          isReady: true,
        };
      }

      const replacement = nonsenseDictionary.get(word.word) ?? null;

      if (replacement === null) {
        return {
          wordToUse: word.word,
          originalWord: word.word,
          isSensible: word.isSensible,
          isReady: false,
        };
      }

      return {
        wordToUse: replacement.suggestion,
        originalWord: word.word,
        isSensible: word.isSensible,
        isReady: true,
      };
    })
    .filter((replacement) => replacement.wordToUse.trim() !== '');

  if (!wordStateList.every((replacement) => replacement.isReady)) {
    return {
      isOriginalNameSensible: false,
      sensibleName: null,
      wordStateList,
    };
  }

  const sensibleName = applyCase(
    wordStateList.map((replacement) => replacement.wordToUse).join('-'),
  );

  return {
    isOriginalNameSensible: false,
    sensibleName,
    wordStateList,
  };
};
