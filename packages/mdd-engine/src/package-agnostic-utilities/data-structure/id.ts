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

export const SINGLETON_ID = 'SINGLETON';

/**
 * An arbitrary identifier.
 * @deprecated use SimpleId or ComplexId instead
 */
export type DeprecatedId = unknown;

export type SimpleId = string;

export type IdTuple = readonly DeprecatedId[];

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type IdTuple2 = readonly (string | UnsafeComplexId)[];

type TemplateKey<TTemplateKey extends string> = TTemplateKey;

type GenericTemplateKey = TemplateKey<string>;

/** The dot-delimited path of a key through one or more nested ids */
type TemplateKeyPath = string;

type OutputValue = string;

export type OutputValueByTemplateKeyPath = Record<TemplateKeyPath, OutputValue>;

type ComplexIdLike = {
  getOutputValueByTemplateKeyPathList(
    parentTemplateKeyPath: string,
  ): OutputValueByTemplateKeyPath[];
  forHuman: string;
};

// TODO: Replace "UnsafeInputValueByTemplateKey" with an object type like
// Record<string, string | Id instance>, and debug the resulting errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnsafeInputValueByTemplateKey = any;

type ComplexIdLikeConstructor<TComplexIdLike extends ComplexIdLike> = {
  new (inputValueByTemplateKey: UnsafeInputValueByTemplateKey): TComplexIdLike;
};

type GenericComplexIdLikeConstructor = ComplexIdLikeConstructor<ComplexIdLike>;

enum IdTemplateKeyword {
  LITERAL = 'literal',
  /** @deprecated use AnyComplexId */
  ANY = 'any',
  AnyComplexId = 'AnyComplexId',
}

type SpecificLabelList<TLabel extends string> = NonEmptyTuple<TLabel>;
type GenericLableList = SpecificLabelList<string>;

type Subid =
  | IdTemplateKeyword
  | GenericLableList
  | GenericComplexIdLikeConstructor;

type SubidTuple<TSubidTuple extends Tuple<Subid>> = TSubidTuple;
type GenericSubidTuple = SubidTuple<Tuple<Subid>>;

type SubidSingleton<TSubid extends Subid> = SubidTuple<[TSubid]>;

type NonEmptySubidTuple<
  TFirstSubid extends Subid,
  TRestSubidTuple extends GenericSubidTuple,
> = readonly [TFirstSubid, ...TRestSubidTuple];

type GenericNonEmptySubidTuple = NonEmptySubidTuple<Subid, GenericSubidTuple>;

type SubidTemplateEntry<
  TTemplateKey extends GenericTemplateKey,
  TNonEmptySubidTuple extends GenericNonEmptySubidTuple,
> = readonly [TTemplateKey, ...TNonEmptySubidTuple];

type ComplexIdTemplateEntry<
  TTemplateKey extends GenericTemplateKey,
  TNonEmptySubidTuple extends GenericNonEmptySubidTuple,
> = TTemplateKey | SubidTemplateEntry<TTemplateKey, TNonEmptySubidTuple>;

type GenericComplexIdTemplateEntry = ComplexIdTemplateEntry<
  GenericTemplateKey,
  GenericNonEmptySubidTuple
>;

export type GenericComplexIdTemplate =
  NonEmptyTuple<GenericComplexIdTemplateEntry>;

type InputValue<TSubid extends Subid> = TSubid extends IdTemplateKeyword.LITERAL
  ? OutputValue
  : TSubid extends IdTemplateKeyword.ANY
  ? ComplexIdLike | { id: ComplexIdLike }
  : TSubid extends SpecificLabelList<infer TLabel>
  ? TLabel
  : TSubid extends ComplexIdLikeConstructor<infer TComplexIdLike>
  ? TComplexIdLike | { id: TComplexIdLike }
  : never;

type InputValueFromSubidTuple<TSubidTuple extends GenericSubidTuple> =
  TSubidTuple extends SubidSingleton<infer TSubid>
    ? InputValue<TSubid>
    : TSubidTuple extends NonEmptySubidTuple<
        infer TFirstSubid,
        infer TRestSubidTuple
      >
    ? InputValue<TFirstSubid> | InputValueFromSubidTuple<TRestSubidTuple>
    : never;

export type InputValueByTemplateKey<
  TComplexIdTemplate extends GenericComplexIdTemplate,
> = Simplify<
  UnionToIntersection<
    TupleToUnion<{
      [TIndex in keyof TComplexIdTemplate]: TComplexIdTemplate[TIndex] extends TemplateKey<
        infer TTemplateKey
      >
        ? {
            [TKey in TTemplateKey]: InputValueFromSubidTuple<
              [IdTemplateKeyword]
            >;
          }
        : TComplexIdTemplate[TIndex] extends SubidTemplateEntry<
            infer TTemplateKey,
            infer TNonEmptySubidTuple
          >
        ? {
            [TKey in TTemplateKey]: InputValueFromSubidTuple<TNonEmptySubidTuple>;
          }
        : never;
    }>
  >
>;

type TemplateKeyTuple<TTemplate extends GenericComplexIdTemplate> = {
  [TIndex in keyof TTemplate]: TTemplate[TIndex] extends GenericTemplateKey
    ? TTemplate[TIndex]
    : TTemplate[TIndex] extends SubidTemplateEntry<
        infer TTemplateKey,
        GenericNonEmptySubidTuple
      >
    ? TTemplateKey
    : never;
};

type ComplexIdInterface<TTemplate extends GenericComplexIdTemplate> = {
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
export abstract class ComplexId<TTemplate extends GenericComplexIdTemplate>
  implements ComplexIdInterface<TTemplate>
{
  static LITERAL = IdTemplateKeyword.LITERAL;

  /**
   * @deprecated in favor of COMPLEX_ID
   */
  static ANY = IdTemplateKeyword.ANY;

  static AnyComplexId = IdTemplateKeyword.AnyComplexId;

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

        let subid: ComplexIdLike;
        if ('id' in value) {
          subid = value.id;
        } else {
          subid = value;
        }

        return subid.forHuman;
      })
      .join(':');
  }

  /**
   * This function is safe and private because the exact type of
   * "valueByTemplateKey" cannot be derived within this class
   */
  private get safeValueByTemplateKey(): Record<
    string,
    string | ComplexIdLike | { id: ComplexIdLike }
  > {
    return this.valueByTemplateKey as Record<
      string,
      string | ComplexIdLike | { id: ComplexIdLike }
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

      let subid: ComplexIdLike;
      if ('id' in value) {
        subid = value.id;
      } else {
        subid = value;
      }

      return subid.getOutputValueByTemplateKeyPathList(nextPrefix);
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
export type UnsafeComplexId = ComplexIdInterface<NonEmptyTuple<any>>;

export type IdLike = SimpleId | ComplexIdLike | { id: ComplexIdLike };
