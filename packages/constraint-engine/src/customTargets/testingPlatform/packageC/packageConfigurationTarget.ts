export enum PackageConfigurationTypeId {
  TestFramework = 'TestFramework',
  NonTestFramework = 'NonTestFramework',
}

export type TestingPlatformConfigurationTarget = {
  typeId: PackageConfigurationTypeId;
};
