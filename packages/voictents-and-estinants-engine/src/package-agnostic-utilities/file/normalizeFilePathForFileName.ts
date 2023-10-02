/**
 * Allows stripping invalid characters out of a potential file path. Sometimes
 * we use object ids as file paths, and they have colons or forward slashes.
 */
export const normalizeFilePathForFileName = (filePath: string): string => {
  const fileName = filePath
    .replaceAll('/', '||')
    // .replaceAll('.', '\u2022')
    .replaceAll(':', '\u2022');
  return fileName;
};
