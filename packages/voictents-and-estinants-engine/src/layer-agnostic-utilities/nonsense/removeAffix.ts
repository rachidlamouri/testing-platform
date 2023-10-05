import { assertNotUndefined } from '../../package-agnostic-utilities/nil/assertNotUndefined';

const buildPrefixRegex = (prefix: string): RegExp => {
  return new RegExp(`^${prefix}([^\\s]+$)`);
};

const buildSuffixRegex = (suffix: string): RegExp => {
  return new RegExp(`(^[^\\s]+)${suffix}$`);
};

const affixList = [
  ...[
    // keep multiline
    'meta',
    'sub',
    'un',
  ].map(buildPrefixRegex),
  ...[
    // keep multiline
    'able',
    'ed',
    'ish',
  ].map(buildSuffixRegex),
];

/**
 * Removes known prefixes and suffixes from a word
 */
export const removeAffix = (word: string): string => {
  let startingWord;
  let nextWord = word;

  do {
    startingWord = nextWord;

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    affixList.forEach((affix) => {
      const match = nextWord.match(affix);

      if (match === null) {
        return;
      }

      const subword = match[1];
      assertNotUndefined(subword);
      nextWord = subword;
    });
  } while (nextWord !== startingWord);

  return nextWord;
};
