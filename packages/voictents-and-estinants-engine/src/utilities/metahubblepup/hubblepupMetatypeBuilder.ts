import { GenericHubblepupPropertyNameTuple } from './hubblepupConstructorFunctionBuilder';
import {
  HubblepupMetatypeInstanceTypeBuilderParent,
  buildHubblepupMetatypeInstanceTypeBuilder,
} from './hubblepupMetatypeInstanceTypeBuilder';
import { ConstructorFunctionName } from './types';

type HubblepupMetatypeBuilderContext<
  TConstructorFunctionName extends ConstructorFunctionName,
  THubblepupInstancePropertyNameTuple extends GenericHubblepupPropertyNameTuple,
> = {
  constructorName: TConstructorFunctionName;
  instancePropertyNameTuple: THubblepupInstancePropertyNameTuple;
};

type HubblepupMetatypeBuilder = <
  TConstructorFunctionName extends ConstructorFunctionName,
  THubblepupInstancePropertyNameTuple extends GenericHubblepupPropertyNameTuple,
>(
  context: HubblepupMetatypeBuilderContext<
    TConstructorFunctionName,
    THubblepupInstancePropertyNameTuple
  >,
) => HubblepupMetatypeInstanceTypeBuilderParent<
  TConstructorFunctionName,
  THubblepupInstancePropertyNameTuple
>;

export const buildHubblepupMetatype: HubblepupMetatypeBuilder = <
  TConstructorFunctionName extends ConstructorFunctionName,
  THubblepupInstancePropertyNameTuple extends GenericHubblepupPropertyNameTuple,
>(
  context: HubblepupMetatypeBuilderContext<
    TConstructorFunctionName,
    THubblepupInstancePropertyNameTuple
  >,
) => {
  return {
    withInstanceType: buildHubblepupMetatypeInstanceTypeBuilder<
      TConstructorFunctionName,
      THubblepupInstancePropertyNameTuple
    >(context),
  };
};
