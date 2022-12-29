import { UnknownDerivedTargetReferenceConfiguration } from './derivedTargetReferenceConfiguration';
import { UnknownDerivedTargetReferenceSetConfiguration } from './derivedTargetReferenceSetConfiguration';
import { UnknownRootTargetReferenceConfiguration } from './rootTargetReferenceConfiguration';

export type UnknownTargetReferenceConfiguration =
  | UnknownRootTargetReferenceConfiguration
  | UnknownDerivedTargetReferenceConfiguration
  | UnknownDerivedTargetReferenceSetConfiguration;
