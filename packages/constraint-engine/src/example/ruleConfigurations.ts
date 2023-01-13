import { buildRuleConfiguration } from '../configurationHelpers/buildRuleConfiguration';
import { listIsNotEmpty } from '../customRules/listIsNotEmpty';
import { packageCExtendsBaseTypeScriptConfiguration } from '../customRules/packageCExtendsBaseTypeScriptConfiguration';
import { packageAHasPackageFile } from '../customRules/packageAHasPackagefile';
import { packageBHasTestingPlatformConfiguration } from '../customRules/packageBHasTestingPlatformConfiguration';
import { packageAHasTypeScriptConfigFile } from '../customRules/packageAHasTypeScriptConfigFile';
import { UnknownRuleConfiguration } from '../types/ruleConfiguration';
import { targetReferenceConfigurations } from './targetReferenceConfigurations';
import { packageAHasRunTestsScript } from '../customRules/packageAHasRunTestsScript';
import { TargetTypeId } from '../customTargets/testingPlatform/targetTypeIds';
import { packageAHasKnownTestFileTypes } from '../customRules/packageAHasKnownTestFileTypes';
import { packageBRunsAllTestFiles } from '../customRules/packageBRunsAllTestFiles';

type CustomTargetReferenceConfigurations = typeof targetReferenceConfigurations;

export const ruleConfigurations = [
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TargetTypeId.PackageDirectorySet,
    targetPath: 'testingPlatformPackageDirectorySet',
    rule: listIsNotEmpty,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TargetTypeId.PackageA,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasPackageFile,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TargetTypeId.PackageA,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasTypeScriptConfigFile,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TargetTypeId.PackageA,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasRunTestsScript,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TargetTypeId.PackageA,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageAHasKnownTestFileTypes,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TargetTypeId.PackageB,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageBHasTestingPlatformConfiguration,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TargetTypeId.PackageB,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageBRunsAllTestFiles,
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurations>({
    targetTypeId: TargetTypeId.PackageC,
    targetPath: 'testingPlatformPackageDirectorySet/:directoryName',
    rule: packageCExtendsBaseTypeScriptConfiguration,
  }),
] as const satisfies readonly UnknownRuleConfiguration[];
