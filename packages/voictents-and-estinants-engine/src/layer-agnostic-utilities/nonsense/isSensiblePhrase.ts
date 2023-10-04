import Case from 'case';
import {
  SHISH_KEBAB_SKEWER,
  shishKebab,
} from '../../package-agnostic-utilities/case/shishKebab';
import { wordSet } from './wordSet';
import { customWordSet } from './customWordSet';
import { SpreadN } from '../../package-agnostic-utilities/type/spreadN';

type AnalyzedPhrase = {
  phrase: string;
  caseTypeName: string;
};

const analyzePhrase = (phrase: string): AnalyzedPhrase => {
  const caseTypeName = Case.of(phrase);

  return {
    phrase,
    caseTypeName,
  };
};

type ParsedPhrase = SpreadN<
  [
    AnalyzedPhrase,
    {
      wordList: string[];
    },
  ]
>;

const parsePhrase = (analyzedPhrase: AnalyzedPhrase): ParsedPhrase => {
  let preparsedPhrase: string;
  if (analyzedPhrase.caseTypeName === 'pascal') {
    preparsedPhrase = analyzedPhrase.phrase.replaceAll(/(?<!^)([A-Z])/g, '-$1');
  } else {
    preparsedPhrase = analyzedPhrase.phrase;
  }

  const wordList = shishKebab(preparsedPhrase).split(SHISH_KEBAB_SKEWER);

  return {
    ...analyzedPhrase,
    wordList,
  };
};

/**
 *
 * @param word a part of a phrase. This function expects all words to be lowercase
 */
const isSensibleWord = (word: string): boolean => {
  return (
    wordSet.has(word) ||
    customWordSet.has(word) ||
    /^[a-z]$/.test(word) ||
    /^[0-9]$/.test(word)
  );
};

type AnalyzedWord = {
  word: string;
  isSensible: boolean;
};

const analyzeWord = (word: string): AnalyzedWord => {
  return {
    word,
    isSensible: isSensibleWord(word),
  };
};

type AnalyzedParsedPhrase = SpreadN<
  [
    AnalyzedPhrase,
    {
      wordList: AnalyzedWord[];
    },
  ]
>;

const analyzeParsedPhrase = (
  parsedPhrase: ParsedPhrase,
): AnalyzedParsedPhrase => {
  const analyzedWordList = parsedPhrase.wordList.map(analyzeWord);

  return {
    ...parsedPhrase,
    wordList: analyzedWordList,
  };
};

type PhraseSensibilityState = SpreadN<
  [
    AnalyzedParsedPhrase,
    {
      isSensible: boolean;
    },
  ]
>;

/**
 * @todo this should be the canonical declaration, and we can probably just remove "isSensiblePhrase"
 */
export const getPhraseSensibilityState = (
  phrase: string,
): PhraseSensibilityState => {
  const analyzedPhrase = analyzePhrase(phrase);
  const parsedPhrase = parsePhrase(analyzedPhrase);
  const analyzedParsedPhrase = analyzeParsedPhrase(parsedPhrase);

  const isSensible = analyzedParsedPhrase.wordList.every(
    (word) => word.isSensible,
  );

  return {
    ...analyzedParsedPhrase,
    isSensible,
  };
};

/**
 * Checks that every part of a string is a sensible word regardless of casing.
 */
export const isSensiblePhrase = (phrase: string): boolean => {
  const state = getPhraseSensibilityState(phrase);
  return state.isSensible;
};
