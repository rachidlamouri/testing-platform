import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportListVoque,
} from '../../type-script-file/typeScriptFileImportList';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import {
  INITIAL_EDGE_METADATA_LIST_GEPP,
  InitialEdgeMetadataList,
  InitialEdgeMetadataListVoque,
} from './initialEdgeMetadataList';
import {
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadataVoque,
} from './fileNodeMetadata';
import {
  EXTERNAL_MODULE_METADATA_BY_SOURCE_PATH_GEPP,
  ExternalModuleMetadataBySourcePathVoque,
} from './externalModuleMetadataBySourcePath';
import {
  FILE_NODE_METADATA_BY_FILE_PATH_GEPP,
  FileNodeMetadataByFilePathVoque,
} from './fileNodeMetadataByFilePath';
import {
  PROGRAM_ERROR_2_GEPP,
  ProgramError2ElementLocatorTypeName,
  GenericProgramError2Voque,
  ReportedProgramError2,
  ReportingEstinantLocator,
} from '../../error/programError2';

const ESTINANT_NAME = 'getEngineProgramLocator' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramError2ElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Converts TypeScript file import statements into directed graph edge metadata.
 */
export const getInitialEdgeMetadata = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<FileNodeMetadataVoque>({
    gepp: FILE_NODE_METADATA_GEPP,
  })
  .andFromHubblepupTuple2<TypeScriptFileImportListVoque, [string]>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    framate: (leftInput) => [leftInput.indexByName.zorn],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .andFromHubblepupTuple2<FileNodeMetadataByFilePathVoque, [string]>({
    gepp: FILE_NODE_METADATA_BY_FILE_PATH_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .andFromHubblepupTuple2<ExternalModuleMetadataBySourcePathVoque, [string]>({
    gepp: EXTERNAL_MODULE_METADATA_BY_SOURCE_PATH_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .toHubblepup2<InitialEdgeMetadataListVoque>({
    gepp: INITIAL_EDGE_METADATA_LIST_GEPP,
  })
  .toHubblepupTuple2<GenericProgramError2Voque>({
    gepp: PROGRAM_ERROR_2_GEPP,
  })
  .onPinbe(
    (
      fileNodeMetadata,
      [{ list: importList }],
      [{ grition: fileNodeMetadataByFilePath }],
      [{ grition: externalModuleMetadataIdBySourcePath }],
    ) => {
      const errorList: ReportedProgramError2<ReportingLocator>[] = [];
      const edgeMetadataList: InitialEdgeMetadataList['grition'] = [];

      const headList = importList.map((importedItem) => {
        const headMetadata = importedItem.isInternal
          ? fileNodeMetadataByFilePath.get(importedItem.sourcePath)
          : externalModuleMetadataIdBySourcePath.get(importedItem.sourcePath);

        return {
          headMetadata,
          importedItem,
        };
      });

      headList.forEach(({ headMetadata, importedItem }) => {
        if (headMetadata === undefined) {
          errorList.push({
            name: 'missing-edge-metadata',
            error: new Error(
              `Unable to find metadata for the imported item "${importedItem.sourcePath}"`,
            ),
            reporterLocator,
            sourceLocator: {
              typeName: ProgramError2ElementLocatorTypeName.SourceFileLocator,
              filePath: fileNodeMetadata.filePath,
            },
            context: {
              fileNodeMetadata,
              importedItem,
            },
          });
        } else {
          edgeMetadataList.push({
            head: headMetadata,
            tail: fileNodeMetadata,
          });
        }
      });

      return {
        [INITIAL_EDGE_METADATA_LIST_GEPP]: {
          zorn: fileNodeMetadata.zorn,
          grition: edgeMetadataList,
        },
        [PROGRAM_ERROR_2_GEPP]: errorList,
      };
    },
  )
  .assemble();
