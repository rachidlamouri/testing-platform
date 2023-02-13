import { Estinant2 } from '../../core/estinant';
import { Quirm, QuirmToGeppUnion } from '../../core/quirm';
import { Tropoignant2 } from '../../core/tropoignant';
import { Struss } from '../../utilities/struss';
import { kodatar } from '../kodataring';

export type Haqueler<TInputQuirm extends Quirm> = (input: TInputQuirm) => void;

/**
 * A one to zero Tropoignant
 */
export type Wortinator<TInputQuirm extends Quirm> = Tropoignant2<
  [TInputQuirm],
  []
>;

/**
 * A one to zero Estinant
 */
export type WortinatorHamletive<TInputQuirm extends Quirm> = Estinant2<
  [TInputQuirm],
  Struss
>;

export type WortinatorHamletiveBuilderInput<TInputQuirm extends Quirm> = {
  inputGepp: QuirmToGeppUnion<TInputQuirm>;
  haquel: Haqueler<TInputQuirm>;
};

export const buildWortinatorHamletive = <TInputQuirm extends Quirm>({
  inputGepp,
  haquel,
}: WortinatorHamletiveBuilderInput<TInputQuirm>): WortinatorHamletive<TInputQuirm> => {
  const tropoig: Wortinator<TInputQuirm> = (input) => {
    haquel(input);
    return [];
  };

  const hamletive: WortinatorHamletive<TInputQuirm> = {
    inputGeppTuple: [inputGepp],
    tropoig,
    croard: kodatar,
  };

  return hamletive;
};
