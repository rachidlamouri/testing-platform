import { Croarder } from '../../core/croarder';
import { Estinant2 } from '../../core/estinant';
import { QuirmTuple, QuirmTupleToGeppTuple } from '../../core/quirm';
import { Tropoignant2 } from '../../core/tropoignant';
import { Zorn } from '../../core/zorn';

/**
 * A Croarder that can take any input Quirm
 *
 * @todo this should probably live somewhere else
 */
export type CortmumCroader<
  TInputQuirmTuple extends QuirmTuple,
  TZorn extends Zorn,
> = Croarder<TInputQuirmTuple[number], TZorn>;

/**
 * A many to many Tropoignant (ie a Tropoignant)
 */
export type Cortmum<
  TInputQuirmTuple extends QuirmTuple,
  TOutputQuirmTuple extends QuirmTuple,
> = Tropoignant2<TInputQuirmTuple, TOutputQuirmTuple>;

/**
 * A many to many Estinant (ie an Estinant)
 */
export type CortmumHamletive<
  TInputQuirmTuple extends QuirmTuple,
  TOutputQuirmTuple extends QuirmTuple,
  TZorn extends Zorn,
> = Estinant2<TInputQuirmTuple, TOutputQuirmTuple, TZorn>;

export type CortmumHamletiveBuilderInput<
  TInputQuirmTuple extends QuirmTuple,
  TOutputQuirmTuple extends QuirmTuple,
  TZorn extends Zorn,
> = {
  inputGeppTuple: QuirmTupleToGeppTuple<TInputQuirmTuple>;
  croard: CortmumCroader<TInputQuirmTuple, TZorn>;
  tropoig: Cortmum<TInputQuirmTuple, TOutputQuirmTuple>;
};

export const buildCortmumHamletive = <
  TInputQuirmTuple extends QuirmTuple,
  TOutputQuirmTuple extends QuirmTuple,
  TZorn extends Zorn,
>({
  inputGeppTuple,
  croard,
  tropoig,
}: CortmumHamletiveBuilderInput<
  TInputQuirmTuple,
  TOutputQuirmTuple,
  TZorn
>): CortmumHamletive<TInputQuirmTuple, TOutputQuirmTuple, TZorn> => {
  const hamletive: CortmumHamletive<
    TInputQuirmTuple,
    TOutputQuirmTuple,
    TZorn
  > = {
    inputGeppTuple,
    croard,
    tropoig,
  };

  return hamletive;
};
