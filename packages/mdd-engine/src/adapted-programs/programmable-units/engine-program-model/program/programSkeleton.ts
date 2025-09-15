import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { DirectedGraphLocator } from '../../graph-visualization/directed-graph/locator/directedGraphLocator';
import { FileSourceInstance } from '../../linting/source/fileSource';
import { CollectionDefinitionLocator } from '../collection-definition/collectionDefinitionLocator';
import { CollectionInstanceSkeleton } from '../collection-instance/collectionInstanceSkeleton';
import { ProgrammedTransformLocator } from '../programmed-transform/programmedTransformLocator';
import { ProgramId } from './programId';
import { ProgramLocator } from './programLocator';

type ProgramSkeletonInput = {
  programLocator: ProgramLocator;
  description: string;
  collectionDefinitionLocatorList: CollectionDefinitionLocator[];
  collectionInstanceSkeletonList: CollectionInstanceSkeleton[];
  programmedTransformLocatorList: ProgrammedTransformLocator[];
};

/**
 * The information needed to gather everything needed to assemble a ProgramModel
 */
export class ProgramSkeleton implements ProgramSkeletonInput {
  get id(): ProgramId {
    return this.programLocator.id;
  }

  programLocator: ProgramLocator;

  description: string;

  collectionDefinitionLocatorList: CollectionDefinitionLocator[];

  collectionInstanceSkeletonList: CollectionInstanceSkeleton[];

  programmedTransformLocatorList: ProgrammedTransformLocator[];

  graphLocator: DirectedGraphLocator;

  constructor(input: ProgramSkeletonInput) {
    this.programLocator = input.programLocator;
    this.description = input.description;
    this.collectionDefinitionLocatorList =
      input.collectionDefinitionLocatorList;
    this.collectionInstanceSkeletonList = input.collectionInstanceSkeletonList;
    this.programmedTransformLocatorList = input.programmedTransformLocatorList;

    this.graphLocator = new DirectedGraphLocator({
      source: new FileSourceInstance({
        absoluteFilePath: __filename,
      }),
      distinguisher: input.programLocator.programName,
    });
  }
}

export const PROGRAM_SKELETON_COLLECTION_ID = 'program-skeleton';

type ProgramSkeletonCollectionId = typeof PROGRAM_SKELETON_COLLECTION_ID;

export type ProgramSkeletonStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgramSkeletonCollectionId,
    ProgramSkeleton
  >;
