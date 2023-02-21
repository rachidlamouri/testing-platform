import { Estinant2 } from '../../core/estinant';
import {
  Quirm,
  QuirmToGeppUnion,
  QuirmTupleToGeppTuple,
} from '../../core/quirm';
import { Tropoignant2 } from '../../core/tropoignant';
import { Struss } from '../../utilities/struss';
import { kodatar } from '../kodataring';

/**
 * Like an Onama, but it's return value is abstracted from the Engine's concerns
 */
export type Ankeler<TInputQuirm extends Quirm, TOutputQuirm extends Quirm> = (
  input: TInputQuirm,
) => TOutputQuirm;

/**
 * A one to one Tropoignant
 */
export type Onama<
  TInputQuirm extends Quirm,
  TOutputQuirm extends Quirm,
> = Tropoignant2<[TInputQuirm], [TOutputQuirm]>;

/**
 * A one to one Estinant
 */
export type OnamaHamletive<
  TInputQuirm extends Quirm,
  TOutputQuirm extends Quirm,
> = Estinant2<[TInputQuirm], [TOutputQuirm], Struss>;

export type OnamaHamletiveBuilderInput<
  TInputQuirm extends Quirm,
  TOutputQuirm extends Quirm,
> = {
  inputGepp: QuirmToGeppUnion<TInputQuirm>;
  ankel: Ankeler<TInputQuirm, TOutputQuirm>;
};

export const buildOnamaHamletive = <
  TInputQuirm extends Quirm,
  TOutputQuirm extends Quirm,
>({
  inputGepp,
  ankel,
}: OnamaHamletiveBuilderInput<TInputQuirm, TOutputQuirm>): OnamaHamletive<
  TInputQuirm,
  TOutputQuirm
> => {
  const tropoig: Onama<TInputQuirm, TOutputQuirm> = (input) => {
    const output = ankel(input);
    return [output];
  };

  const hamletive: OnamaHamletive<TInputQuirm, TOutputQuirm> = {
    inputGeppTuple: [inputGepp] as QuirmTupleToGeppTuple<[TInputQuirm]>,
    tropoig,
    croard: kodatar,
  };

  return hamletive;
};
