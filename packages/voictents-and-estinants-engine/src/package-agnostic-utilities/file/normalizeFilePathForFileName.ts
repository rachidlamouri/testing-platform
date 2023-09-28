export const normalizeFilePathForFileName = (filePath: string): string => {
  const fileName = filePath
    .replaceAll('/', '||')
    // .replaceAll('.', '\u2022')
    .replaceAll(':', '\u2022');
  return fileName;
};
