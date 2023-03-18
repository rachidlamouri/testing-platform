import { Vition } from '../../../type-script-adapter/vition';
import { StralineTuple } from '../../../utilities/semantic-types/straline';
import { Voictent } from '../voictent';
import { LeftContext, RightContextTuple } from './estinantBuilderContext';
import {
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';
import { buildHubblepupToQuirmList } from './tropoignantInputOutputModifier';

export type OutputHubblepupAppreffingeBuilder<
  TInputVition extends Vition,
  TPinbeInputTuple extends StralineTuple,
> = <TOutputVoictent extends Voictent>(
  gepp: TOutputVoictent['gepp'],
  // pinbe: Pinbetunf<[TInputVoictent['hubblepupTuple'][number]], unknown>,
) => PinbetunfBuilderParent<
  TInputVition,
  [TOutputVoictent],
  TPinbeInputTuple,
  TOutputVoictent['hubblepupTuple'][number]
>;
//   [TInputVoictent['hubblepupTuple'][number]]
// > &
// OutputVoictentBuilderParent<Virm<TInputVoictent, false>>;

export const buildOutputHubblepupAppreffingeBuilder = <
  TInputVition extends Vition,
  TPinbeInputTuple extends StralineTuple,
>(
  leftContext: LeftContext,
  rightContextTuple: RightContextTuple,
): OutputHubblepupAppreffingeBuilder<TInputVition, TPinbeInputTuple> => {
  const buildoutputHubblepupAppreffinge: OutputHubblepupAppreffingeBuilder<
    TInputVition,
    TPinbeInputTuple
  > = <TOutputVoictent extends Voictent>(
    gepp: TOutputVoictent['gepp'],
    // pinbe: Pinbetunf<[TInputVoictent['hubblepupTuple'][number]], unknown>,
  ) => {
    return {
      // andFromVoictent: buildRightInputVoictentBuilder(),
      // toVoictent: buildOutputVoictentBuilder({
      //   gepp,
      //   isWibiz: false,
      // }),
      // assemble: buildEstinantAssembler<Vition<TInputVoictent, []>, []>(
      //   {
      //     gepp,
      //     isWibiz: false,
      //     modifyTropoignantInput: hubblepupToHubblepup,
      //   },
      //   [],
      //   {
      //     normalizePinbetunfOutput: () => [],
      //   },
      //   pinbe,
      // ),
      onPinbe: buildPinbetunfBuilder<
        TInputVition,
        [TOutputVoictent],
        TPinbeInputTuple,
        TOutputVoictent['hubblepupTuple'][number]
      >(leftContext, rightContextTuple, {
        gepp,
        normalizePinbetunfOutput: buildHubblepupToQuirmList(gepp),
      }),
    };
  };

  return buildoutputHubblepupAppreffinge;
};

export type OutputHubblepupAppreffingeBuilderParent<
  TInputVition extends Vition,
  TPinbeInputTuple extends StralineTuple,
> = {
  toHubblepup: OutputHubblepupAppreffingeBuilder<
    TInputVition,
    TPinbeInputTuple
  >;
};
