import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorElementLocatorTypeName,
  ProgramErrorEgg,
  ReportingProgrammedTransformLocator,
} from '../../../programmable-units/error/programError';
import {
  PARTITIONED_BOUNDARY_LIST_TRIE_GEPP,
  PartitionedBoundaryListTrieVoque,
} from './partitionedBoundaryListTrie';

const ESTINANT_NAME = 'assertNoBoundaryOverlap' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingProgrammedTransformLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Checks if any boundaries have the same path, or if a boundary is nested under
 * another boundary
 */
export const assertNoBoundaryOverlap = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<PartitionedBoundaryListTrieVoque>({
    collectionId: PARTITIONED_BOUNDARY_LIST_TRIE_GEPP,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((partitionedBoundaryListTrie) => {
    const trieList = partitionedBoundaryListTrie.flatten();

    const errorList: ProgramErrorEgg<ReportingLocator>[] = [];
    trieList.forEach((subtrie) => {
      const hasBoundary = subtrie.value.length > 0;
      const hasMultipleBoundaries = subtrie.value.length > 1;

      if (hasMultipleBoundaries) {
        errorList.push({
          name: 'duplicate-boundary',
          error: new Error(
            `Encountered more than one boundary with the same directory path`,
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: '',
          },
          context: {
            duplicateDirectoryPath:
              subtrie.value[0].boundary.directory.directoryPath.serialized,
            duplicateBoundaryNameList: subtrie.value.map(
              (partitionedBoundary) => partitionedBoundary.boundary.displayName,
            ),
            duplicateBoundaryList: subtrie.value,
          },
        });
      }

      if (hasBoundary && subtrie.hasSubtries) {
        errorList.push({
          name: 'prefixing-boundary',
          error: new Error(
            `Boundary "${subtrie.value[0].boundary.displayName}" contains one or more other boundaries`,
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: '',
          },
          context: {
            subtrie,
          },
        });
      }
    });

    return errorList;
  })
  .assemble();
