import { Estinant2 } from '../../core/estinant';
import { GeppTuple } from '../../core/gepp';
import {
  Quirm,
  QuirmToGeppUnion,
  QuirmTupleToGeppTuple,
} from '../../core/quirm';
import { Straline } from '../../core/straline';
import { Tropoignant2 } from '../../core/tropoignant';
import { Struss } from '../../utilities/struss';
import { kodatar } from '../kodataring';
import { QuirmOption, QuirmOptionTuple } from '../quirmOptionTuple';

type Predicate = (input: Straline) => boolean;

/**
 * A function to check if a Hubblepup can be recategorized
 */
export type Paraker<
  TInputQuirm extends Quirm,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirm extends QuirmOption<TOutputQuirmOptionTuple>,
> = TOutputQuirm['hubblepup'] extends TInputQuirm['hubblepup']
  ? (input: TInputQuirm['hubblepup']) => input is TOutputQuirm['hubblepup']
  : (input: TInputQuirm['hubblepup']) => false;

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
  TInputQuirm extends Quirm,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirm extends QuirmOption<TOutputQuirmOptionTuple>,
> = TOutputQuirm['hubblepup'] extends TInputQuirm['hubblepup']
  ? BaseKerz<
      TOutputQuirm['geppTuple'],
      Paraker<TInputQuirm, TOutputQuirmOptionTuple, TOutputQuirm>
    >
  : NullKerz;

export type KerzTuple<
  TInputQuirm extends Quirm,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
> = {
  [Index in keyof TOutputQuirmOptionTuple]: Kerz<
    TInputQuirm,
    TOutputQuirmOptionTuple,
    TOutputQuirmOptionTuple[Index]
  >;
};

/**
 * A one to one Tropoignant that is used to recategorize a Quirm via zero or more Gepps
 */
export type Mentursection<
  TInputQuirm extends Quirm,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
> = Tropoignant2<[TInputQuirm], [QuirmOption<TOutputQuirmOptionTuple>]>;

/**
 * A one to one Estinant that is used to recategorize a Quirm via zero or more Gepps
 */
export type MentursectionHamletive<
  TInputQuirm extends Quirm,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
> = Estinant2<[TInputQuirm], [QuirmOption<TOutputQuirmOptionTuple>], Struss>;

export type MentursectionHamletiveBuilderInput<
  TInputQuirm extends Quirm,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
> = {
  inputGepp: QuirmToGeppUnion<TInputQuirm>;
  kerzTuple: KerzTuple<TInputQuirm, TOutputQuirmOptionTuple>;
};

export const buildMentursectionHamletive = <
  TInputQuirm extends Quirm,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
>({
  inputGepp,
  kerzTuple,
}: MentursectionHamletiveBuilderInput<
  TInputQuirm,
  TOutputQuirmOptionTuple
>): MentursectionHamletive<TInputQuirm, TOutputQuirmOptionTuple> => {
  const tropoig: Mentursection<TInputQuirm, TOutputQuirmOptionTuple> = (
    input,
  ) => {
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
    TInputQuirm,
    TOutputQuirmOptionTuple
  > = {
    inputGeppTuple: [inputGepp] as QuirmTupleToGeppTuple<[TInputQuirm]>,
    tropoig,
    croard: kodatar,
  };

  return hamletive;
};
