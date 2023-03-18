import { QuirmList } from '../../../type-script-adapter/quirm';
import { Voictent } from '../voictent';
import { AggregatedContext, LeftContext } from './estinantBuilderContext';
import {
  buildEstinantAssembler,
  EstinantAssembler,
  EstinantAssemblerParent,
} from './estinantAssembler';
import {
  buildOutputVoictentBuilder,
  OutputVoictentBuilderParent,
} from './outputVoictentBuilder';
import { Virm } from './virm';

type RightAppreffinge<TRightInputVoictent extends Voictent> = {
  gepp: TRightInputVoictent['gepp'];
};

type IDK<
  TInputTuple extends readonly unknown[],
  TRightInputVoictent extends Voictent,
> = (
  ...inputTuple: [...TInputTuple, TRightInputVoictent['hubblepupTuple']]
) => QuirmList;

export type RightInputVoictentBuilder<TInputTuple extends readonly unknown[]> =
  <TRightInputVoictent extends Voictent>(
    appreffinge: RightAppreffinge<TRightInputVoictent>,
    idk: (
      ...inputTuple: [...TInputTuple, TRightInputVoictent['hubblepupTuple']]
    ) => QuirmList,
  ) => EstinantAssemblerParent; // OutputVoictentBuilderParent<Virm<TInputVoictent, true>>;

export type RightInputVoictentBuilderParent<
  TInputTuple extends readonly unknown[],
> = {
  andFromVoictent: RightInputVoictentBuilder<TInputTuple>;
};

export const buildRightInputVoictentBuilder = <
  TLeftContext extends LeftContext,
>(
  leftContext: TLeftContext,
): RightInputVoictentBuilder<TInputTuple> => {
  const buildRightInputVoictent: RightInputVoictentBuilder<TInputTuple> = <
    TRightInputVoictent extends Voictent,
  >(
    { gepp }: RightAppreffinge<TRightInputVoictent>,
    idk: IDK<TInputTuple, TRightInputVoictent>,
  ) => {
    return {
      assemble:
        buildEstinantAssembler<
          [...TInputTuple, TRightInputVoictent['hubblepupTuple']]
        >(idk),
      // toVoictent: buildOutputVoictentBuilder({
      //   gepp,
      //   isWibiz: true,
      // }),
    };
  };

  return buildRightInputVoictent;
};
