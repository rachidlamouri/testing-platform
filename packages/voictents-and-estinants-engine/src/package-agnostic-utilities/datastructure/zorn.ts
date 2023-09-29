import { TupleToUnion, UnionToIntersection, Simplify } from 'type-fest';
import { getTextDigest } from '../string/getTextDigest';
import { NonEmptyTuple, Tuple } from '../type/tuple';

/**
 * An arbitrary identifier.
 * @deprecated
 */
export type Zorn = unknown;

export type StringZorn = string;

export type ZornTuple = readonly Zorn[];

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type ZornTuple2 = readonly (string | UnsafeZorn2)[];

type TemplateKey<TTemplateKey extends string> = TTemplateKey;

type GenericTemplateKey = TemplateKey<string>;

/** The dot-delimited path of a key through one or more nested zorns */
type TemplateKeyPath = string;

type OutputValue = string;

export type OutputValueByTemplateKeyPath = Record<TemplateKeyPath, OutputValue>;

type Zorn2Like = {
  getOutputValueByTemplateKeyPathList(
    parentTemplateKeyPath: string,
  ): OutputValueByTemplateKeyPath[];
  forHuman: string;
};

// TODO: Replace "UnsafeInputValueByTemplateKey" with an object type like
// Record<string, string | zorn instance>, and debug the resulting errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnsafeInputValueByTemplateKey = any;

type Zorn2LikeConstructor<TZorn2Like extends Zorn2Like> = {
  new (inputValueByTemplateKey: UnsafeInputValueByTemplateKey): TZorn2Like;
};

type GenericZorn2LikeConstructor = Zorn2LikeConstructor<Zorn2Like>;

enum ZornTemplateKeyword {
  LITERAL = 'literal',
  ANY = 'any',
}

type Subzorn = ZornTemplateKeyword | GenericZorn2LikeConstructor;

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
  TTemplatekey extends GenericTemplateKey,
  TNonEmptySubzornTuple extends GenericNonEmptySubzornTuple,
> = readonly [TTemplatekey, ...TNonEmptySubzornTuple];

type Zorn2TemplateEntry<
  TTemplatekey extends GenericTemplateKey,
  TNonEmptySubzornTuple extends GenericNonEmptySubzornTuple,
> = TTemplatekey | SubzornTemplateEntry<TTemplatekey, TNonEmptySubzornTuple>;

type GenericZorn2TemplateEntry = Zorn2TemplateEntry<
  GenericTemplateKey,
  GenericNonEmptySubzornTuple
>;

export type GenericZorn2Template = NonEmptyTuple<GenericZorn2TemplateEntry>;

type InputValue<TSubzorn extends Subzorn> =
  TSubzorn extends ZornTemplateKeyword.LITERAL
    ? OutputValue
    : TSubzorn extends ZornTemplateKeyword.ANY
    ? Zorn2Like | { zorn: Zorn2Like }
    : TSubzorn extends Zorn2LikeConstructor<infer TZorn2Like>
    ? TZorn2Like | { zorn: TZorn2Like }
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

type InputValueByTemplateKey<TZorn2Template extends GenericZorn2Template> =
  Simplify<
    UnionToIntersection<
      TupleToUnion<{
        [TIndex in keyof TZorn2Template]: TZorn2Template[TIndex] extends TemplateKey<
          infer TTemplateKey
        >
          ? {
              [TKey in TTemplateKey]: InputValueFromSubzornTuple<
                [ZornTemplateKeyword]
              >;
            }
          : TZorn2Template[TIndex] extends SubzornTemplateEntry<
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

type TemplateKeyTuple<TTemplate extends GenericZorn2Template> = {
  [TIndex in keyof TTemplate]: TTemplate[TIndex] extends GenericTemplateKey
    ? TTemplate[TIndex]
    : TTemplate[TIndex] extends SubzornTemplateEntry<
        infer TTemplateKey,
        GenericNonEmptySubzornTuple
      >
    ? TTemplateKey
    : never;
};

type Zorn2Interface<TTemplate extends GenericZorn2Template> = {
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
export abstract class Zorn2<TTemplate extends GenericZorn2Template>
  implements Zorn2Interface<TTemplate>
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
    string | Zorn2Like | { zorn: Zorn2Like }
  > {
    return this.valueByTemplateKey as Record<
      string,
      string | Zorn2Like | { zorn: Zorn2Like }
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
export type UnsafeZorn2 = Zorn2Interface<NonEmptyTuple<any>>;