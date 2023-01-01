import { buildRuleConfiguration } from '../configurationHelpers/buildRuleConfiguration';
import { listIsNotEmpty } from '../customRules/listIsNotEmpty';
import { packageExtendsBaseTypeScriptConfiguration } from '../customRules/packageExtendsBaseTypeScriptConfiguration';
import { packageHasPackageFile } from '../customRules/packageHasPackagefile';
import { packageHasTestingPlatformConfiguration } from '../customRules/packageHasTestingPlatformConfiguration';
import { packageHasTypeScriptConfigFile } from '../customRules/packageHasTypeScriptConfigFile';
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
    targetTypeId: TestingPlatformTargetTypeId.Package,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageHasPackageFile,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.Package,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageHasTypeScriptConfigFile,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.Package,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageHasTestingPlatformConfiguration,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.Package,
    normalizedTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageExtendsBaseTypeScriptConfiguration,
  }),
] as const satisfies readonly UnknownRuleConfiguration[];
