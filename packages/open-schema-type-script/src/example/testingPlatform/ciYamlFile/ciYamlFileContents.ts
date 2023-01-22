export type CiYamlFileContentsStep = Record<string, unknown>;

export type CiYamlFileContentsRunStep = {
  name: string;
  run: string;
};

export type CiYamlFileContents<TSteps> = {
  name: 'Continuous Integration';
  on: ['push'];
  jobs: {
    'Continuous-Integration': {
      'runs-on': 'ubuntu-latest';
      steps: TSteps;
    };
  };
};
