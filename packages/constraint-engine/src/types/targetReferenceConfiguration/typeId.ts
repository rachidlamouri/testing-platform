export enum TargetReferenceConfigurationTypeId {
  StaticTargetReferenceConfiguration = 'StaticTargetReferenceConfiguration',
  DeprecatedDerivedTargetReferenceConfiguration = 'DeprecatedDerivedTargetReferenceConfiguration',
  DeprecatedDerivedTargetReferenceSetConfiguration = 'DeprecatedDerivedTargetReferenceSetConfiguration',
}

// TODO: figure out what to do so we don't have to make an extraneous export
export type TypeId = symbol;
