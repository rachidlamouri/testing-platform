import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../package-agnostic-utilities/datastructure/zorn';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { LeafSource } from './leafSource';
import { SourceTypeName } from './sourceTypeName';

const REQUEST_SOURCE_ZORN_TEMPLATE = [
  'requestor',
  'requestee',
] as const satisfies GenericZorn2Template;
type RequestSourceZornTemplate = typeof REQUEST_SOURCE_ZORN_TEMPLATE;
class RequestSourceZorn extends Zorn2<RequestSourceZornTemplate> {
  get rawTemplate(): RequestSourceZornTemplate {
    return REQUEST_SOURCE_ZORN_TEMPLATE;
  }
}

type RequestSourceConstructorInput = {
  requestor: LeafSource;
  requestee: LeafSource;
};

/**
 * A source composed of other sources. This allows one source to make a check on
 * behalf of another source through a third entity without losing how to find
 * any of the sources.
 */
export type RequestSource = SimplifyN<
  [
    {
      typeName: SourceTypeName.RequestSource;
      zorn: RequestSourceZorn;
    },
    RequestSourceConstructorInput,
  ]
>;

export const { RequestSourceInstance } = buildNamedConstructorFunction({
  constructorName: 'RequestSourceInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'typeName',
    'zorn',
    'requestor',
    'requestee',
  ] as const satisfies readonly (keyof RequestSource)[],
})
  .withTypes<RequestSourceConstructorInput, RequestSource>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { requestor, requestee } = input;

      const zorn = new RequestSourceZorn({
        requestor,
        requestee,
      });

      return {
        typeName: SourceTypeName.RequestSource,
        zorn,
        ...input,
      } satisfies RequestSource;
    },
  })
  .assemble();
