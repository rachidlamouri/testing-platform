import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { CI_MODEL_COLLECTION_ID, CiModelStreamMetatype } from './ciModel';
import {
  SERIALIZED_CI_MODEL_COLLECTION_ID,
  SerializedCiModelStreamMetatype,
} from './serializedCiModel';

const PRINT_NEW_LINE = 'printf "\\n"';

/**
 * Turns the CI Model object into the text for the bash file
 */
export const serializeCiModel = buildProgrammedTransform({
  name: 'serializeCiModel',
})
  .fromItem2<CiModelStreamMetatype>({
    collectionId: CI_MODEL_COLLECTION_ID,
  })
  .toItem2<SerializedCiModelStreamMetatype>({
    collectionId: SERIALIZED_CI_MODEL_COLLECTION_ID,
  })
  .onTransform((ciModel) => {
    const serializedModelLineList = [
      ...ciModel.initialCommandList,
      '',
      ...ciModel.programTestGroupList.flatMap((programTestGroup) => {
        return [
          `# ${programTestGroup.description}`,
          '',
          ...programTestGroup.programTestList.flatMap((programTest) => {
            return [
              `## ${programTest.programName}`,
              `bash ${programTest.testFilePath}`,
              PRINT_NEW_LINE,
              '',
            ];
          }),
        ];
      }),
      ...ciModel.finalCommandList,
      PRINT_NEW_LINE,
      '',
    ].join('\n');

    return {
      id: ciModel.id,
      subitem: serializedModelLineList,
    };
  })
  .assemble();
