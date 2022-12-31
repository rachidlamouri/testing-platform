import { listIsNotEmpty } from '../customRules/listIsNotEmpty';
import { packageHasPackageFile } from '../customRules/packageHasPackagefile';
import { packageHasTestingPlatformConfiguration } from '../customRules/packageHasTestingPlatformConfiguration';
import { packageHasTypeScriptConfigFile } from '../customRules/packageHasTypeScriptConfigFile';
import { TestingPlatformTargetTypeId } from '../customTargets/testingPlatformPackage/targets';
import { RuleConfigurationFromTargetReferenceConfigurations } from '../types/ruleConfiguration';
import { targetReferenceConfigurations } from './targetReferenceConfigurations';

type CustomRuleConfiguration =
  RuleConfigurationFromTargetReferenceConfigurations<
    typeof targetReferenceConfigurations
  >;

export const ruleConfigurations: CustomRuleConfiguration[] = [
  {
    targetTypeId: TestingPlatformTargetTypeId.PackageDirectorySet,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet',
    rule: listIsNotEmpty,
  },
  {
    targetTypeId: TestingPlatformTargetTypeId.Package,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageHasPackageFile,
  },
  {
    targetTypeId: TestingPlatformTargetTypeId.Package,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageHasTypeScriptConfigFile,
  },
  {
    targetTypeId: TestingPlatformTargetTypeId.Package,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageHasTestingPlatformConfiguration,
  },
];
