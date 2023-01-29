import { UnknownTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { TargetReferenceMap } from '../targetReferenceMap';

export type TargetReferenceBuilderInput = {
  targetReferenceConfiguration: UnknownTargetReferenceConfiguration;
  targetReferenceMap: TargetReferenceMap;
};

// TODO: figure out what to do so we don't have to make an extraneous export
export type Types = symbol;
