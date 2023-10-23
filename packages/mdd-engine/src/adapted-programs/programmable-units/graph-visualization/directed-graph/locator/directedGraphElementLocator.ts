import { SimpleId } from '../../../../../package-agnostic-utilities/data-structure/id';
import { Source } from '../../../linting/source/source';
import { DirectedGraphElementId } from '../id/derived/directedGraphElementId';
import { DirectedGraphLikeId } from '../id/derived/directedGraphLikeId';
import { GlobalDirectedGraphElementId } from '../id/derived/global/globalDirectedGraphElementId';
import { DirectedGraphId } from '../id/directedGraphId';

type DirectedGraphElementLocatorInput<
  TLocalId extends DirectedGraphElementId,
  TParentId extends DirectedGraphLikeId,
  TGlobalId extends GlobalDirectedGraphElementId,
> = {
  source: Source;
  localComplexId: TLocalId;
  parentComplexId: TParentId;
  graphId: DirectedGraphId;
  globalId: TGlobalId;
};

export abstract class DirectedGraphElementLocator<
  TLocalId extends DirectedGraphElementId,
  TParentId extends DirectedGraphLikeId,
  TGlobalId extends GlobalDirectedGraphElementId,
> implements DirectedGraphElementLocatorInput<TLocalId, TParentId, TGlobalId>
{
  // TODO: make a custom collection for graph elements that knows about global id so we're not tempted to use this id when we mean to use localId
  get id(): TGlobalId {
    return this.globalId;
  }

  source: Source;

  get localIdDigest(): SimpleId {
    // TODO: this should be the only place that references "forMachine". And "forMachine" should be renamed to "digest" or something
    return this.localComplexId.forMachine;
  }

  localComplexId: TLocalId;

  get localParentIdDigest(): SimpleId {
    // TODO: this should be the only place that references "forMachine". And "forMachine" should be renamed to "digest" or something
    return this.parentComplexId.forMachine;
  }

  parentComplexId: TParentId;

  graphId: DirectedGraphId;

  globalId: TGlobalId;

  constructor(
    input: DirectedGraphElementLocatorInput<TLocalId, TParentId, TGlobalId>,
  ) {
    this.source = input.source;
    this.localComplexId = input.localComplexId;
    this.localComplexId = input.localComplexId;
    this.parentComplexId = input.parentComplexId;
    this.graphId = input.graphId;
    this.globalId = input.globalId;
  }
}
