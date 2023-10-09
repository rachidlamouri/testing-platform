import Case from 'case';
import {
  SHISH_KEBAB_SKEWER,
  shishKebab,
} from '../../package-agnostic-utilities/case/shishKebab';
import { wordSet } from './wordSet';
import { customWordSet } from './customWordSet';
import { SpreadN } from '../../package-agnostic-utilities/type/spreadN';
import { removeAffix } from './removeAffix';
import { parsePedroPascal } from '../../package-agnostic-utilities/case/pedroPascal';
import { assertNotUndefined } from '../../package-agnostic-utilities/nil/assertNotUndefined';

type AnalyzedPhrase = {
  phrase: string;
  caseTypeName: string;
};

const analyzePhrase = (phrase: string): AnalyzedPhrase => {
  let caseTypeName: string;

  if (phrase.startsWith('_')) {
    caseTypeName = Case.of(phrase.slice(1));
  } else {
    caseTypeName = Case.of(phrase);
  }

  assertNotUndefined(caseTypeName, `Unknown case type for: ${phrase}`);

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
  let wordList;
  if (
    analyzedPhrase.caseTypeName === 'pascal' ||
    analyzedPhrase.caseTypeName === 'capital'
  ) {
    wordList = parsePedroPascal(analyzedPhrase.phrase);
  } else {
    wordList = shishKebab(analyzedPhrase.phrase).split(SHISH_KEBAB_SKEWER);
  }
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
  subword: string;
  isSensible: boolean;
};

const analyzeWord = (word: string): AnalyzedWord => {
  const subword = removeAffix(word);

  const isSensible = isSensibleWord(word) || isSensibleWord(subword);

  return {
    word,
    subword,
    isSensible,
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

export type PhraseSensibilityState = SpreadN<
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
