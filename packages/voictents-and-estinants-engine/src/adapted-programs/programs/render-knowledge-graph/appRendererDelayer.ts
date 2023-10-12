import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';

const APP_RENDERER_DELAYER_ZORN_TEMPLATE = [
  'estinantName',
  'distinguisher',
] as const satisfies GenericComplexIdTemplate;
type AppRendererDelayerZornTemplate = typeof APP_RENDERER_DELAYER_ZORN_TEMPLATE;
class AppRendererDelayerZorn extends ComplexId<AppRendererDelayerZornTemplate> {
  get rawTemplate(): AppRendererDelayerZornTemplate {
    return APP_RENDERER_DELAYER_ZORN_TEMPLATE;
  }
}

type AppRendererDelayerConstructorInput = {
  estinantName: string;
  distinguisher?: string;
};

/**
 * Allows an estinant to guarantee that it runs before "renderApp". "renderApp"
 * triggers off the collection of this item, so it will have to wait until the
 * entire collection is ready
 */
type AppRendererDelayer = Required<
  SimplifyN<
    [
      {
        zorn: AppRendererDelayerZorn;
      },
      AppRendererDelayerConstructorInput,
    ]
  >
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
    typeCheckErrorMessage: {
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

export type AppRendererDelayerVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    AppRendererDelayerGepp,
    AppRendererDelayer
  >;
