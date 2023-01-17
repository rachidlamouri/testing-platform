import { UnknownDeprecatedDerivedTargetReferenceConfiguration } from './deprecatedDerivedTargetReferenceConfiguration';
import { UnknownDeprecatedDerivedTargetReferenceSetConfiguration } from './deprecatedDerivedTargetReferenceSetConfiguration';
import { UnknownDerivedTargetReferenceConfiguration } from './derivedTargetReferenceConfiguration';
import { UnknownStaticTargetReferenceConfiguration } from './staticTargetReferenceConfiguration';

export type UnknownTargetReferenceConfiguration =
  | UnknownStaticTargetReferenceConfiguration
  | UnknownDerivedTargetReferenceConfiguration
  | UnknownDeprecatedDerivedTargetReferenceConfiguration
  | UnknownDeprecatedDerivedTargetReferenceSetConfiguration;

export type UnknownTargetReferenceConfigurationTuple =
  readonly UnknownTargetReferenceConfiguration[];
