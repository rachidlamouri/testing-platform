import { buildRuleConfiguration } from '../configurationHelpers/buildRuleConfiguration';
import { listIsNotEmpty } from '../customRules/listIsNotEmpty';
import { packageCExtendsBaseTypeScriptConfiguration } from '../customRules/packageCExtendsBaseTypeScriptConfiguration';
import { packageAHasPackageFile } from '../customRules/packageAHasPackageFile';
import { packageBHasTestingPlatformConfiguration } from '../customRules/packageBHasTestingPlatformConfiguration';
import { packageAHasTypeScriptConfigFile } from '../customRules/packageAHasTypeScriptConfigFile';
import { UnknownRuleConfigurationTuple } from '../types/ruleConfiguration';
import { targetReferenceConfigurationTuple } from './targetReferenceConfigurationTuple';
import { packageAHasRunTestsScript } from '../customRules/packageAHasRunTestsScript';
import { TargetTypeId } from '../customTargets/testingPlatform/targetTypeId';
import { packageAHasKnownTestFileTypes } from '../customRules/packageAHasKnownTestFileTypes';
import { packageBRunsAllTestFiles } from '../customRules/packageBRunsAllTestFiles';

type CustomTargetReferenceConfigurationTuple =
  typeof targetReferenceConfigurationTuple;

export const ruleConfigurationTuple = [
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    targetTypeId: TargetTypeId.PackageDirectorySet,
    targetPath: 'testingPlatformPackageDirectorySet',
    rule: listIsNotEmpty,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    targetTypeId: TargetTypeId.PackageA,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasPackageFile,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    targetTypeId: TargetTypeId.PackageA,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasTypeScriptConfigFile,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    targetTypeId: TargetTypeId.PackageA,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasRunTestsScript,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    targetTypeId: TargetTypeId.PackageA,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasKnownTestFileTypes,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    targetTypeId: TargetTypeId.PackageB,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageBHasTestingPlatformConfiguration,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    targetTypeId: TargetTypeId.PackageB,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageBRunsAllTestFiles,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    targetTypeId: TargetTypeId.PackageC,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageCExtendsBaseTypeScriptConfiguration,
  }),
] as const satisfies UnknownRuleConfigurationTuple;
