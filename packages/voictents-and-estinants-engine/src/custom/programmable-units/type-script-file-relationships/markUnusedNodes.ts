import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ErrorLocatorTypeName,
  PROGRAM_ERROR_GEPP,
  ProgramErrorOdeshin,
  ProgramErrorVoictent,
} from '../error/programError';
import {
  FileNodeMetadataVoictent,
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadata,
} from './graph-element/fileNodeMetadata';
import {
  INITIAL_EDGE_METADATA_LIST_GEPP,
  InitialEdgeMetadata,
  InitialEdgeMetadataListVoictent,
} from './graph-element/initialEdgeMetadataList';

export const markUnusedNodes = buildEstinant({
  name: 'markUnusedNodes',
})
  .fromOdeshinVoictent<InitialEdgeMetadataListVoictent>({
    gepp: INITIAL_EDGE_METADATA_LIST_GEPP,
  })
  .andFromOdeshinVoictent<FileNodeMetadataVoictent>({
    gepp: FILE_NODE_METADATA_GEPP,
  })
  .toHubblepupTuple<ProgramErrorVoictent>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((edgeMetadataListList, fileNodeMetadataList) => {
    const edgeMetadataList = edgeMetadataListList.flat();

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
          metadata.id,
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
      updateCache(metadata.head.id);
    });

    const outputList = [...referenceCache.values()]
      .filter(({ isReferenced }) => !isReferenced)
      .map<ProgramErrorOdeshin>(({ metadata }, index) => {
        return {
          zorn: `markUnusedNodes/${index}/${metadata.filePath}`,
          grition: {
            errorId: `markUnusedNodes/${metadata.filePath}`,
            // The uncertainty in the language is due to a lack of code coverage reporting
            message: `"${metadata.filePath}" appears to be unused`,
            locator: {
              typeName: ErrorLocatorTypeName.FileErrorLocator,
              filePath: metadata.filePath,
            },
            metadata,
          },
        };
      });

    return outputList;
  })
  .assemble();
