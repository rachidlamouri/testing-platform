import { UnknownDerivedTargetReferenceConfiguration } from './derivedTargetReferenceConfiguration';
import { UnknownDerivedTargetReferenceSetConfiguration } from './derivedTargetReferenceSetConfiguration';
import { UnknownRootTargetReferenceConfiguration } from './rootTargetReferenceConfiguration';
import { UnknownStaticTargetReferenceConfiguration } from './staticTargetReferenceConfiguration';

export type UnknownTargetReferenceConfiguration =
  | UnknownStaticTargetReferenceConfiguration
  | UnknownRootTargetReferenceConfiguration
  | UnknownDerivedTargetReferenceConfiguration
  | UnknownDerivedTargetReferenceSetConfiguration;
