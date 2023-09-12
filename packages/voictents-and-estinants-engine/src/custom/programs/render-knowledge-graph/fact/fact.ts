import {
  InMemoryOdeshin2IndexByName,
  BaseInMemoryOdeshin2Voictent,
} from '../../../../core/engine/inMemoryOdeshinVoictent2';

import { InMemoryVoque } from '../../../../core/engine/inMemoryVoque';
import { DirectedGraphElement2 } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { FileDependencyPathSegmentFact } from '../dependency/dependency-path/fileDependencyPathSegmentFact';
import { PartitionFact } from '../partition-fact/partitionFact';
import { FileDependencyPathNodeFact } from '../dependency/dependency-path/fileDependencyPathNodeFact';
import { DirectoryFact2 } from '../directory/directoryFact2';
import { FileFact2 } from '../file/fileFact2';

export type Fact =
  | PartitionFact
  | DirectoryFact2
  | FileFact2
  | FileDependencyPathNodeFact
  | FileDependencyPathSegmentFact;

type FactVoictentPelie = {
  graphElementList: DirectedGraphElement2[];
  byLocalGraphElementId: Map<string, Fact>;
};

export const FACT_GEPP = 'fact';

type FactGepp = typeof FACT_GEPP;

export type FactVoque = InMemoryVoque<
  FactGepp,
  Fact,
  Fact,
  InMemoryOdeshin2IndexByName,
  FactVoictentPelie
>;

export class FactVoictent extends BaseInMemoryOdeshin2Voictent<
  FactVoque,
  FactVoque
> {
  private graphElementList: DirectedGraphElement2[] = [];

  private byLocalGraphElementId = new Map<string, Fact>();

  constructor() {
    super({
      gepp: FACT_GEPP,
      initialHubblepupPelueTuple: [],
    });
  }

  addHubblepup(hubblepup: Fact): void {
    this.graphElementList.push(hubblepup.graphElement);

    // TODO: the below note indicates that some concerns need to be separated. As in this collection shouldn't be at the "fact" level or that "fact" is no longer what we wanted it to be
    // Note: there will be multiple facts for the same element (one for each partition where the element should appear). That's ok for the purposes of this collection
    this.byLocalGraphElementId.set(hubblepup.graphElement.id, hubblepup);

    super.addHubblepup(hubblepup);
  }

  protected dereferenceVoictentPelie(): FactVoictentPelie {
    return {
      graphElementList: this.graphElementList,
      byLocalGraphElementId: this.byLocalGraphElementId,
    };
  }
}
