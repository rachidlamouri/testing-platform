import { AbstractInMemoryCollection } from '../../../layer-agnostic-utilities/collection/abstractInMemoryCollection';
import { InMemoryIndexByName } from '../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { StreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { LintAssertionId } from './lintAssertion';
import { TypedRule } from './rule';
import { FileSourceInstance } from './source/fileSource';
import { Source } from './source/source';

const LINT_ASSERTION_OMISSION_ID_TEMPLATE = [
  ['omitterSource', ComplexId.ANY],
  ['omittedAssertionId', LintAssertionId],
] as const satisfies GenericComplexIdTemplate;
type LintAssertionOmissionIdTemplate =
  typeof LINT_ASSERTION_OMISSION_ID_TEMPLATE;
class LintAssertionOmissionId extends ComplexId<LintAssertionOmissionIdTemplate> {
  get rawTemplate(): LintAssertionOmissionIdTemplate {
    return LINT_ASSERTION_OMISSION_ID_TEMPLATE;
  }
}

type LintAssertionOmissionConstructorInput = {
  omitterSource: Source;
  omittedAssertionId: LintAssertionId;
};

/**
 * A means for ignoring a lint rule
 *
 * @todo rename to LintAssertionExemption
 */
export type LintAssertionOmission = SimplifyN<
  [
    {
      id: LintAssertionOmissionId;
    },
    LintAssertionOmissionConstructorInput,
  ]
>;

export const { LintAssertionOmissionInstance } = buildNamedConstructorFunction({
  constructorName: 'LintAssertionOmissionInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'omitterSource',
    'omittedAssertionId',
  ] as const satisfies readonly (keyof LintAssertionOmission)[],
})
  .withTypes<LintAssertionOmissionConstructorInput, LintAssertionOmission>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { omitterSource, omittedAssertionId } = input;

      const id = new LintAssertionOmissionId({
        omitterSource,
        omittedAssertionId,
      });

      return {
        id,
        ...input,
      } satisfies LintAssertionOmission;
    },
  })
  .assemble();

export const LINT_ASSERTION_OMISSION_COLLECTION_ID = 'lint-assertion-omission';

type LintAssertionOmissionCollectionId =
  typeof LINT_ASSERTION_OMISSION_COLLECTION_ID;

type LintAssertionOmissionCollectionStreamable = {
  list: LintAssertionOmission[];
  omittedIdSet: Set<string>;
};

export type LintAssertionOmissionStreamMetatype = StreamMetatype<
  LintAssertionOmissionCollectionId,
  LintAssertionOmission,
  LintAssertionOmission,
  InMemoryIndexByName,
  LintAssertionOmissionCollectionStreamable
>;

// TODO: update this class to not need a TStreamMetatype. you will need to update the program modeler
export class LintAssertionOmissionCollection<
  TStreamMetatype extends LintAssertionOmissionStreamMetatype,
> extends AbstractInMemoryCollection<
  LintAssertionOmissionStreamMetatype,
  TStreamMetatype
> {
  private omittedIdSet = new Set<string>();

  addItem(item: LintAssertionOmission): void {
    this.omittedIdSet.add(item.omittedAssertionId.forHuman);

    super.addItem(item);
  }

  protected dereferenceCollection(): LintAssertionOmissionCollectionStreamable {
    return {
      list: this.itemTuple,
      omittedIdSet: this.omittedIdSet,
    };
  }

  protected dereferenceItem(): never {
    throw new Error('Method not supported');
  }
}

/**
 * The NULL_OMISSION shouldn't exist. It's currently required because the engine
 * throws an error when a collection is uninitialized, nor the output of a
 * transform
 */
const fileSource = new FileSourceInstance({
  filePath: __filename,
});
export const NULL_OMISSION = new LintAssertionOmissionInstance({
  omittedAssertionId: new LintAssertionId({
    rule: new TypedRule({
      name: 'null-omission-rule',
      source: fileSource,
      description: 'NULL_OMISSION_RULE',
      getErrorMessage: () => 'NULL_OMISSION_RULE' as const,
    }),
    lintSource: fileSource,
  }),
  omitterSource: fileSource,
});
