import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { GraphLikeLabelLocation } from '../../graph-visualization/directed-graph/attributeByKeyGSC';
import { DirectedGraph } from '../../graph-visualization/directed-graph/element/directedGraph';
import { DirectedGraphElement } from '../../graph-visualization/directed-graph/element/directedGraphElement';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/element/directedGraphNode';
import { FileSourceInstance } from '../../linting/source/fileSource';
import { ProgramId } from './programId';
import { ProgramSkeleton } from './programSkeleton';

type ProgramModelInput = {
  skeleton: ProgramSkeleton;
};

/**
 * The information needed to present a model of a program
 */
export class ProgramModel implements ProgramModelInput {
  get id(): ProgramId {
    return this.skeleton.id;
  }

  skeleton: ProgramSkeleton;

  graphElementList: DirectedGraphElement[];

  constructor(input: ProgramModelInput) {
    const { graphLocator, programLocator } = input.skeleton;
    const { programName } = programLocator;

    this.skeleton = input.skeleton;

    this.graphElementList = [
      new DirectedGraph({
        locator: graphLocator,
        inputAttributeByKey: {
          labelloc: GraphLikeLabelLocation.Top,
          label: programName,
        },
        outputFileName: programName,
      }),
      new DirectedGraphNode({
        graphLocator,
        parentLocator: graphLocator,
        source: new FileSourceInstance({
          absoluteFilePath: __filename,
        }),
        distinguisher: programName,
        inputAttributeByKey: {
          label: 'placeholder',
        },
      }),
    ];
  }
}

export const PROGRAM_MODEL_COLLECTION_ID = 'program-model';

type ProgramModelCollectionId = typeof PROGRAM_MODEL_COLLECTION_ID;

export type ProgramModelStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgramModelCollectionId,
    ProgramModel
  >;
