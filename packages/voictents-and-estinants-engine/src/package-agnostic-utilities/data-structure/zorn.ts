/**
 * A simple string identifier or a complex identifer composed of key/value pairs
 *
 * @noCanonicalDeclaration
 *
 * @readableName Id
 */

import { TupleToUnion, UnionToIntersection, Simplify } from 'type-fest';
import { getTextDigest } from '../string/getTextDigest';
import { NonEmptyTuple, Tuple } from '../type/tuple';

/**
 * An arbitrary identifier.
 * @deprecated use SimpleId or ComplexId instead
 */
export type Deprecatedzorn = unknown;

export type Simplezorn = string;

export type ZornTuple = readonly Deprecatedzorn[];

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type ZornTuple2 = readonly (string | UnsafeComplexzorn)[];

type TemplateKey<TTemplateKey extends string> = TTemplateKey;

type GenericTemplateKey = TemplateKey<string>;

/** The dot-delimited path of a key through one or more nested zorns */
type TemplateKeyPath = string;

type OutputValue = string;

export type OutputValueByTemplateKeyPath = Record<TemplateKeyPath, OutputValue>;

type ComplexzornLike = {
  getOutputValueByTemplateKeyPathList(
    parentTemplateKeyPath: string,
  ): OutputValueByTemplateKeyPath[];
  forHuman: string;
};

// TODO: Replace "UnsafeInputValueByTemplateKey" with an object type like
// Record<string, string | zorn instance>, and debug the resulting errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnsafeInputValueByTemplateKey = any;

type ComplexzornLikeConstructor<TComplexzornLike extends ComplexzornLike> = {
  new (
    inputValueByTemplateKey: UnsafeInputValueByTemplateKey,
  ): TComplexzornLike;
};

type GenericComplexzornLikeConstructor =
  ComplexzornLikeConstructor<ComplexzornLike>;

enum ZornTemplateKeyword {
  LITERAL = 'literal',
  ANY = 'any',
}

type Subzorn = ZornTemplateKeyword | GenericComplexzornLikeConstructor;

type SubzornTuple<TSubzornTuple extends Tuple<Subzorn>> = TSubzornTuple;
type GenericSubzornTuple = SubzornTuple<Tuple<Subzorn>>;

type SubzornSingleton<TSubzorn extends Subzorn> = SubzornTuple<[TSubzorn]>;

type NonEmptySubzornTuple<
  TFirstSubzorn extends Subzorn,
  TRestSubzornTuple extends GenericSubzornTuple,
> = readonly [TFirstSubzorn, ...TRestSubzornTuple];

type GenericNonEmptySubzornTuple = NonEmptySubzornTuple<
  Subzorn,
  GenericSubzornTuple
>;

type SubzornTemplateEntry<
  TTemplateKey extends GenericTemplateKey,
  TNonEmptySubzornTuple extends GenericNonEmptySubzornTuple,
> = readonly [TTemplateKey, ...TNonEmptySubzornTuple];

type ComplexzornTemplateEntry<
  TTemplateKey extends GenericTemplateKey,
  TNonEmptySubzornTuple extends GenericNonEmptySubzornTuple,
> = TTemplateKey | SubzornTemplateEntry<TTemplateKey, TNonEmptySubzornTuple>;

type GenericComplexzornTemplateEntry = ComplexzornTemplateEntry<
  GenericTemplateKey,
  GenericNonEmptySubzornTuple
>;

export type GenericComplexzornTemplate =
  NonEmptyTuple<GenericComplexzornTemplateEntry>;

type InputValue<TSubzorn extends Subzorn> =
  TSubzorn extends ZornTemplateKeyword.LITERAL
    ? OutputValue
    : TSubzorn extends ZornTemplateKeyword.ANY
    ? ComplexzornLike | { zorn: ComplexzornLike }
    : TSubzorn extends ComplexzornLikeConstructor<infer TComplexzornLike>
    ? TComplexzornLike | { zorn: TComplexzornLike }
    : never;

type InputValueFromSubzornTuple<TSubzornTuple extends GenericSubzornTuple> =
  TSubzornTuple extends SubzornSingleton<infer TSubzorn>
    ? InputValue<TSubzorn>
    : TSubzornTuple extends NonEmptySubzornTuple<
        infer TFirstSubzorn,
        infer TRestSubzornTuple
      >
    ? InputValue<TFirstSubzorn> | InputValueFromSubzornTuple<TRestSubzornTuple>
    : never;

type InputValueByTemplateKey<
  TComplexzornTemplate extends GenericComplexzornTemplate,
> = Simplify<
  UnionToIntersection<
    TupleToUnion<{
      [TIndex in keyof TComplexzornTemplate]: TComplexzornTemplate[TIndex] extends TemplateKey<
        infer TTemplateKey
      >
        ? {
            [TKey in TTemplateKey]: InputValueFromSubzornTuple<
              [ZornTemplateKeyword]
            >;
          }
        : TComplexzornTemplate[TIndex] extends SubzornTemplateEntry<
            infer TTemplateKey,
            infer TNonEmptySubzornTuple
          >
        ? {
            [TKey in TTemplateKey]: InputValueFromSubzornTuple<TNonEmptySubzornTuple>;
          }
        : never;
    }>
  >
>;

type TemplateKeyTuple<TTemplate extends GenericComplexzornTemplate> = {
  [TIndex in keyof TTemplate]: TTemplate[TIndex] extends GenericTemplateKey
    ? TTemplate[TIndex]
    : TTemplate[TIndex] extends SubzornTemplateEntry<
        infer TTemplateKey,
        GenericNonEmptySubzornTuple
      >
    ? TTemplateKey
    : never;
};

type ComplexzornInterface<TTemplate extends GenericComplexzornTemplate> = {
  rawTemplate: TTemplate;
  getOutputValueByTemplateKeyPathList(
    parentTemplateKeyPath: string,
  ): OutputValueByTemplateKeyPath[];
  templateValueByKeyPath: OutputValueByTemplateKeyPath;
  template: TemplateKeyTuple<TTemplate>;
  // TODO: this one should be "InputValueByTemplateKey<TTemplate>", but it affects a lot of files and needs some debuggin'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueByTemplateKey: any;
  forHuman: string;
  forMachine: string;
};

/**
 * A complex identifier. It contains one or more key/value pairs that can be
 * used to generate a string representation of the identifier
 */
export abstract class Complexzorn<TTemplate extends GenericComplexzornTemplate>
  implements ComplexzornInterface<TTemplate>
{
  static LITERAL = ZornTemplateKeyword.LITERAL;

  static ANY = ZornTemplateKeyword.ANY;

  constructor(
    public readonly valueByTemplateKey: InputValueByTemplateKey<TTemplate>,
  ) {}

  get forHuman(): string {
    return this.template
      .map((key: string) => {
        const value = this.safeValueByTemplateKey[key];

        if (typeof value === 'string') {
          return value;
        }

        const subzorn = 'zorn' in value ? value.zorn : value;
        return subzorn.forHuman;
      })
      .join(':');
  }

  /**
   * This function is safe and private because the exact type of
   * "valueByTemplateKey" cannot be derived within this class
   */
  private get safeValueByTemplateKey(): Record<
    string,
    string | ComplexzornLike | { zorn: ComplexzornLike }
  > {
    return this.valueByTemplateKey as Record<
      string,
      string | ComplexzornLike | { zorn: ComplexzornLike }
    >;
  }

  abstract get rawTemplate(): TTemplate;

  getOutputValueByTemplateKeyPathList(
    prefix: string,
  ): OutputValueByTemplateKeyPath[] {
    return this.template.flatMap((key: string) => {
      const nextPrefix = prefix === '' ? key : `${prefix}.${key}`;

      const value = this.safeValueByTemplateKey[key];

      if (typeof value === 'string') {
        return [{ [nextPrefix]: value }];
      }

      const subzorn = 'zorn' in value ? value.zorn : value;
      return subzorn.getOutputValueByTemplateKeyPathList(nextPrefix);
    });
  }

  get templateValueByKeyPath(): OutputValueByTemplateKeyPath {
    return Object.assign(
      {},
      ...this.getOutputValueByTemplateKeyPathList(''),
    ) as OutputValueByTemplateKeyPath;
  }

  get template(): TemplateKeyTuple<TTemplate> {
    return this.rawTemplate.map((value) => {
      if (typeof value === 'string') {
        return value;
      }

      return value[0];
    }) as TemplateKeyTuple<TTemplate>;
  }

  get forMachine(): string {
    return getTextDigest(this.forHuman);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnsafeComplexzorn = ComplexzornInterface<NonEmptyTuple<any>>;
