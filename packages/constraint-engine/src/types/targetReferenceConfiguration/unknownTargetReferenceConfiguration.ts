import { UnknownDerivedTargetReferenceConfiguration } from './deprecatedDerivedTargetReferenceConfiguration';
import { UnknownDerivedTargetReferenceSetConfiguration } from './deprecatedDerivedTargetReferenceSetConfiguration';
import { UnknownStaticTargetReferenceConfiguration } from './staticTargetReferenceConfiguration';

export type UnknownTargetReferenceConfiguration =
  | UnknownStaticTargetReferenceConfiguration
  | UnknownDerivedTargetReferenceConfiguration
  | UnknownDerivedTargetReferenceSetConfiguration;
