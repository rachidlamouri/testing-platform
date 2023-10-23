import { ConstructorFunction } from '../../../../../../package-agnostic-utilities/constructor-function/types';
import { Tuple } from '../../../../../../package-agnostic-utilities/type/tuple';
import { DirectedClusterId } from '../directedClusterId';
import { DirectedEdgeId } from '../directedEdgeId';
import { DirectedGraphNodeId } from '../directedGraphNodeId';
import { DirectedSubgraphId } from '../directedSubgraphId';

export const LOCAL_DIRECTED_GRAPH_CONSTITUENT_ID_CONSTRUCTOR_SET = [
  DirectedSubgraphId,
  DirectedClusterId,
  DirectedGraphNodeId,
  DirectedEdgeId,
] as const;

type DistributedLocalDirectedGraphConstituentId<
  TIdConstructor = typeof LOCAL_DIRECTED_GRAPH_CONSTITUENT_ID_CONSTRUCTOR_SET[number],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = TIdConstructor extends ConstructorFunction<Tuple<any>, any>
  ? InstanceType<TIdConstructor>
  : never;

export type LocalDirectedGraphConstituentId =
  DistributedLocalDirectedGraphConstituentId;
