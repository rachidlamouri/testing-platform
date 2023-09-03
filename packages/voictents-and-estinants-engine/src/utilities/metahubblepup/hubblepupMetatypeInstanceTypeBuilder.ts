import {
  GenericHubblepupInstance,
  GenericHubblepupPropertyNameTuple,
  HubblepupInstance,
} from './hubblepupConstructorFunctionBuilder';
import {
  HubblepupMetatypeAssemblerContext,
  HubblepupMetatypeAssemblerParent,
  buildHubblepupMetatypeAssembler,
} from './hubblepupMetatypeAssembler';
import { ConstructorFunctionName } from './types';

type HubblepupMetatypeInstanceTypeBuilder<
  TConstructorFunctionName extends ConstructorFunctionName,
  THubblepupInstancePropertyNameTuple extends GenericHubblepupPropertyNameTuple,
> = <
  THubblepupInstance extends HubblepupInstance<THubblepupInstancePropertyNameTuple>,
>() => HubblepupMetatypeAssemblerParent<
  TConstructorFunctionName,
  THubblepupInstance,
  THubblepupInstance
>;

type HubblepupInstanceTypeBuilderContext = Pick<
  HubblepupMetatypeAssemblerContext,
  'constructorName' | 'instancePropertyNameTuple'
>;

export const buildHubblepupMetatypeInstanceTypeBuilder = <
  TConstructorFunctionName extends ConstructorFunctionName,
  THubblepupInstancePropertyNameTuple extends GenericHubblepupPropertyNameTuple,
>(
  hubblepupInstanceTypeBuilderContext: HubblepupInstanceTypeBuilderContext,
): HubblepupMetatypeInstanceTypeBuilder<
  TConstructorFunctionName,
  THubblepupInstancePropertyNameTuple
> => {
  const buildHubblepupMetatypeInstanceType: HubblepupMetatypeInstanceTypeBuilder<
    TConstructorFunctionName,
    THubblepupInstancePropertyNameTuple
  > = <
    THubblepupInstance extends HubblepupInstance<THubblepupInstancePropertyNameTuple>,
  >() => {
    const nextContext: HubblepupMetatypeAssemblerContext = {
      ...hubblepupInstanceTypeBuilderContext,
      transformInput: (input) => input,
    };

    return {
      assemble: buildHubblepupMetatypeAssembler<
        TConstructorFunctionName,
        THubblepupInstance,
        THubblepupInstance
      >(nextContext),
    };
  };

  return buildHubblepupMetatypeInstanceType;
};

export type HubblepupMetatypeInstanceTypeBuilderParent<
  TConstructorFunctionName extends ConstructorFunctionName,
  THubblepupInstancePropertyNameTuple extends GenericHubblepupPropertyNameTuple,
> = {
  withInstanceType: HubblepupMetatypeInstanceTypeBuilder<
    TConstructorFunctionName,
    THubblepupInstancePropertyNameTuple
  >;
};
