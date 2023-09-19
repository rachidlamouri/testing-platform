import { AbstractInMemoryVoictent } from '../../../core/engine/abstractInMemoryVoictent';
import { InMemoryIndexByName } from '../../../core/engine/inMemoryVoque';
import { Voque } from '../../../core/engine/voque';
import { buildNamedConstructorFunction } from '../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../utilities/simplify';
import { LintAssertionZorn } from './lintAssertion';
import { TypedRule } from './rule';
import { FileSourceInstance } from './source/fileSource';
import { Source } from './source/source';

const LINT_ASSERTION_OMISSION_ZORN_TEMPLATE = [
  ['omitterSource', Zorn2.ANY],
  ['omittedAssertionZorn', LintAssertionZorn],
] as const satisfies GenericZorn2Template;
type LintAssertionOmissionZornTemplate =
  typeof LINT_ASSERTION_OMISSION_ZORN_TEMPLATE;
class LintAssertionOmissionZorn extends Zorn2<LintAssertionOmissionZornTemplate> {
  get rawTemplate(): LintAssertionOmissionZornTemplate {
    return LINT_ASSERTION_OMISSION_ZORN_TEMPLATE;
  }
}

type LintAssertionOmissionConstructorInput = {
  omitterSource: Source;
  omittedAssertionZorn: LintAssertionZorn;
};

/**
 * A means for ignoring a lint rule
 */
export type LintAssertionOmission = SimplifyN<
  [
    {
      zorn: LintAssertionOmissionZorn;
    },
    LintAssertionOmissionConstructorInput,
  ]
>;

export const { LintAssertionOmissionInstance } = buildNamedConstructorFunction({
  constructorName: 'LintAssertionOmissionInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'omitterSource',
    'omittedAssertionZorn',
  ] as const satisfies readonly (keyof LintAssertionOmission)[],
})
  .withTypes<LintAssertionOmissionConstructorInput, LintAssertionOmission>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { omitterSource, omittedAssertionZorn } = input;

      const zorn = new LintAssertionOmissionZorn({
        omitterSource,
        omittedAssertionZorn,
      });

      return {
        zorn,
        ...input,
      } satisfies LintAssertionOmission;
    },
  })
  .assemble();

export const LINT_ASSERTION_OMISSION_GEPP = 'lint-assertion-omission';

type LintAssertionOmissionGepp = typeof LINT_ASSERTION_OMISSION_GEPP;

type LintAssertionOmissionVoictentPelie = {
  list: LintAssertionOmission[];
  omittedZornSet: Set<string>;
};

export type LintAssertionOmissionVoque = Voque<
  LintAssertionOmissionGepp,
  LintAssertionOmission,
  LintAssertionOmission,
  InMemoryIndexByName,
  LintAssertionOmissionVoictentPelie
>;

// TODO: update this class to not need a TVoque. you will need to update the program modeler
export class LintAssertionOmissionVoictent<
  TVoque extends LintAssertionOmissionVoque,
> extends AbstractInMemoryVoictent<LintAssertionOmissionVoque, TVoque> {
  private omittedZornSet = new Set<string>();

  addHubblepup(hubblepup: LintAssertionOmission): void {
    this.omittedZornSet.add(hubblepup.omittedAssertionZorn.forHuman);

    super.addHubblepup(hubblepup);
  }

  protected dereferenceVoictentPelie(): LintAssertionOmissionVoictentPelie {
    return {
      list: this.hubblepupPelieTuple,
      omittedZornSet: this.omittedZornSet,
    };
  }

  protected dereferenceHubblepupPelie(): never {
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
  omittedAssertionZorn: new LintAssertionZorn({
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
