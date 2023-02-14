import { Croarder } from '../../core/croarder';
import { Estinant2 } from '../../core/estinant';
import { QuirmTupleToGeppTuple } from '../../core/quirm';
import { Tropoignant2 } from '../../core/tropoignant';
import { Zorn } from '../../core/zorn';
import {
  QuirmOption,
  QuirmOptionTupleTuple,
  QuirmOptionTupleTupleToGeppOptionIntersectionTuple,
  QuirmOptionTupleTupleToQuirmTuple,
} from '../quirmOptionTuple';

/**
 * A Croarder that can take any input Quirm
 *
 * @todo this should probably live somewhere else
 */
export type CortmumCroader<
  TInputQuirmOptionTupleTuple extends QuirmOptionTupleTuple,
  TZorn extends Zorn,
> = Croarder<
  QuirmOption<QuirmOptionTupleTupleToQuirmTuple<TInputQuirmOptionTupleTuple>>,
  TZorn
>;

/**
 * A many to many Tropoignant (ie a Tropoignant)
 */
export type Cortmum<
  TInputQuirmOptionTupleTuple extends QuirmOptionTupleTuple,
  TOutputQuirmOptionTupleTuple extends QuirmOptionTupleTuple,
> = Tropoignant2<
  QuirmOptionTupleTupleToQuirmTuple<TInputQuirmOptionTupleTuple>,
  QuirmOptionTupleTupleToQuirmTuple<TOutputQuirmOptionTupleTuple>
>;

/**
 * A many to many Estinant (ie an Estinant)
 */
export type CortmumHamletive<
  TInputQuirmOptionTupleTuple extends QuirmOptionTupleTuple,
  TZorn extends Zorn,
> = Estinant2<
  QuirmOptionTupleTupleToQuirmTuple<TInputQuirmOptionTupleTuple>,
  TZorn
>;

export type CortmumHamletiveBuilderInput<
  TInputQuirmOptionTupleTuple extends QuirmOptionTupleTuple,
  TOutputQuirmOptionTupleTuple extends QuirmOptionTupleTuple,
  TZorn extends Zorn,
> = {
  inputGeppTuple: QuirmOptionTupleTupleToGeppOptionIntersectionTuple<TInputQuirmOptionTupleTuple>;
  croard: CortmumCroader<TInputQuirmOptionTupleTuple, TZorn>;
  tropoig: Cortmum<TInputQuirmOptionTupleTuple, TOutputQuirmOptionTupleTuple>;
};

export const buildCortmumHamletive = <
  TInputQuirmOptionTupleTuple extends QuirmOptionTupleTuple,
  TOutputQuirmOptionTupleTuple extends QuirmOptionTupleTuple,
  TZorn extends Zorn,
>({
  inputGeppTuple,
  croard,
  tropoig,
}: CortmumHamletiveBuilderInput<
  TInputQuirmOptionTupleTuple,
  TOutputQuirmOptionTupleTuple,
  TZorn
>): CortmumHamletive<TInputQuirmOptionTupleTuple, TZorn> => {
  const hamletive: CortmumHamletive<TInputQuirmOptionTupleTuple, TZorn> = {
    inputGeppTuple: inputGeppTuple as QuirmTupleToGeppTuple<
      QuirmOptionTupleTupleToQuirmTuple<TInputQuirmOptionTupleTuple>
    >,
    croard,
    tropoig,
  };

  return hamletive;
};
