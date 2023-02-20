import { Estinant2 } from '../../core/estinant';
import { GeppTuple } from '../../core/gepp';
import { QuirmTupleToGeppTuple } from '../../core/quirm';
import { Straline } from '../../core/straline';
import { Tropoignant2 } from '../../core/tropoignant';
import { Struss } from '../../utilities/struss';
import { kodatar } from '../kodataring';
import {
  QuirmOption,
  QuirmOptionTuple,
  QuirmOptionTupleToGeppOptionIntersection,
  QuirmOptionTupleTupleToQuirmTuple,
} from '../quirmOptionTuple';

type Predicate = (input: Straline) => boolean;

/**
 * A function to check if a Hubblepup can be recategorized
 */
export type Paraker<
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirm extends QuirmOption<TOutputQuirmOptionTuple>,
> = TOutputQuirm['hubblepup'] extends QuirmOption<TInputQuirmOptionTuple>['hubblepup']
  ? (
      input: QuirmOption<TInputQuirmOptionTuple>['hubblepup'],
    ) => input is TOutputQuirm['hubblepup']
  : (input: QuirmOption<TInputQuirmOptionTuple>['hubblepup']) => false;

type BaseKerz<TOutputGeppTuple extends GeppTuple, TParak extends Predicate> = {
  outputGeppTuple: TOutputGeppTuple;
  parak: TParak;
};

type NullKerz = BaseKerz<[], () => false>;

const NULL_KERZ: NullKerz = {
  outputGeppTuple: [],
  parak: () => false,
};

/**
 * A collection of a Paraker, and the Gepp tuple that will recategorize a Quirm, if the Quirm's Hubblepup passes the Paraker
 */
export type Kerz<
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirm extends QuirmOption<TOutputQuirmOptionTuple>,
> = TOutputQuirm['hubblepup'] extends QuirmOption<TInputQuirmOptionTuple>['hubblepup']
  ? BaseKerz<
      TOutputQuirm['geppTuple'],
      Paraker<TInputQuirmOptionTuple, TOutputQuirmOptionTuple, TOutputQuirm>
    >
  : NullKerz;

export type KerzTuple<
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
> = {
  [Index in keyof TOutputQuirmOptionTuple]: Kerz<
    TInputQuirmOptionTuple,
    TOutputQuirmOptionTuple,
    TOutputQuirmOptionTuple[Index]
  >;
};

/**
 * A one to one Tropoignant that is used to recategorize a Quirm via zero or more Gepps
 */
export type Mentursection<
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
> = Tropoignant2<
  [QuirmOption<TInputQuirmOptionTuple>],
  [QuirmOption<TOutputQuirmOptionTuple>]
>;

/**
 * A one to one Estinant that is used to recategorize a Quirm via zero or more Gepps
 */
export type MentursectionHamletive<
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
> = Estinant2<
  [QuirmOption<TInputQuirmOptionTuple>],
  QuirmOptionTupleTupleToQuirmTuple<[TOutputQuirmOptionTuple]>,
  Struss
>;

export type MentursectionHamletiveBuilderInput<
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
> = {
  inputGepp: QuirmOptionTupleToGeppOptionIntersection<TInputQuirmOptionTuple>;
  kerzTuple: KerzTuple<TInputQuirmOptionTuple, TOutputQuirmOptionTuple>;
};

export const buildMentursectionHamletive = <
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
>({
  inputGepp,
  kerzTuple,
}: MentursectionHamletiveBuilderInput<
  TInputQuirmOptionTuple,
  TOutputQuirmOptionTuple
>): MentursectionHamletive<TInputQuirmOptionTuple, TOutputQuirmOptionTuple> => {
  const tropoig: Mentursection<
    TInputQuirmOptionTuple,
    TOutputQuirmOptionTuple
  > = (input) => {
    const { outputGeppTuple } =
      kerzTuple.find((kerz) => kerz.parak(input.hubblepup)) ?? NULL_KERZ;

    const outputGeppTupleSet = new Set(outputGeppTuple);

    const sameGepps = input.geppTuple
      .filter((inputQuirmGepp) => outputGeppTupleSet.has(inputQuirmGepp))
      .map((inputQuirmGepp) => inputQuirmGepp.toString());
    if (sameGepps.length > 0) {
      const serializedSameGepps = sameGepps.join(', ');
      // TODO: update the Engine to not loop forever when an output Quirm has the same Gepp as its input
      throw Error(
        `Unhandled scenario. Output has same gepps as input: [${serializedSameGepps}]`,
      );
    }

    const outputQuirm: QuirmOption<TOutputQuirmOptionTuple> = {
      geppTuple: outputGeppTuple,
      hubblepup: input.hubblepup,
    };

    return [outputQuirm];
  };

  const hamletive: MentursectionHamletive<
    TInputQuirmOptionTuple,
    TOutputQuirmOptionTuple
  > = {
    inputGeppTuple: [inputGepp] as QuirmTupleToGeppTuple<
      [QuirmOption<TInputQuirmOptionTuple>]
    >,
    tropoig,
    croard: kodatar,
  };

  return hamletive;
};
