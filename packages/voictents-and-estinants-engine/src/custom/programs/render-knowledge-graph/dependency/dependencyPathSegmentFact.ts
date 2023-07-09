import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';

type BaseDependencyPathSegmentFact = {
  parentZorn: string;
  tailId: string;
  headId: string;
};

type DependencyPathSegmentFactPrototype = {
  get zorn(): string;
};

export type DependencyPathSegmentFact = ObjectWithPrototype<
  BaseDependencyPathSegmentFact,
  DependencyPathSegmentFactPrototype
>;

export const { DependencyPathSegmentFactInstance } =
  buildConstructorFunctionWithName('DependencyPathSegmentFactInstance')<
    BaseDependencyPathSegmentFact,
    DependencyPathSegmentFactPrototype,
    DependencyPathSegmentFact
  >({
    zorn: (segmentFact) => {
      return getZorn([
        segmentFact.parentZorn,
        'dependency-path-segment',
        segmentFact.tailId,
        segmentFact.headId,
      ]);
    },
  });
