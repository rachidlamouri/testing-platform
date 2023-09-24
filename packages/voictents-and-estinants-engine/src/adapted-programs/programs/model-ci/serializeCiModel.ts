import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { CI_MODEL_GEPP, CiModelVoque } from './ciModel';
import {
  SERIALIZED_CI_MODEL_GEPP,
  SerializedCiModelVoque,
} from './serializedCiModel';

const PRINT_NEW_LINE = 'printf "\\n"';

const ASSERT_CACHED_DEBUG_IS_UNCHANGED = 'bash checkUncommittedDebug.sh';

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
            let commandList: string[];
            if ('commandList' in programTest) {
              commandList = programTest.commandList;
            } else {
              commandList = [`npx ts-node ${programTest.programFilePath}`];
            }

            return [
              `## ${programTest.programName}`,
              `echo "# ${programTest.programName}"`,
              `echo "${programTest.prefaceDescription}"`,
              ...commandList,
              ASSERT_CACHED_DEBUG_IS_UNCHANGED,
              PRINT_NEW_LINE,
              '',
            ].map((line) => {
              if (programTest.skip && line !== '') {
                return `# ${line}`;
              }

              return line;
            });
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
