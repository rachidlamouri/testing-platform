import { PackageATarget } from '../customTargets/testingPlatform/packageA/packageATarget';
import { PackageBTarget } from '../customTargets/testingPlatform/packageB/packageBTarget';
import { GuardRule } from '../types/rule';

type NarrowedPackageATarget = PackageATarget & {
  testFileMetadataSet: PackageBTarget['testFileMetadataSet'];
};

export const packageAHasKnownTestFileTypes: GuardRule<
  PackageATarget,
  NarrowedPackageATarget
> = (target): target is NarrowedPackageATarget => {
  return target.testFileMetadataSet.every(
    (metadata) => metadata.fileType !== null,
  );
};
