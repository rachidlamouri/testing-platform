import { TupleToUnion, UnionToIntersection, Simplify } from 'type-fest';
import { getTextDigest } from '../getTextDigest';

/**
 * An arbitrary identifier.
 */
export type Zorn = unknown;

export type StringZorn = string;

export type ZornTuple = readonly Zorn[];

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type ZornTuple2 = readonly (string | UnsafeZorn2)[];

// eslint-disable-next-line @typescript-eslint/no-use-before-define
// type UnsafeZorn2 = Zorn2<Zorn2Template>;

type TemplateKey = string;

/** The dot-delimited path of a key through one or more nested zorns */
type TemplateKeyPath = string;

type OutputValue = string;

type OutputValueByTemplateKeyPath = Record<TemplateKeyPath, OutputValue>;

type Zorn2Like = {
  getOutputValueByTemplateKeyPathList(
    parentTemplateKeyPath: string,
  ): OutputValueByTemplateKeyPath[];
  forHuman: string;
};

// Should be: Record<string, InputValue>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnsafeInputValueByTemplateKey = any;

type Zorn2LikeConstructor = {
  new (inputValueByTemplateKey: UnsafeInputValueByTemplateKey): Zorn2Like;
};

type SubzornTuple = readonly [TemplateKey, Zorn2LikeConstructor];

type InputValue = TemplateKey | SubzornTuple;

export type GenericZorn2Template = readonly InputValue[];

type InputValueByTemplateKey<TTemplate extends GenericZorn2Template> = Simplify<
  UnionToIntersection<
    TupleToUnion<{
      [TIndex in keyof TTemplate]: TTemplate[TIndex] extends string
        ? { [TKey in TTemplate[TIndex]]: string }
        : // eslint-disable-next-line @typescript-eslint/no-use-before-define
        TTemplate[TIndex] extends readonly [
            string,
            {
              new (
                ...parameterList: infer TParameterList
              ): infer TZorn2LikeConstructor;
            },
          ]
        ? { [TKey in TTemplate[TIndex][0]]: TZorn2LikeConstructor }
        : never;
    }>
  >
>;

type TemplateKeyTuple<TTemplate extends GenericZorn2Template> = {
  [TIndex in keyof TTemplate]: TTemplate[TIndex] extends TemplateKey
    ? TTemplate[TIndex]
    : TTemplate[TIndex] extends SubzornTuple
    ? TTemplate[TIndex][0]
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
  private memoizedValueByTemplateKeyPathList:
    | OutputValueByTemplateKeyPath[]
    | null = null;

  private memoizedValueByTemplateKeyPath: OutputValueByTemplateKeyPath | null =
    null;

  private memoizedTemplate: string[] | null = null;

  private memoizedHumanReadableSerialization: string | null = null;

  constructor(
    public readonly valueByTemplateKey: InputValueByTemplateKey<TTemplate>,
  ) {}

  /**
   * This function is safe and private because the exact type of
   * "valueByTemplateKey" cannot be derived within this class
   */
  private get safeValueByTemplateKey(): Record<string, string | Zorn2Like> {
    return this.valueByTemplateKey as Record<string, string | Zorn2Like>;
  }

  abstract get rawTemplate(): TTemplate;

  getOutputValueByTemplateKeyPathList(
    prefix: string,
  ): OutputValueByTemplateKeyPath[] {
    if (this.memoizedValueByTemplateKeyPathList === null) {
      this.memoizedValueByTemplateKeyPathList = this.template.flatMap(
        (key: string) => {
          const nextPrefix = prefix === '' ? key : `${prefix}.${key}`;

          const value = this.safeValueByTemplateKey[key];

          if (typeof value === 'string') {
            return [{ [nextPrefix]: value }];
          }
          return value.getOutputValueByTemplateKeyPathList(nextPrefix);
        },
      );
    }

    return this.memoizedValueByTemplateKeyPathList;
  }

  get templateValueByKeyPath(): OutputValueByTemplateKeyPath {
    if (this.memoizedValueByTemplateKeyPath === null) {
      this.memoizedValueByTemplateKeyPath = Object.assign(
        {},
        ...this.getOutputValueByTemplateKeyPathList(''),
      ) as OutputValueByTemplateKeyPath;
    }

    return this.memoizedValueByTemplateKeyPath;
  }

  get template(): TemplateKeyTuple<TTemplate> {
    if (this.memoizedTemplate === null) {
      this.memoizedTemplate = this.rawTemplate.map((value) => {
        if (typeof value === 'string') {
          return value;
        }

        return value[0];
      });
    }

    return this.memoizedTemplate as TemplateKeyTuple<TTemplate>;
  }

  get forHuman(): string {
    if (this.memoizedHumanReadableSerialization === null) {
      this.memoizedHumanReadableSerialization = this.template
        .map((key: string) => {
          const value = this.safeValueByTemplateKey[key];

          if (typeof value === 'string') {
            return value;
          }

          return value.forHuman;
        })
        .join(':');
    }

    return this.memoizedHumanReadableSerialization;
  }

  get forMachine(): string {
    return getTextDigest(this.forHuman);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnsafeZorn2 = Zorn2Interface<readonly any[]>;
