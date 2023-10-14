import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  FILE_DEPENDENCY_PATH_NODE_FACT_GEPP,
  FileDependencyPathNodeFactVoque,
} from '../dependency/dependency-path/fileDependencyPathNodeFact';
import {
  FILE_DEPENDENCY_PATH_SEGMENT_FACT_GEPP,
  FileDependencyPathSegmentFactVoque,
} from '../dependency/dependency-path/fileDependencyPathSegmentFact';
import {
  DIRECTORY_FACT_2_GEPP,
  DirectoryFact2Voque,
} from '../directory/directoryFact2';
import { FILE_FACT_2_GEPP, FileFact2Voque } from '../file/fileFact2';
import {
  PARTITION_FACT_COLLECTION_ID,
  PartitionFactStreamMetatype,
} from '../partition-fact/partitionFact';
import { FACT_GEPP, FactVoque } from './fact';

/**
 * Combines all knowledge graph facts into a single collection
 */
export const aggregateFacts = buildProgrammedTransform({
  name: 'aggregateFacts',
})
  .fromCollection2<PartitionFactStreamMetatype>({
    collectionId: PARTITION_FACT_COLLECTION_ID,
  })
  .andFromCollection2<DirectoryFact2Voque>({
    collectionId: DIRECTORY_FACT_2_GEPP,
  })
  .andFromCollection2<FileFact2Voque>({
    collectionId: FILE_FACT_2_GEPP,
  })
  .andFromCollection2<FileDependencyPathNodeFactVoque>({
    collectionId: FILE_DEPENDENCY_PATH_NODE_FACT_GEPP,
  })
  .andFromCollection2<FileDependencyPathSegmentFactVoque>({
    collectionId: FILE_DEPENDENCY_PATH_SEGMENT_FACT_GEPP,
  })
  .toItemTuple2<FactVoque>({
    collectionId: FACT_GEPP,
  })
  .onTransform(
    (
      partitionFactVoictent,
      directoryFact2Voictent,
      fileFact2Voictent,
      fileDependencyPathNodeFactVoictent,
      fileDependencyPathSegmentFactVoictent,
    ) => {
      return [
        ...partitionFactVoictent.list,
        ...directoryFact2Voictent,
        ...fileFact2Voictent,
        ...fileDependencyPathNodeFactVoictent,
        ...fileDependencyPathSegmentFactVoictent,
      ];
    },
  )
  .assemble();
