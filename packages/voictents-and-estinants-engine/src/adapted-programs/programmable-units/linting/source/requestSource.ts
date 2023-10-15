import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { LeafSource } from './leafSource';
import { SourceTypeName } from './sourceTypeName';

const REQUEST_SOURCE_ID_TEMPLATE = [
  'requestor',
  'requestee',
] as const satisfies GenericComplexIdTemplate;
type RequestSourceIdTemplate = typeof REQUEST_SOURCE_ID_TEMPLATE;
class RequestSourceId extends ComplexId<RequestSourceIdTemplate> {
  get rawTemplate(): RequestSourceIdTemplate {
    return REQUEST_SOURCE_ID_TEMPLATE;
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
      id: RequestSourceId;
    },
    RequestSourceConstructorInput,
  ]
>;

export const { RequestSourceInstance } = buildNamedConstructorFunction({
  constructorName: 'RequestSourceInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'typeName',
    'id',
    'requestor',
    'requestee',
  ] as const satisfies readonly (keyof RequestSource)[],
})
  .withTypes<RequestSourceConstructorInput, RequestSource>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { requestor, requestee } = input;

      const id = new RequestSourceId({
        requestor,
        requestee,
      });

      return {
        typeName: SourceTypeName.RequestSource,
        id,
        ...input,
      } satisfies RequestSource;
    },
  })
  .assemble();
