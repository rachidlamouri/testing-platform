import {
  ConstructorFunctionBuilderContext,
  ConstructorFunctionFromBuilderContext,
  GenericConstructedInstance,
  GenericConstructorInput,
  NamedConstructorFunctionParent,
  buildConstructorFunction,
} from './buildConstructorFunction';
import { ConstructorFunctionName } from './types';

export type NamedConstructorFunctionAssemblerContext =
  ConstructorFunctionBuilderContext;

/**
 * The final part of the constructor function builder chain. It encapsulates
 * putting all of the context together into a constructor function.
 */
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

    // TODO: remove proxy after mass refactor. We are destructuring based on a string name that isn't automatically refactored
    const result = new Proxy(
      {},
      {
        get: (): ConstructorFunctionFromBuilderContext<
          TConstructorInput,
          TConstructedInstance
        > => {
          return constructorFunction;
        },
      },
    );

    return result as NamedConstructorFunctionParent<
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
