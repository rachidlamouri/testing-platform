import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { CI_MODEL_GEPP, CiModelVoque } from './ciModel';
import {
  SERIALIZED_CI_MODEL_GEPP,
  SerializedCiModelVoque,
} from './serializedCiModel';

const NEW_LINE = 'printf "\\n"';

const ASSERT_NOTHING_CHANGED = 'bash checkUncommitted.sh';

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
      ...ciModel.programTestList.flatMap((programTest) => {
        return [
          `# ${programTest.programName}`,
          `echo "${programTest.prefaceDescription}"`,
          `npx ts-node ${programTest.programFilePath}`,
          ASSERT_NOTHING_CHANGED,
          NEW_LINE,
        ];
      }),
      ...ciModel.finalCommandList,
      NEW_LINE,
      '',
    ].join('\n');

    return {
      zorn: ciModel.zorn,
      grition: serializedModelLineList,
    };
  })
  .assemble();
