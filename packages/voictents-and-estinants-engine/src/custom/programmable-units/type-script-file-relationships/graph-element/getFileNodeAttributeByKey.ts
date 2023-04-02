import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoictent,
} from '../../type-script-file/typeScriptFile';
import {
  FILE_NODE_ATTRIBUTE_BY_KEY_GEPP,
  FileNodeAttributeByKeyVoictent,
} from './fileNodeAttributeByKey';

export const getFileNodeAttributeByKey = buildEstinant()
  .fromGrition<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .toGrition<FileNodeAttributeByKeyVoictent>({
    gepp: FILE_NODE_ATTRIBUTE_BY_KEY_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((file) => {
    return {
      id: file.instanceId,
      label: file.onDiskFileName.pascalCase,
    };
  })
  .assemble();
