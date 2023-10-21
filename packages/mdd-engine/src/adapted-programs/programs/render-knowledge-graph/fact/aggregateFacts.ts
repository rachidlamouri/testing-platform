import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  FILE_DEPENDENCY_PATH_NODE_FACT_COLLECTION_ID,
  FileDependencyPathNodeFactStreamMetatype,
} from '../dependency/dependency-path/fileDependencyPathNodeFact';
import {
  FILE_DEPENDENCY_PATH_SEGMENT_FACT_COLLECTION_ID,
  FileDependencyPathSegmentFactStreamMetatype,
} from '../dependency/dependency-path/fileDependencyPathSegmentFact';
import {
  DIRECTORY_FACT_2_COLLECTION_ID,
  DirectoryFact2StreamMetatype,
} from '../directory/directoryFact2';
import {
  FILE_FACT_2_COLLECTION_ID,
  FileFact2StreamMetatype,
} from '../file/fileFact2';
import {
  PARTITION_FACT_COLLECTION_ID,
  PartitionFactStreamMetatype,
} from '../partition-fact/partitionFact';
import { FACT_COLLECTION_ID, FactStreamMetatype } from './fact';

/**
 * Combines all knowledge graph facts into a single collection
 */
export const aggregateFacts = buildProgrammedTransform({
  name: 'aggregateFacts',
})
  .fromCollection2<PartitionFactStreamMetatype>({
    collectionId: PARTITION_FACT_COLLECTION_ID,
  })
  .andFromCollection2<DirectoryFact2StreamMetatype>({
    collectionId: DIRECTORY_FACT_2_COLLECTION_ID,
  })
  .andFromCollection2<FileFact2StreamMetatype>({
    collectionId: FILE_FACT_2_COLLECTION_ID,
  })
  .andFromCollection2<FileDependencyPathNodeFactStreamMetatype>({
    collectionId: FILE_DEPENDENCY_PATH_NODE_FACT_COLLECTION_ID,
  })
  .andFromCollection2<FileDependencyPathSegmentFactStreamMetatype>({
    collectionId: FILE_DEPENDENCY_PATH_SEGMENT_FACT_COLLECTION_ID,
  })
  .toItemTuple2<FactStreamMetatype>({
    collectionId: FACT_COLLECTION_ID,
  })
  .onTransform(
    (
      partitionFactCollection,
      directoryFact2Collection,
      fileFact2Collection,
      fileDependencyPathNodeFactCollection,
      fileDependencyPathSegmentFactCollection,
    ) => {
      return [
        ...partitionFactCollection.list,
        ...directoryFact2Collection.list,
        ...fileFact2Collection.list,
        ...fileDependencyPathNodeFactCollection.list,
        ...fileDependencyPathSegmentFactCollection.list,
      ];
    },
  )
  .assemble();
