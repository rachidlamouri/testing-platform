import fs from 'fs';

/**
 * Checks if a file path can be resolved. Returns an error if not.
 *
 * @todo use this function or a similar function to verify all hardcoded file
 * paths before trusting that they exist. Like in scaffold scripts.
 */
export const resolveModuleFilePath = (
  extensionlessPath: string,
): string | Error => {
  const extensionSuffixesToCheck = ['ts', 'tsx'];

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
