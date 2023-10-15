import fs from 'fs';

const filePath =
  'packages/mdd-engine/src/adapted-programs/programs/rename-nonsense/progressLog.txt';

const contents = fs.readFileSync(filePath, 'utf-8');
const [firstLine = ''] = contents.split('\n');

const match = firstLine.match(/^Renamed objects under (.*)$/);

let activeDirectoryPath =
  match !== null && match[1] !== undefined ? match[1] : null;

const getActiveDirectoryPath = (): string | null => {
  return activeDirectoryPath;
};

const setActiveDirectoryPath = (directoryPath: string): void => {
  activeDirectoryPath = directoryPath;
  fs.writeFileSync(filePath, `Renamed objects under ${directoryPath}\n\n`);
};

const appendToCommitMessage = (lineList: string[]): void => {
  fs.appendFileSync(filePath, lineList.join('\n'));
};

const read = (): string => {
  return fs.readFileSync(filePath, 'utf8');
};

const clear = (): void => {
  activeDirectoryPath = null;
  fs.writeFileSync(filePath, '');
};

/**
 * Encapsulates tracking automated refactor progress since the rename-nonsense
 * program has to run multiple times per file.
 */
export const progressLog = {
  getActiveDirectoryPath,
  setActiveDirectoryPath,
  appendToCommitMessage,
  read,
  clear,
};
