import { buildProgrammedTransform } from '../../../../adapter/estinant-builder/buildEstinant';
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
  PARTITION_FACT_GEPP,
  PartitionFactVoque,
} from '../partition-fact/partitionFact';
import { FACT_GEPP, FactVoque } from './fact';

/**
 * Combines all knowledge graph facts into a single collection
 */
export const aggregateFacts = buildProgrammedTransform({
  name: 'aggregateFacts',
})
  .fromVoictent2<PartitionFactVoque>({
    collectionId: PARTITION_FACT_GEPP,
  })
  .andFromVoictent2<DirectoryFact2Voque>({
    gepp: DIRECTORY_FACT_2_GEPP,
  })
  .andFromVoictent2<FileFact2Voque>({
    gepp: FILE_FACT_2_GEPP,
  })
  .andFromVoictent2<FileDependencyPathNodeFactVoque>({
    gepp: FILE_DEPENDENCY_PATH_NODE_FACT_GEPP,
  })
  .andFromVoictent2<FileDependencyPathSegmentFactVoque>({
    gepp: FILE_DEPENDENCY_PATH_SEGMENT_FACT_GEPP,
  })
  .toHubblepupTuple2<FactVoque>({
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
