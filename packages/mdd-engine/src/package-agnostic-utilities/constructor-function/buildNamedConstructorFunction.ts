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

/**
 * A utility that uses the builder pattern to make a constructor function with a
 * particular name and function signature. The builder chain takes a transform that is called in the constructor.
 */
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
