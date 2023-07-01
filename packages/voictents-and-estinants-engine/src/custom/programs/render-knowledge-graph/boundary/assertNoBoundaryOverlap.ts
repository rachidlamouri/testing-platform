import posix from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  ReceivedProgramError,
  ReportingEstinantLocator,
} from '../../../programmable-units/error/programError';
import { BOUNDARY_GEPP, Boundary, BoundaryVoque } from './boundary';

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
  .fromVoictent2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((boundaryList) => {
    const boundarWithPathListList = boundaryList.map((boundary) => {
      return {
        boundary,
        pathList: boundary.directoryPath.split(posix.sep),
      };
    });

    type Trie = {
      value: Boundary | null;
      map: {
        [key: string]: Trie;
      };
    };

    const trie: Trie = { value: null, map: {} };
    const errorList: ReceivedProgramError<ReportingLocator>[] = [];

    boundarWithPathListList.forEach(({ boundary, pathList }) => {
      const pathListCopy = pathList.slice();

      let previousTrie: Trie = trie;
      let nextTrie: Trie = previousTrie;
      let prefixingBoundary: Boundary | null = previousTrie.value;
      while (pathListCopy.length > 0 && prefixingBoundary === null) {
        const path = pathListCopy.shift() as string;

        nextTrie = previousTrie.map[path] ?? {
          value: null,
          map: {},
        };
        previousTrie.map[path] = nextTrie;

        prefixingBoundary = nextTrie.value;
        previousTrie = nextTrie;
      }

      if (prefixingBoundary !== null) {
        errorList.push({
          name: 'prefixed-boundary',
          error: new Error(
            `Boundary "${boundary.displayName}" is contained by "${prefixingBoundary.displayName}"`,
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: boundary.directoryPath,
          },
          context: {
            prefixedBoundary: boundary,
            prefixingBoundary,
          },
        });
        return;
      }

      if (nextTrie.value !== null) {
        const duplicateBoundary = nextTrie.value;
        errorList.push({
          name: 'duplicate-boundary',
          error: new Error(
            `Boundary "${boundary.displayName}" has the same directory path as "${duplicateBoundary.displayName}"`,
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: boundary.directoryPath,
          },
          context: {
            currentEvaluatedBoundary: boundary,
            duplicateBoundary,
          },
        });
        return;
      }

      nextTrie.value = boundary;

      const isPrefixOfBoundary = Object.keys(nextTrie.map).length > 0;
      if (isPrefixOfBoundary) {
        errorList.push({
          name: 'prefixing-boundary',
          error: new Error(
            `Boundary "${boundary.displayName}" contains one or more other boundaries`,
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: boundary.directoryPath,
          },
          context: {
            boundary,
          },
        });
      }
    });

    return errorList;
  })
  .assemble();
