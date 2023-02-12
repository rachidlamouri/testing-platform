import { Estinant2 } from '../../core/estinant';
import { Tropoignant2 } from '../../core/tropoignant';
import { Struss } from '../../utilities/struss';
import { kodatar } from '../kodataring';
import { Plifal, PlifalToGeppUnion } from '../plifal';

export type Haqueler<TInputPlifal extends Plifal> = (
  input: TInputPlifal['hubblepup'],
) => void;

/**
 * A one to zero Tropoignant
 */
export type Wortinator<TInputPlifal extends Plifal> = Tropoignant2<
  [TInputPlifal['hubblepup']],
  []
>;

/**
 * A one to zero Estinant
 */
export type WortinatorHamletive<TInputPlifal extends Plifal> = Estinant2<
  [TInputPlifal],
  Struss
>;

export type WortinatorHamletiveBuilderInput<TInputPlifal extends Plifal> = {
  inputGepp: PlifalToGeppUnion<TInputPlifal>;
  haquel: Haqueler<TInputPlifal>;
};

export const buildWortinatorHamletive = <TInputPlifal extends Plifal>({
  inputGepp,
  haquel,
}: WortinatorHamletiveBuilderInput<TInputPlifal>): WortinatorHamletive<TInputPlifal> => {
  const tropoig: Wortinator<TInputPlifal> = (input) => {
    haquel(input);
    return [];
  };

  const hamletive: WortinatorHamletive<TInputPlifal> = {
    inputGeppTuple: [inputGepp],
    tropoig,
    croard: kodatar,
  };

  return hamletive;
};
