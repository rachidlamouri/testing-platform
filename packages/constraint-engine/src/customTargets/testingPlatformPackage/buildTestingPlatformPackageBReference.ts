import { KnownDerivedReferenceBuilder } from '../../types/builders/derivedReferenceBuilder';
import { UnknownDerivedTargetPath } from '../../types/targetPath';
import { TargetReference } from '../../types/targetReference';
import {
  TestingPlatformPackageBTarget,
  TestingPlatformPackageBTypedTarget,
  TestingPlatformTargetTypeId,
  TestingPlatformPackageATypedTarget,
} from './targets';

export type TestingPlatformPackageBTargetReference<
  TDerivedTargetPath extends UnknownDerivedTargetPath,
> = TargetReference<TestingPlatformPackageBTypedTarget, TDerivedTargetPath>;

export const buildTestingPlatformPackageBReference = (<
  TDerivedTargetPath extends UnknownDerivedTargetPath,
>(
  packageAReference: TargetReference<
    TestingPlatformPackageATypedTarget,
    TDerivedTargetPath
  >,
): TestingPlatformPackageBTargetReference<TDerivedTargetPath> => {
  return {
    typeId: TestingPlatformTargetTypeId.PackageB,
    instance: packageAReference.instance as TestingPlatformPackageBTarget,
    path: packageAReference.path,
  };
}) satisfies KnownDerivedReferenceBuilder<
  TestingPlatformPackageATypedTarget,
  UnknownDerivedTargetPath,
  [TestingPlatformPackageBTypedTarget],
  UnknownDerivedTargetPath
>;
