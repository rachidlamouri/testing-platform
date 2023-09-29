import {
  ConstructorFunctionBuilderContext,
  GenericConstructedInstance,
  GenericConstructorInput,
  NamedConstructorFunctionParent,
  buildConstructorFunction,
} from './constructorFunctionBuilder';
import { ConstructorFunctionName } from './types';

export type NamedConstructorFunctionAssemblerContext =
  ConstructorFunctionBuilderContext;

type NamedConstructorFunctionAssembler<
  TConstructorFunctionName extends ConstructorFunctionName,
  TConstructorInput extends GenericConstructorInput,
  TConstructedInstance extends GenericConstructedInstance,
> = () => NamedConstructorFunctionParent<
  TConstructorFunctionName,
  TConstructorInput,
  TConstructedInstance
>;

export const buildNamedConstructorFunctionAssembler = <
  TConstructorFunctionName extends ConstructorFunctionName,
  TConstructorInput extends GenericConstructorInput,
  TConstructedInstance extends GenericConstructedInstance,
>(
  assemblerContext: NamedConstructorFunctionAssemblerContext,
): NamedConstructorFunctionAssembler<
  TConstructorFunctionName,
  TConstructorInput,
  TConstructedInstance
> => {
  const assembleNamedConstructorFunction: NamedConstructorFunctionAssembler<
    TConstructorFunctionName,
    TConstructorInput,
    TConstructedInstance
  > = () => {
    const constructorFunction = buildConstructorFunction<
      TConstructorInput,
      TConstructedInstance
    >(assemblerContext);

    return {
      [assemblerContext.constructorName]: constructorFunction,
    } as NamedConstructorFunctionParent<
      TConstructorFunctionName,
      TConstructorInput,
      TConstructedInstance
    >;
  };

  return assembleNamedConstructorFunction;
};

export type NamedConstructorFunctionAssemblerParent<
  TConstructorFunctionName extends ConstructorFunctionName,
  TConstructorInput extends GenericConstructorInput,
  TConstructedInstance extends GenericConstructedInstance,
> = {
  assemble: NamedConstructorFunctionAssembler<
    TConstructorFunctionName,
    TConstructorInput,
    TConstructedInstance
  >;
};