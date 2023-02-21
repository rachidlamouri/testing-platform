import { Grition } from '../../../custom-adapter/grition';
import { Plifal } from '../../../custom-adapter/plifal';
import { buildMentursectionHamletive } from '../../../type-script-adapter/hamletive/mentursection';
import {
  YamlFileB,
  YamlFileBOdeshin,
  YamlFileBPlifal,
  YAML_FILE_B_GEPP,
} from '../file/yamlFileB';
import { CiYamlFileContents, CommentedSteps } from './ciYamlFileContents';

export const ACTUAL_CI_YAML_FILE_IDENTIFIER = 'actual-ci-yaml-file' as const;

export type ActualCiYamlFileIdentifier = typeof ACTUAL_CI_YAML_FILE_IDENTIFIER;

export type ActualCiYamlFileContents = CiYamlFileContents<{
  beforePackageRunSteps: CommentedSteps;
  afterPackageRunSteps: CommentedSteps;
}>;

export type ActualCiYamlFile = YamlFileB<ActualCiYamlFileContents>;

export type ActualCiYamlFileGrition = Grition<ActualCiYamlFile>;

export type ActualCiYamlFileOdeshin = YamlFileBOdeshin;

export const ACTUAL_CI_YAML_FILE_GEPPP = Symbol(ACTUAL_CI_YAML_FILE_IDENTIFIER);

export type ActualCiYamlFileGepp = typeof ACTUAL_CI_YAML_FILE_GEPPP;

export type ActualCiYamlFilePlifal = Plifal<
  [ActualCiYamlFileGepp],
  ActualCiYamlFileOdeshin
>;

export const actualCiYamlFileMentursection = buildMentursectionHamletive<
  YamlFileBPlifal,
  [ActualCiYamlFilePlifal]
>({
  inputGepp: YAML_FILE_B_GEPP,
  kerzTuple: [
    {
      outputGeppTuple: [ACTUAL_CI_YAML_FILE_GEPPP],
      parak: (input): input is ActualCiYamlFileOdeshin =>
        input.grition.filePath ===
        '.github/workflows/continuous-integration.yaml',
    },
  ],
});
