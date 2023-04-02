import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DIRECTORY_GEPP, DirectoryVoictent } from '../../file/directory';
import {
  DIRECTORY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
  DirectorySubgraphAttributeByKey,
  DirectorySubgraphAttributeByKeyVoictent,
  getSubgraphId,
} from './directorySubgraphAttributeByKey';

export const getDirectorySubgraphAttributeByKey = buildEstinant()
  .fromGrition<DirectoryVoictent>({
    gepp: DIRECTORY_GEPP,
  })
  .toGrition<DirectorySubgraphAttributeByKeyVoictent>({
    gepp: DIRECTORY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((directory) => {
    return {
      id: getSubgraphId(directory),
      label:
        directory.directoryPathPartList[
          directory.directoryPathPartList.length - 1
        ],
    } satisfies DirectorySubgraphAttributeByKey;
  })
  .assemble();
