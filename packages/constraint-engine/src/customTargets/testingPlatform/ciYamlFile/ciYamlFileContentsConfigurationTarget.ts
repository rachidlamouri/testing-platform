import { TypedTarget } from '../../../types/typedTarget';
import { TargetTypeId } from '../targetTypeIds';

export const CI_YAML_FILE_TARGET_PATH =
  '.github/workflows/continuous-integration.yml' as const;

export type CiYamlFileTargetPath = typeof CI_YAML_FILE_TARGET_PATH;

export type CiYamlFileContentsStep = Record<string, unknown>;

export type CiYamlFileContentsRunStep = {
  name: string;
  run: string;
};

export type CiYamlFileContentsConfigurationTarget = {
  name: 'Continuous Integration';
  on: ['push'];
  jobs: {
    'Continuous-Integration': {
      'runs-on': 'ubuntu-latest';
      steps: {
        beforePackageRunSteps: CiYamlFileContentsStep[];
        afterPackageRunSteps: CiYamlFileContentsStep[];
      };
    };
  };
};

export type CiYamlFileContentsConfigurationTypedTarget = TypedTarget<
  TargetTypeId.CiYamlFileContentsConfiguration,
  CiYamlFileContentsConfigurationTarget
>;
