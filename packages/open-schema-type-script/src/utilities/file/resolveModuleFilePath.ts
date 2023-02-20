import fs from 'fs';

export const resolveModuleFilePath = (extensionlessPath: string): string => {
  const extensionSuffixesToCheck = ['ts'];

  const filePath = extensionSuffixesToCheck
    .map((extensionSuffix) => `${extensionlessPath}.${extensionSuffix}`)
    .find((potentialFilePath) => {
      return fs.existsSync(potentialFilePath);
    });

  if (filePath === undefined) {
    // eslint-disable-next-line no-console
    console.log('Module not found', {
      cwd: process.cwd(),
      extensionlessPath,
    });
    process.exit(1);
  }

  return filePath;
};
