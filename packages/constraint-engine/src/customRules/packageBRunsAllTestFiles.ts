import { runCommandsByFileType } from '../customTargets/testingPlatform/categorizedTestFileMetadata';
import { PackageBTarget } from '../customTargets/testingPlatform/packageB/packageBTarget';
import { PackageCTarget } from '../customTargets/testingPlatform/packageC/packageCTarget';
import { Rule } from '../types/rule';

export const packageBRunsAllTestFiles: Rule<PackageBTarget> = (
  target,
): target is PackageCTarget => {
  const expectedFileContents = target.testFileMetadataSet
    .flatMap((metadata) => {
      const runCommand = runCommandsByFileType[metadata.fileType];
      return [`${runCommand} ${metadata.filePath}`, 'printf "\\n"', ''];
    })
    .join('\n');

  const hasAllTestFiles =
    target.runTestsScript.stringContents === expectedFileContents;

  return hasAllTestFiles;
};
