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
} from './graph-element/fileNodeMetadata';
import {
  INITIAL_EDGE_METADATA_LIST_GEPP,
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

    const referenceCache = new Map(
      fileNodeMetadataList.map((metadata) => {
        return [
          metadata.id,
          {
            isReferenced: false,
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

    edgeMetadataList.forEach((metadata) => {
      updateCache(metadata.tail.id);
      updateCache(metadata.head.id);
    });

    const outputList = [...referenceCache.values()]
      .filter(({ isReferenced }) => !isReferenced)
      .map<ProgramErrorOdeshin>(({ metadata }, index) => {
        return {
          zorn: `markUnusedNodes/${index}/${metadata.filePath}`,
          grition: {
            errorId: `markUnusedNodes/${metadata.filePath}`,
            // The uncertainty in the language is due to a lack of test coverage
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
