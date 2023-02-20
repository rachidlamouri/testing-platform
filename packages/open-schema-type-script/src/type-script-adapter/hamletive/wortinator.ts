import { Estinant2 } from '../../core/estinant';
import { QuirmTupleToGeppTuple } from '../../core/quirm';
import { Tropoignant2 } from '../../core/tropoignant';
import { Struss } from '../../utilities/struss';
import { kodatar } from '../kodataring';
import {
  QuirmOption,
  QuirmOptionTuple,
  QuirmOptionTupleToGeppOptionIntersection,
} from '../quirmOptionTuple';

/**
 * Like a Wortinator, but it's return value is abstracted from the Engine's concerns
 */
export type Haqueler<TInputQuirmOptionTuple extends QuirmOptionTuple> = (
  input: QuirmOption<TInputQuirmOptionTuple>,
) => void;

/**
 * A one to zero Tropoignant
 */
export type Wortinator<TInputQuirmOptionTuple extends QuirmOptionTuple> =
  Tropoignant2<[QuirmOption<TInputQuirmOptionTuple>], []>;

/**
 * A one to zero Estinant
 */
export type WortinatorHamletive<
  TInputQuirmOptionTuple extends QuirmOptionTuple,
> = Estinant2<[QuirmOption<TInputQuirmOptionTuple>], [], Struss>;

export type WortinatorHamletiveBuilderInput<
  TInputQuirmOptionTuple extends QuirmOptionTuple,
> = {
  inputGepp: QuirmOptionTupleToGeppOptionIntersection<TInputQuirmOptionTuple>;
  haquel: Haqueler<TInputQuirmOptionTuple>;
};

export const buildWortinatorHamletive = <
  TInputQuirmOptionTuple extends QuirmOptionTuple,
>({
  inputGepp,
  haquel,
}: WortinatorHamletiveBuilderInput<TInputQuirmOptionTuple>): WortinatorHamletive<TInputQuirmOptionTuple> => {
  const tropoig: Wortinator<TInputQuirmOptionTuple> = (input) => {
    haquel(input);
    return [];
  };

  const hamletive: WortinatorHamletive<TInputQuirmOptionTuple> = {
    inputGeppTuple: [inputGepp] as QuirmTupleToGeppTuple<
      [QuirmOption<TInputQuirmOptionTuple>]
    >,
    tropoig,
    croard: kodatar,
  };

  return hamletive;
};
