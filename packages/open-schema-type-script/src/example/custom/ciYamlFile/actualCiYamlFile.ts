import { MentursectionEstinant } from '../../../core/estinant';
import { TropoignantTypeName } from '../../../core/tropoignant';
import { Grition } from '../custom-constructs/grition';
import { Odeshin } from '../custom-constructs/odeshin';
import { Plifal } from '../custom-constructs/plifal';
import { YamlFileB, YAML_FILE_B_GEPP } from '../file/yamlFileB';
import { CiYamlFileContents, CommentedSteps } from './ciYamlFileContents';

export const ACTUAL_CI_YAML_FILE_IDENTIFIER = 'actual-ci-yaml-file' as const;

export type ActualCiYamlFileIdentifier = typeof ACTUAL_CI_YAML_FILE_IDENTIFIER;

export type ActualCiYamlFileContents = CiYamlFileContents<{
  beforePackageRunSteps: CommentedSteps;
  afterPackageRunSteps: CommentedSteps;
}>;

export type ActualCiYamlFile = YamlFileB<ActualCiYamlFileContents>;

export type ActualCiYamlFileGrition = Grition<ActualCiYamlFile>;

export type ActualCiYamlFileOdeshin = Odeshin<
  ActualCiYamlFileIdentifier,
  ActualCiYamlFileGrition
>;

export const ACTUAL_CI_YAML_FILE_GEPPP = Symbol(ACTUAL_CI_YAML_FILE_IDENTIFIER);

export type ActualCiYamlFileGepp = typeof ACTUAL_CI_YAML_FILE_GEPPP;

export type ActualCiYamlFilePlifal = Plifal<
  [ActualCiYamlFileGepp],
  ActualCiYamlFileOdeshin
>;

export const actualCiYamlFileMentursection: MentursectionEstinant<ActualCiYamlFileOdeshin> =
  {
    inputGepp: YAML_FILE_B_GEPP,
    tropoignant: {
      typeName: TropoignantTypeName.Mentursection,
      process: function filterActualCiYamlFile(inputGrition) {
        if (
          inputGrition.grition.filePath ===
          '.github/workflows/continuous-integration.yaml'
        ) {
          return [ACTUAL_CI_YAML_FILE_GEPPP];
        }

        return [];
      },
    },
  };
