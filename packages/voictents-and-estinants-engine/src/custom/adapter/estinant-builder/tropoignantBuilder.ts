import { Tropoignant } from '../../../type-script-adapter/tropoignant';
import { Vition } from '../../../type-script-adapter/vition';
import { Voictent } from '../voictent';
import {
  buildEstinantAssembler,
  EstinantAssemblerParent,
} from './estinantAssembler';
import { LeftAppreffinge, Virm } from './virm';

type X<
  T extends Virm,
  TOutputVoictent extends Voictent,
> = T['isWibiz'] extends true
  ? (
      x: T['voictent']['hubblepupTuple'],
    ) => TOutputVoictent['hubblepupTuple'][number]
  : (
      x: T['voictent']['hubblepupTuple'][number],
    ) => TOutputVoictent['hubblepupTuple'][number];

export type TropoignantBuilder<
  TInputVoictent extends Voictent,
  TOutputVoictent extends Voictent,
> = (
  tropoig: Tropoignant<Vition<TInputVoictent, []>, TOutputVoictent>,
) => EstinantAssemblerParent<TVirm['voictent'], TOutputVoictent>;

export type PinbetunfBuilderParent<
  TVirm extends Virm,
  TOutputVoictent extends Voictent,
> = {
  onPinbe: PinbetunfBuilder<TVirm, TOutputVoictent>;
};

export const buildPinbetunfBuilder = <
  TVirm extends Virm,
  TOutputVoictent extends Voictent,
>(
  appreffinge: LeftAppreffinge<TVirm>,
): PinbetunfBuilder<TVirm, TOutputVoictent> => {
  const buildPinbetunf: PinbetunfBuilder<TVirm, TOutputVoictent> = (
    pinbe: X<TVirm, TOutputVoictent>,
  ) => {
    return {
      assemble: buildEstinantAssembler(appreffinge, pinbe),
    };
  };

  return buildPinbetunf;
};
