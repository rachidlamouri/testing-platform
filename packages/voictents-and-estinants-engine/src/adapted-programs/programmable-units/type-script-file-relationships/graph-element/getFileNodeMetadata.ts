import Case from 'case';
import { buildEstinant } from '../../../../adapter/estinant-builder/estinantBuilder';
import { OdeshinZorn } from '../../../../adapter/odeshin/odeshin2';
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorVoque,
  ReportedProgramError,
  ReportingEstinantLocator,
} from '../../error/programError';
import { NodeShape } from '../../graph-visualization/directed-graph/directedGraphNode';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoque,
} from '../../type-script-file/typeScriptFile';
import {
  DIRECTORY_INSTANCE_ID_BY_FILE_PATH_GEPP,
  DirectoryInstanceIdByDirectoryPathVoque,
} from '../directoryInstanceIdByDirectoryPath';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoque,
} from './boundaryMetadata';
import { FONT_SIZE, COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';
import {
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadataVoque,
} from './fileNodeMetadata';

const ESTINANT_NAME = 'getFileNodeMetadata' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Gets information that is used to present TypeScriptFile items and to
 * associate them with items from other collections.
 */
export const getFileNodeMetadata = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<TypeScriptFileVoque>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromHubblepupTuple2<
    DirectoryInstanceIdByDirectoryPathVoque,
    [OdeshinZorn]
  >({
    gepp: DIRECTORY_INSTANCE_ID_BY_FILE_PATH_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .andFromVoictent2<BoundaryMetadataVoque>({
    gepp: BOUNDARY_METADATA_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .toHubblepupTuple2<FileNodeMetadataVoque>({
    gepp: FILE_NODE_METADATA_GEPP,
  })
  .onPinbe(
    (file, [{ grition: directoryInstanceIdByDirectoryPath }], boundaryList) => {
      const directoryId = directoryInstanceIdByDirectoryPath.get(
        file.filePath.parentDirectoryPath,
      );

      const foundBoundary = boundaryList.find(
        (boundary) =>
          boundary.isInternal &&
          file.filePath.serialized.startsWith(boundary.directoryPath),
      );

      if (directoryId === undefined || foundBoundary === undefined) {
        return {
          [PROGRAM_ERROR_GEPP]: [
            {
              name: 'missing-file-node-parent',
              error: new Error('Unable to find directory id or boundary id'),
              reporterLocator,
              sourceLocator: {
                typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
                filePath: file.filePath.serialized,
              },
              context: {
                directoryId,
                boundaryId: foundBoundary?.id,
                file,
              },
            } satisfies ReportedProgramError<ReportingLocator>,
          ],
          [FILE_NODE_METADATA_GEPP]: [],
        };
      }

      return {
        [PROGRAM_ERROR_GEPP]: [],
        [FILE_NODE_METADATA_GEPP]: [
          {
            zorn: file.filePath.serialized,
            id: file.instanceId,
            directoryId,
            boundaryId: foundBoundary.id,
            filePath: file.filePath.serialized,
            attributeByKey: {
              label: Case.pascal(file.nodePath.name.extensionless),
              shape: NodeShape.Box,
              fontsize: FONT_SIZE.node,
              color: 'gray',
              ...COMMON_ATTRIBUTE_BY_KEY,
            },
          },
        ],
      };
    },
  )
  .assemble();