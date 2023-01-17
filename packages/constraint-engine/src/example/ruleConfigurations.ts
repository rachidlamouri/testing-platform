import { buildRuleConfiguration } from '../configurationHelpers/buildRuleConfiguration';
import { listIsNotEmpty } from '../customRules/listIsNotEmpty';
import { packageCExtendsBaseTypeScriptConfiguration } from '../customRules/packageCExtendsBaseTypeScriptConfiguration';
import { packageAHasPackageFile } from '../customRules/packageAHasPackagefile';
import { packageBHasTestingPlatformConfiguration } from '../customRules/packageBHasTestingPlatformConfiguration';
import { packageAHasTypeScriptConfigFile } from '../customRules/packageAHasTypeScriptConfigFile';
import {
  RuleConfigurationTupleFromTargetReferenceConfigurationTuple,
  UnknownRuleConfigurationTuple,
} from '../types/ruleConfiguration';
import { targetReferenceConfigurationTuple } from './targetReferenceConfigurations';
import { packageAHasRunTestsScript } from '../customRules/packageAHasRunTestsScript';
import { TargetTypeId } from '../customTargets/testingPlatform/targetTypeIds';
import { packageAHasKnownTestFileTypes } from '../customRules/packageAHasKnownTestFileTypes';
import { packageBRunsAllTestFiles } from '../customRules/packageBRunsAllTestFiles';

type CustomTargetReferenceConfigurationTuple =
  typeof targetReferenceConfigurationTuple;

type A =
  RuleConfigurationTupleFromTargetReferenceConfigurationTuple<CustomTargetReferenceConfigurationTuple>;

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
