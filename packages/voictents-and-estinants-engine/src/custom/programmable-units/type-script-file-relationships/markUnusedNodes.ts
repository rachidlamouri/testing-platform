import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorVoque,
  ReportedProgramError,
  ReportingEstinantLocator,
} from '../error/programError';
import {
  ENGINE_PROGRAM_FILE_GEPP,
  EngineProgramFileVoque,
} from './engineProgramFile';
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
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

const PROTECTED_FILE_PATH_LIST = [
  'packages/voictents-and-estinants-engine/src/utilities/semantic-types/strif/strif.ts',
  'packages/voictents-and-estinants-engine/src/utilities/type-script-ast/isParameterizedCallExpression.ts',
  'packages/voictents-and-estinants-engine/src/utilities/type-script-ast/isTypeScriptTupleType.ts',
];

PROTECTED_FILE_PATH_LIST.forEach((nodePath) => {
  if (!fs.existsSync(nodePath)) {
    throw Error(`File node "${nodePath}" does not exist`);
  }
});

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
  .andFromVoictent2<EngineProgramFileVoque>({
    gepp: ENGINE_PROGRAM_FILE_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe(
    (edgeMetadataListList, fileNodeMetadataList, engineProgramFileList) => {
      const edgeMetadataList = edgeMetadataListList.flatMap(
        (element) => element.grition,
      );

      // TODO: this logic is super brittle and should be changed at some point
      const isHaphazardouslyProtectedFromBeingMarkedAsUnused = (
        metadata: FileNodeMetadata,
      ): boolean => {
        const isSpecificFile = PROTECTED_FILE_PATH_LIST.includes(
          metadata.filePath,
        );

        return isSpecificFile;
      };

      const mutableReferenceCache = new Map(
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
        const node = mutableReferenceCache.get(id);

        if (node) {
          node.isReferenced = true;
        }
      };

      // Marks files that are imported as used
      edgeMetadataList.forEach((metadata: InitialEdgeMetadata) => {
        updateCache(metadata.head.zorn);
      });

      // Marks engine program files as used
      engineProgramFileList.forEach((programFile) => {
        updateCache(programFile.file.filePath);
      });

      const outputList = [...mutableReferenceCache.values()]
        .filter(({ isReferenced }) => !isReferenced)
        .map(({ metadata }) => {
          const error: ReportedProgramError<ReportingLocator> = {
            name: 'mark-unused-nodes',
            error: new Error(`"${metadata.filePath}" appears to be unused`),
            reporterLocator,
            sourceLocator: {
              typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
              filePath: metadata.filePath,
            },
            context: metadata,
          };

          return error;
        });

      return outputList;
    },
  )
  .assemble();
