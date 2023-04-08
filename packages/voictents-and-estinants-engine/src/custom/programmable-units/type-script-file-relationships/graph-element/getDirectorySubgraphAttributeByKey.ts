import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DIRECTORY_GEPP, DirectoryVoictent } from '../../file/directory';
import { COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';
import {
  DIRECTORY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
  DirectorySubgraphAttributeByKey,
  DirectorySubgraphAttributeByKeyVoictent,
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
      id: directory.instanceId,
      label: directory.directoryName,
      fontsize: 20,
      ...COMMON_ATTRIBUTE_BY_KEY,
    } satisfies DirectorySubgraphAttributeByKey;
  })
  .assemble();
