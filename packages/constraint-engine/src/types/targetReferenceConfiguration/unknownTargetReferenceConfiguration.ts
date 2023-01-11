import { UnknownDerivedTargetReferenceConfiguration } from './derivedTargetReferenceConfiguration';
import { UnknownDerivedTargetReferenceSetConfiguration } from './derivedTargetReferenceSetConfiguration';
import { UnknownStaticTargetReferenceConfiguration } from './staticTargetReferenceConfiguration';

export type UnknownTargetReferenceConfiguration =
  | UnknownStaticTargetReferenceConfiguration
  | UnknownDerivedTargetReferenceConfiguration
  | UnknownDerivedTargetReferenceSetConfiguration;
