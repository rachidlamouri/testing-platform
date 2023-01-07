import { buildRuleConfiguration } from '../configurationHelpers/buildRuleConfiguration';
import { listIsNotEmpty } from '../customRules/listIsNotEmpty';
import { packageBExtendsBaseTypeScriptConfiguration } from '../customRules/packageBExtendsBaseTypeScriptConfiguration';
import { packageAHasPackageFile } from '../customRules/packageAHasPackagefile';
import { packageBHasTestingPlatformConfiguration } from '../customRules/packageBHasTestingPlatformConfiguration';
import { packageAHasTypeScriptConfigFile } from '../customRules/packageAHasTypeScriptConfigFile';
import { TestingPlatformTargetTypeId } from '../customTargets/testingPlatformPackage/targets';
import { UnknownRuleConfiguration } from '../types/ruleConfiguration';
import { targetReferenceConfigurations } from './targetReferenceConfigurations';

type CustomTargetReferenceConfigurations = typeof targetReferenceConfigurations;

export const ruleConfigurations = [
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.PackageDirectorySet,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet',
    rule: listIsNotEmpty,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.PackageA,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasPackageFile,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.PackageA,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasTypeScriptConfigFile,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.PackageB,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageBHasTestingPlatformConfiguration,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.PackageB,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageBExtendsBaseTypeScriptConfiguration,
  }),
] as const satisfies readonly UnknownRuleConfiguration[];
