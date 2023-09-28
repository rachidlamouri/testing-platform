import { IsNever } from 'type-fest/source/internal';
import {
  GenericPropertyNameTuple,
  ConstructedInstance,
  GenericObjectLike,
  GenericConstructedInstance,
  ConstructorInputTransformer,
  GenericConstructorInputTransformer,
} from './constructorFunctionBuilder';
import {
  NamedConstructorFunctionAssemblerContext,
  NamedConstructorFunctionAssemblerParent,
  buildNamedConstructorFunctionAssembler,
} from './namedConstructorFunctionAssembler';
import { ConstructorFunctionName } from './types';
import { SpreadN } from '../type/spreadN';

type TypeCheckErrorMessages<
  TInitializationErrorMessage,
  TMissingPropertyName,
  TExtraneousPropertyName,
> = {
  typeCheckErrorMesssages: {
    initialization: TInitializationErrorMessage;
    instancePropertyNameTuple: {
      missingProperties: TMissingPropertyName;
      extraneousProperties: TExtraneousPropertyName;
    };
  };
};

type NormalizePropertyNameUnion<TPropertyName extends string> =
  IsNever<TPropertyName> extends true ? '' : TPropertyName;

type ConditionalTypeCheckErrorMessage<
  TConstructedInstancePropertyNameTupleIsList extends boolean,
  TConstructedInstanceKey extends string,
  TConstructedInstancePropertyName extends string,
> = TConstructedInstancePropertyNameTupleIsList extends true
  ? TypeCheckErrorMessages<
      'Initial context object must end in `as const`',
      '',
      ''
    >
  : TypeCheckErrorMessages<
      '',
      NormalizePropertyNameUnion<
        Exclude<TConstructedInstanceKey, TConstructedInstancePropertyName>
      >,
      NormalizePropertyNameUnion<
        Exclude<TConstructedInstancePropertyName, TConstructedInstanceKey>
      >
    >;

type TypeCheckErrorMessageFromInitialContext<
  TConstructedInstance extends GenericConstructedInstance,
  TConstructedInstancePropertyNameTuple extends GenericPropertyNameTuple,
> = ConditionalTypeCheckErrorMessage<
  TConstructedInstancePropertyNameTuple extends TConstructedInstancePropertyNameTuple[number][]
    ? true
    : false,
  Extract<keyof TConstructedInstance, string>,
  TConstructedInstancePropertyNameTuple[number]
>;

type PartialNamedConstructorFunctionAssemblerContext<
  TConstructorInput extends GenericObjectLike,
  TConstructedInstancePropertyNameTuple extends GenericPropertyNameTuple,
  TConstructedInstance extends ConstructedInstance<TConstructedInstancePropertyNameTuple>,
> = SpreadN<
  [
    TypeCheckErrorMessageFromInitialContext<
      TConstructedInstance,
      TConstructedInstancePropertyNameTuple
    >,
    {
      transformInput: ConstructorInputTransformer<
        TConstructorInput,
        TConstructedInstance
      >;
    },
  ]
>;

type NamedConstructorFunctionInstanceTypeBuilder<
  TConstructorFunctionName extends ConstructorFunctionName,
  TConstructedInstancePropertyNameTuple extends GenericPropertyNameTuple,
> = <
  TConstructorInput extends GenericObjectLike,
  TConstructedInstance extends GenericObjectLike,
>(
  partialAssemblerContext: PartialNamedConstructorFunctionAssemblerContext<
    TConstructorInput,
    TConstructedInstancePropertyNameTuple,
    TConstructedInstance
  >,
) => NamedConstructorFunctionAssemblerParent<
  TConstructorFunctionName,
  TConstructorInput,
  TConstructedInstance
>;

type NamedConstructedFunctionInstanceTypeBuilderContext = Pick<
  NamedConstructorFunctionAssemblerContext,
  'constructorName' | 'instancePropertyNameTuple'
>;

export const buildNamedConstructorFunctionInstanceTypeBuilder = <
  TConstructorFunctionName extends ConstructorFunctionName,
  TConstructedInstancePropertyNameTuple extends GenericPropertyNameTuple,
>(
  context: NamedConstructedFunctionInstanceTypeBuilderContext,
): NamedConstructorFunctionInstanceTypeBuilder<
  TConstructorFunctionName,
  TConstructedInstancePropertyNameTuple
> => {
  const buildNamedConstructorFunctionInstanceType: NamedConstructorFunctionInstanceTypeBuilder<
    TConstructorFunctionName,
    TConstructedInstancePropertyNameTuple
  > = <
    TConstructorInput extends GenericObjectLike,
    TConstructedInstance extends GenericObjectLike,
  >(
    partialAssemblerContext: PartialNamedConstructorFunctionAssemblerContext<
      TConstructorInput,
      TConstructedInstancePropertyNameTuple,
      TConstructedInstance
    >,
  ) => {
    const nextContext: NamedConstructorFunctionAssemblerContext = {
      ...context,
      transformInput:
        partialAssemblerContext.transformInput as GenericConstructorInputTransformer,
    };

    return {
      assemble: buildNamedConstructorFunctionAssembler<
        TConstructorFunctionName,
        TConstructorInput,
        TConstructedInstance
      >(nextContext),
    };
  };

  return buildNamedConstructorFunctionInstanceType;
};

export type NamedConstructorFunctionInstanceTypeBuilderParent<
  TConstructorFunctionName extends ConstructorFunctionName,
  TConstructedInstancePropertyNameTuple extends GenericPropertyNameTuple,
> = {
  withTypes: NamedConstructorFunctionInstanceTypeBuilder<
    TConstructorFunctionName,
    TConstructedInstancePropertyNameTuple
  >;
};
