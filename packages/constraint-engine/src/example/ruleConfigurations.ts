import { buildRuleConfiguration } from '../configurationHelpers/buildRuleConfiguration';
import { listIsNotEmpty } from '../customRules/listIsNotEmpty';
import { packageCExtendsBaseTypeScriptConfiguration } from '../customRules/packageCExtendsBaseTypeScriptConfiguration';
import { packageAHasPackageFile } from '../customRules/packageAHasPackagefile';
import { packageBHasTestingPlatformConfiguration } from '../customRules/packageBHasTestingPlatformConfiguration';
import { packageAHasTypeScriptConfigFile } from '../customRules/packageAHasTypeScriptConfigFile';
import { TestingPlatformTargetTypeId } from '../customTargets/testingPlatform/targets';
import { UnknownRuleConfiguration } from '../types/ruleConfiguration';
import { targetReferenceConfigurations } from './targetReferenceConfigurations';
import { packageAHasRunTestsScript } from '../customRules/packageAHasRunTestsScript';

type CustomTargetReferenceConfigurations = typeof targetReferenceConfigurations;

export const ruleConfigurations = [
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.PackageDirectorySet,
    targetPath: 'testingPlatformPackageDirectorySet',
    rule: listIsNotEmpty,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.PackageA,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasPackageFile,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.PackageA,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasTypeScriptConfigFile,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.PackageA,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasRunTestsScript,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.PackageB,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageBHasTestingPlatformConfiguration,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TestingPlatformTargetTypeId.PackageC,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageCExtendsBaseTypeScriptConfiguration,
  }),
] as const satisfies readonly UnknownRuleConfiguration[];
