import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';

type BaseDependencyPathNodeFact = {
  parentZorn: string;
  directoryPath: string;
};

type DependencyPathNodeFactPrototype = {
  get zorn(): string;
  get nodeId(): string;
};

export type DependencyPathNodeFact = ObjectWithPrototype<
  BaseDependencyPathNodeFact,
  DependencyPathNodeFactPrototype
>;

export const { DependencyPathNodeFactInstance } =
  buildConstructorFunctionWithName('DependencyPathNodeFactInstance')<
    BaseDependencyPathNodeFact,
    DependencyPathNodeFactPrototype,
    DependencyPathNodeFact
  >({
    zorn: (pathNodeFact) => {
      return getZorn([
        pathNodeFact.parentZorn,
        'dependency-path-node',
        pathNodeFact.directoryPath,
      ]);
    },
    nodeId: getZornableId,
  });
