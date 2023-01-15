import { UnknownDeprecatedDerivedTargetReferenceConfiguration } from './deprecatedDerivedTargetReferenceConfiguration';
import { UnknownDeprecatedDerivedTargetReferenceSetConfiguration } from './deprecatedDerivedTargetReferenceSetConfiguration';
import { UnknownStaticTargetReferenceConfiguration } from './staticTargetReferenceConfiguration';

export type UnknownTargetReferenceConfiguration =
  | UnknownStaticTargetReferenceConfiguration
  | UnknownDeprecatedDerivedTargetReferenceConfiguration
  | UnknownDeprecatedDerivedTargetReferenceSetConfiguration;

export type UnknownTargetReferenceConfigurationTuple =
  readonly UnknownTargetReferenceConfiguration[];
