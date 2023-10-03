import {
  SHISH_KEBAB_SKEWER,
  shishKebab,
} from '../../package-agnostic-utilities/case/shishKebab';
import { wordSet } from './wordSet';

const isSensibleWord = (word: string): boolean => {
  return wordSet.has(word);
};

/**
 * Checks that every part of a string is a sensible word regardless of casing.
 */
export const isSensiblePhrase = (phrase: string): boolean => {
  const phraseWordList = shishKebab(phrase).split(SHISH_KEBAB_SKEWER);
  const result = phraseWordList.every(isSensibleWord);
  return result;
};
