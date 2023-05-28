import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  PROGRAM_ERROR_2_GEPP,
  ProgramError2ElementLocatorTypeName,
  GenericProgramError2Voque,
  ReportedProgramError2,
  ReportingEstinantLocator,
} from '../error/programError';
import {
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadata,
  FileNodeMetadataVoque,
} from './graph-element/fileNodeMetadata';
import {
  INITIAL_EDGE_METADATA_LIST_GEPP,
  InitialEdgeMetadata,
  InitialEdgeMetadataListVoque,
} from './graph-element/initialEdgeMetadataList';

const ESTINANT_NAME = 'markUnusedNodes' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramError2ElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Marks TypeScript files that have zero incoming edges among the TypeScript
 * relationship knowledge graph nodes. It is currently responsible for
 * determining which nodes should not be marked, but this logic can be improved
 * or moved elsewhere.
 */
export const markUnusedNodes = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromVoictent2<InitialEdgeMetadataListVoque>({
    gepp: INITIAL_EDGE_METADATA_LIST_GEPP,
  })
  .andFromVoictent2<FileNodeMetadataVoque>({
    gepp: FILE_NODE_METADATA_GEPP,
  })
  .toHubblepupTuple2<GenericProgramError2Voque>({
    gepp: PROGRAM_ERROR_2_GEPP,
  })
  .onPinbe((edgeMetadataListList, fileNodeMetadataList) => {
    const edgeMetadataList = edgeMetadataListList.flatMap(
      (element) => element.grition,
    );

    // TODO: this logic is super brittle and should be changed at some point
    const isHaphazardouslyProtectedFromBeingMarkedAsUnused = (
      metadata: FileNodeMetadata,
    ): boolean => {
      const isInProtectedDirectory = [
        'packages/voictents-and-estinants-engine/src/custom/programs',
        'packages/voictents-and-estinants-engine/src/utilities/type-script-ast',
      ].some((directoryPath) => {
        return metadata.filePath.startsWith(`${directoryPath}/`);
      });

      const isSpecificFile = [
        'packages/voictents-and-estinants-engine/src/example-programs/core/exampleCore.ts',
        'packages/voictents-and-estinants-engine/src/utilities/json.ts',
        'packages/voictents-and-estinants-engine/src/utilities/semantic-types/strif/strif.ts',
      ].includes(metadata.filePath);

      return isInProtectedDirectory || isSpecificFile;
    };

    const referenceCache = new Map(
      fileNodeMetadataList.map((metadata) => {
        return [
          metadata.zorn,
          {
            isReferenced:
              isHaphazardouslyProtectedFromBeingMarkedAsUnused(metadata),
            metadata,
          },
        ];
      }),
    );

    const updateCache = (id: string): void => {
      const node = referenceCache.get(id);

      if (node) {
        node.isReferenced = true;
      }
    };

    edgeMetadataList.forEach((metadata: InitialEdgeMetadata) => {
      updateCache(metadata.head.zorn);
    });

    const outputList = [...referenceCache.values()]
      .filter(({ isReferenced }) => !isReferenced)
      .map(({ metadata }) => {
        const error: ReportedProgramError2<ReportingLocator> = {
          name: 'mark-unused-nodes',
          error: new Error(`"${metadata.filePath}" appears to be unused`),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramError2ElementLocatorTypeName.SourceFileLocator,
            filePath: metadata.filePath,
          },
          context: metadata,
        };

        return error;
      });

    return outputList;
  })
  .assemble();
