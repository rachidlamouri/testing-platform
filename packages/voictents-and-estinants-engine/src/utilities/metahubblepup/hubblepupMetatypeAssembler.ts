import { SpreadN } from '../spreadN';
import {
  ConstructorFunctionFromBuilderContext,
  GenericHubblepupInstance,
  HubblepupConstructorFunctionBuilderContext,
  HubblepupConstructorInput,
  buildConstructorFunction,
} from './hubblepupConstructorFunctionBuilder';
import { ConstructorFunctionName, GenericConstructorFunction } from './types';

type HubblepupMetatype<
  TConstructorFunctionName extends ConstructorFunctionName,
  THubblepupConstructorInput extends HubblepupConstructorInput,
  THubblepupInstance extends GenericHubblepupInstance,
> = SpreadN<
  [
    {
      [TKey in TConstructorFunctionName]: ConstructorFunctionFromBuilderContext<
        THubblepupConstructorInput,
        THubblepupInstance
      >;
    },
    {
      constructorInputType: THubblepupConstructorInput;
      instanceType: THubblepupInstance;
    },
  ]
>;

export type HubblepupMetatypeAssemblerContext =
  HubblepupConstructorFunctionBuilderContext;

type HubblepupMetatypeAssembler<
  TConstructorFunctionName extends ConstructorFunctionName,
  THubblepupConstructorInput extends HubblepupConstructorInput,
  THubblepupInstance extends GenericHubblepupInstance,
> = () => HubblepupMetatype<
  TConstructorFunctionName,
  THubblepupConstructorInput,
  THubblepupInstance
>;

export const buildHubblepupMetatypeAssembler = <
  TConstructorFunctionName extends ConstructorFunctionName,
  THubblepupConstructorInput extends HubblepupConstructorInput,
  THubblepupInstance extends GenericHubblepupInstance,
>(
  assemblerContext: HubblepupMetatypeAssemblerContext,
): HubblepupMetatypeAssembler<
  TConstructorFunctionName,
  THubblepupConstructorInput,
  THubblepupInstance
> => {
  const assembleHubblepupMetatype: HubblepupMetatypeAssembler<
    TConstructorFunctionName,
    THubblepupConstructorInput,
    THubblepupInstance
  > = () => {
    const constructorFunction = buildConstructorFunction<
      THubblepupConstructorInput,
      THubblepupInstance
    >(assemblerContext);

    const hubblepupMetatype = {
      constructorInputType: undefined,
      instanceType: undefined,
      [assemblerContext.constructorName]: constructorFunction,
    };

    const proxiedHubblepupMetatype = new Proxy(hubblepupMetatype, {
      get(target, propertyName): GenericConstructorFunction {
        if (propertyName !== assemblerContext.constructorName) {
          throw Error('Do not access metatype type properties');
        }

        return target[propertyName] as GenericConstructorFunction;
      },
    });

    return proxiedHubblepupMetatype as unknown as HubblepupMetatype<
      TConstructorFunctionName,
      THubblepupConstructorInput,
      THubblepupInstance
    >;
  };

  return assembleHubblepupMetatype;
};

export type HubblepupMetatypeAssemblerParent<
  TConstructorFunctionName extends ConstructorFunctionName,
  THubblepupConstructorInput extends HubblepupConstructorInput,
  THubblepupInstance extends GenericHubblepupInstance,
> = {
  assemble: HubblepupMetatypeAssembler<
    TConstructorFunctionName,
    THubblepupConstructorInput,
    THubblepupInstance
  >;
};
