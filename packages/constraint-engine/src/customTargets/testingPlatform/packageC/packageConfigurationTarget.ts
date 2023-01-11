export enum PackageConfigurationTypeId {
  TestFramework = 'TestFramework',
  NonTestFramework = 'NonTestFramework',
}

export type PackageConfigurationTarget = {
  typeId: PackageConfigurationTypeId;
};
