import fs from 'fs';

export const resolveModuleFilePath = (
  extensionlessPath: string,
): string | Error => {
  const extensionSuffixesToCheck = ['ts'];

  const filePath = extensionSuffixesToCheck
    .map((extensionSuffix) => `${extensionlessPath}.${extensionSuffix}`)
    .find((potentialFilePath) => {
      return fs.existsSync(potentialFilePath);
    });

  if (filePath === undefined) {
    return new Error(`Module not found: "${extensionlessPath}"`);
  }

  return filePath;
};
