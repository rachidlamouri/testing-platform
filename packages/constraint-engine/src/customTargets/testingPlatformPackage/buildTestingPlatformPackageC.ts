import { KnownDerivedReferenceBuilder } from '../../types/builders/derivedReferenceBuilder';
import { UnknownDerivedTargetPath } from '../../types/targetPath';
import { TargetReference } from '../../types/targetReference';
import {
  TestingPlatformPackageBTypedTarget,
  TestingPlatformTargetTypeId,
  TestingPlatformPackageCTypedTarget,
  TestingPlatformPackageCTarget,
} from './targets';

export type TestingPlatformPackageCTargetReference<
  TDerivedTargetPath extends UnknownDerivedTargetPath,
> = TargetReference<TestingPlatformPackageCTypedTarget, TDerivedTargetPath>;

export const buildTestingPlatformPackageCReference = (<
  TDerivedTargetPath extends UnknownDerivedTargetPath,
>(
  packageBReference: TargetReference<
    TestingPlatformPackageBTypedTarget,
    TDerivedTargetPath
  >,
): TestingPlatformPackageCTargetReference<TDerivedTargetPath> => {
  return {
    typeId: TestingPlatformTargetTypeId.PackageC,
    instance: packageBReference.instance as TestingPlatformPackageCTarget,
    path: packageBReference.path,
  };
}) satisfies KnownDerivedReferenceBuilder<
  TestingPlatformPackageBTypedTarget,
  UnknownDerivedTargetPath,
  [TestingPlatformPackageCTypedTarget],
  UnknownDerivedTargetPath
>;
