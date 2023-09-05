import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../utilities/simplify';

const APP_RENDERER_DELAYER_ZORN_TEMPLATE = [
  'estinantName',
  'distinguisher',
] as const satisfies GenericZorn2Template;
type AppRendererDelayerZornTemplate = typeof APP_RENDERER_DELAYER_ZORN_TEMPLATE;
class AppRendererDelayerZorn extends Zorn2<AppRendererDelayerZornTemplate> {
  get rawTemplate(): AppRendererDelayerZornTemplate {
    return APP_RENDERER_DELAYER_ZORN_TEMPLATE;
  }
}

type AppRendererDelayerConstructorInput = {
  estinantName: string;
  distinguisher?: string;
};

type AppRendererDelayer = SimplifyN<
  [
    {
      zorn: AppRendererDelayerZorn;
    },
    AppRendererDelayerConstructorInput,
  ]
>;

export const { AppRendererDelayerInstance } = buildNamedConstructorFunction({
  constructorName: 'AppRendererDelayerInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'estinantName',
    'distinguisher',
  ],
} as const)
  .withTypes<AppRendererDelayerConstructorInput, AppRendererDelayer>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { estinantName, distinguisher = '' } = input;

      const zorn = new AppRendererDelayerZorn({
        estinantName,
        distinguisher,
      });

      return {
        zorn,
        estinantName,
        distinguisher,
      };
    },
  })
  .assemble();

export const APP_RENDERER_DELAYER_GEPP = 'app-renderer-delayer';

type AppRendererDelayerGepp = typeof APP_RENDERER_DELAYER_GEPP;

export type AppRendererDelayerVoque = InMemoryOdeshin2ListVoque<
  AppRendererDelayerGepp,
  AppRendererDelayer
>;
