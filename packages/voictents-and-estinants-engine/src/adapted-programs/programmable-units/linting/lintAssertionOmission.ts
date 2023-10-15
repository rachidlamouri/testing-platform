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

const LINT_ASSERTION_OMISSION_ZORN_TEMPLATE = [
  ['omitterSource', ComplexId.ANY],
  ['omittedAssertionId', LintAssertionId],
] as const satisfies GenericComplexIdTemplate;
type LintAssertionOmissionZornTemplate =
  typeof LINT_ASSERTION_OMISSION_ZORN_TEMPLATE;
class LintAssertionOmissionZorn extends ComplexId<LintAssertionOmissionZornTemplate> {
  get rawTemplate(): LintAssertionOmissionZornTemplate {
    return LINT_ASSERTION_OMISSION_ZORN_TEMPLATE;
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
      id: LintAssertionOmissionZorn;
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

      const id = new LintAssertionOmissionZorn({
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

type LintAssertionOmissionGepp = typeof LINT_ASSERTION_OMISSION_COLLECTION_ID;

type LintAssertionOmissionVoictentPelie = {
  list: LintAssertionOmission[];
  omittedZornSet: Set<string>;
};

export type LintAssertionOmissionStreamMetatype = StreamMetatype<
  LintAssertionOmissionGepp,
  LintAssertionOmission,
  LintAssertionOmission,
  InMemoryIndexByName,
  LintAssertionOmissionVoictentPelie
>;

// TODO: update this class to not need a TVoque. you will need to update the program modeler
export class LintAssertionOmissionCollection<
  TVoque extends LintAssertionOmissionStreamMetatype,
> extends AbstractInMemoryCollection<
  LintAssertionOmissionStreamMetatype,
  TVoque
> {
  private omittedZornSet = new Set<string>();

  addItem(hubblepup: LintAssertionOmission): void {
    this.omittedZornSet.add(hubblepup.omittedAssertionId.forHuman);

    super.addItem(hubblepup);
  }

  protected dereferenceCollection(): LintAssertionOmissionVoictentPelie {
    return {
      list: this.itemTuple,
      omittedZornSet: this.omittedZornSet,
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
