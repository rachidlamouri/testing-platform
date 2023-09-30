import { GenericPropertyNameTuple } from './buildConstructorFunction';
import {
  NamedConstructorFunctionInstanceTypeBuilderParent,
  buildNamedConstructorFunctionInstanceTypeBuilder,
} from './namedConstructorFunctionInstanceTypeBuilder';
import { ConstructorFunctionName } from './types';

type NamedConstructorFunctionBuilderContext<
  TConstructorFunctionName extends ConstructorFunctionName,
  TConstructedInstancePropertyNameTuple extends GenericPropertyNameTuple,
> = {
  constructorName: TConstructorFunctionName;
  instancePropertyNameTuple: TConstructedInstancePropertyNameTuple;
};

export const buildNamedConstructorFunction = <
  TConstructorFunctionName extends ConstructorFunctionName,
  TConstructedInstancePropertyNameTuple extends GenericPropertyNameTuple,
>(
  context: NamedConstructorFunctionBuilderContext<
    TConstructorFunctionName,
    TConstructedInstancePropertyNameTuple
  >,
): NamedConstructorFunctionInstanceTypeBuilderParent<
  TConstructorFunctionName,
  TConstructedInstancePropertyNameTuple
> => {
  return {
    withTypes: buildNamedConstructorFunctionInstanceTypeBuilder<
      TConstructorFunctionName,
      TConstructedInstancePropertyNameTuple
    >(context),
  };
};
