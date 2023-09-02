import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  ProgramErrorPelue,
  ReportingEstinantLocator,
} from '../../../programmable-units/error/programError';
import { BOUNDARY_TRIE_A_GEPP, BoundaryTrieAVoque } from './boundaryTrieA';

const ESTINANT_NAME = 'assertNoBoundaryOverlap' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Checks if any boundaries have the same path, or if a boundary is nested under
 * another boundary
 */
export const assertNoBoundaryOverlap = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<BoundaryTrieAVoque>({
    gepp: BOUNDARY_TRIE_A_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((trieA) => {
    const trieList = trieA.flatten();

    const errorList: ProgramErrorPelue<ReportingLocator>[] = [];
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
            duplicateDirectoryPath: subtrie.value[0].directoryPath,
            duplicateBoundaryNameList: subtrie.value.map(
              (boundary) => boundary.displayName,
            ),
            duplicateBoundaryList: subtrie.value,
          },
        });
      }

      if (hasBoundary && subtrie.hasSubtries) {
        errorList.push({
          name: 'prefixing-boundary',
          error: new Error(
            `Boundary "${subtrie.value[0].displayName}" contains one or more other boundaries`,
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
