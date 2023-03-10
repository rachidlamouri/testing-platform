import { EstinantCallExpression } from '../estinant-call-expression/estinantCallExpression';

export type BaseEstinantCallExpressionParameter<
  TIsInput extends boolean,
  TNodeType extends
    | EstinantCallExpression['typeParameters']['params'][number]
    | undefined,
> = {
  programName: string;
  estinantName: string;
  isInput: TIsInput;
  node: TNodeType;
};
