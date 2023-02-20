import { Estinant2 } from '../../core/estinant';
import { Quirm, QuirmTupleToGeppTuple } from '../../core/quirm';
import { Tropoignant2 } from '../../core/tropoignant';
import { Struss } from '../../utilities/struss';
import { kodatar } from '../kodataring';
import {
  QuirmOption,
  QuirmOptionTuple,
  QuirmOptionTupleToGeppOptionIntersection,
} from '../quirmOptionTuple';

/**
 * Like an Onama, but it's return value is abstracted from the Engine's concerns
 */
export type Ankeler<
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirm extends Quirm,
> = (input: QuirmOption<TInputQuirmOptionTuple>) => TOutputQuirm;

export type Ankeler2<
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
> = Ankeler<TInputQuirmOptionTuple, QuirmOption<TOutputQuirmOptionTuple>>;

/**
 * A one to one Tropoignant
 */
export type Onama<
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirm extends Quirm,
> = Tropoignant2<[QuirmOption<TInputQuirmOptionTuple>], [TOutputQuirm]>;

/**
 * A one to one Estinant
 */
export type OnamaHamletive<TInputQuirmOptionTuple extends QuirmOptionTuple> =
  Estinant2<[QuirmOption<TInputQuirmOptionTuple>], Struss>;

export type OnamaHamletiveBuilderInput<
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirm extends Quirm,
> = {
  inputGepp: QuirmOptionTupleToGeppOptionIntersection<TInputQuirmOptionTuple>;
  ankel: Ankeler<TInputQuirmOptionTuple, TOutputQuirm>;
};

export const buildOnamaHamletive = <
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirm extends Quirm,
>({
  inputGepp,
  ankel,
}: OnamaHamletiveBuilderInput<
  TInputQuirmOptionTuple,
  TOutputQuirm
>): OnamaHamletive<TInputQuirmOptionTuple> => {
  const tropoig: Onama<TInputQuirmOptionTuple, TOutputQuirm> = (input) => {
    const output = ankel(input);
    return [output];
  };

  const hamletive: OnamaHamletive<TInputQuirmOptionTuple> = {
    inputGeppTuple: [inputGepp] as QuirmTupleToGeppTuple<
      [QuirmOption<TInputQuirmOptionTuple>]
    >,
    tropoig,
    croard: kodatar,
  };

  return hamletive;
};

export const buildOnamaHamletive2 = <
  TInputQuirmOptionTuple extends QuirmOptionTuple,
  TOutputQuirmOptionTuple extends QuirmOptionTuple,
>(
  parameter: OnamaHamletiveBuilderInput<
    TInputQuirmOptionTuple,
    QuirmOption<TOutputQuirmOptionTuple>
  >,
): OnamaHamletive<TInputQuirmOptionTuple> => buildOnamaHamletive(parameter);
