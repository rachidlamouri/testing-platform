import wordListFilePath from 'word-list';
import fs from 'fs';

const wordList = fs.readFileSync(wordListFilePath, 'utf8').split('\n');

/**
 * A set of words! Crazy, I know.
 */
export const wordSet = new Set(wordList);
