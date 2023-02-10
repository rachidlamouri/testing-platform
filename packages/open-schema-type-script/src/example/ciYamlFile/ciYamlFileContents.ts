export type CiYamlFileContentsStep = Record<string, unknown>;

export type CommentPlaceHolderKey = `COMMENT_PLACE_HOLDER:${string}`;

export type CiYamlFileContentsCommentPlaceHolder = {
  [key: CommentPlaceHolderKey]: '';
};

export type CiYamlFileContentsRunStep = {
  name: string;
  run: string;
};

export type CommentedSteps = [
  CiYamlFileContentsCommentPlaceHolder,
  ...CiYamlFileContentsStep[],
];

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
