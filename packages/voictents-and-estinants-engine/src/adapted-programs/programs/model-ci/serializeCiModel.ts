import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { CI_MODEL_GEPP, CiModelVoque } from './ciModel';
import {
  SERIALIZED_CI_MODEL_GEPP,
  SerializedCiModelVoque,
} from './serializedCiModel';

const PRINT_NEW_LINE = 'printf "\\n"';

/**
 * Turns the CI Model object into the text for the bash file
 */
export const serializeCiModel = buildEstinant({
  name: 'serializeCiModel',
})
  .fromHubblepup2<CiModelVoque>({
    gepp: CI_MODEL_GEPP,
  })
  .toHubblepup2<SerializedCiModelVoque>({
    gepp: SERIALIZED_CI_MODEL_GEPP,
  })
  .onPinbe((ciModel) => {
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
      zorn: ciModel.zorn,
      grition: serializedModelLineList,
    };
  })
  .assemble();
