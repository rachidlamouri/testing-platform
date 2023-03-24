import {
  AppendRightVickenToTuple,
  LeftVicken,
  RightHubblepupVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { StralineTuple } from '../../../utilities/semantic-types/straline';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import {
  AppendInputToPinbetunfInputTuple,
  extendInputContext,
  InputContext,
  RightInputVoictentContext,
} from './estinantBuilderContext';
import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import { odeshinTupleToGritionTuple } from './tropoignantInputOutputModifier';
import { OdeshinVoictent } from '../odeshinVoictent';
import {
  buildRightInputVoictentAppreffingeBuilder,
  RightInputVoictentAppreffingeBuilderParent,
} from './rightInputVoictentAppreffingeBuilder';

type RightAppreffinge<TRightInputVoictent extends OdeshinVoictent> = {
  gepp: TRightInputVoictent['gepp'];
};

type NextVickenTuple<
  TRightVickenTuple extends RightVickenTuple,
  TRightInputVoictent extends OdeshinVoictent,
> = AppendRightVickenToTuple<
  TRightVickenTuple,
  RightHubblepupVicken<TRightInputVoictent>
>;

type NextPinbetunfInputTuple<
  TPinbetunfInputTuple extends StralineTuple,
  TRightInputVoictent extends OdeshinVoictent,
> = AppendInputToPinbetunfInputTuple<
  TPinbetunfInputTuple,
  // Note: don't use "OdeshinVoictentToGritionTuple" because it makes the final type harder to read :eyeroll:
  Tuple<TRightInputVoictent['hubblepupTuple'][number]['grition']>
>;

export type RightInputOdeshinVoictentAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = <TRightInputVoictent extends OdeshinVoictent>(
  rightAppreffinge: RightAppreffinge<TRightInputVoictent>,
) => RightInputOdeshinVoictentAppreffingeBuilderParent<
  TLeftVicken,
  NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
  NextPinbetunfInputTuple<TPinbetunfInputTuple, TRightInputVoictent>
> &
  RightInputVoictentAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
    NextPinbetunfInputTuple<TPinbetunfInputTuple, TRightInputVoictent>
  > &
  OutputHubblepupAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
    NextPinbetunfInputTuple<TPinbetunfInputTuple, TRightInputVoictent>
  >;

export const buildRightInputOdeshinVoictentAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
>(
  inputContext: InputContext,
): RightInputOdeshinVoictentAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TPinbetunfInputTuple
> => {
  const buildRightInputOdeshinVoictentAppreffinge: RightInputOdeshinVoictentAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  > = <TRightInputVoictent extends OdeshinVoictent>(
    rightAppreffinge: RightAppreffinge<TRightInputVoictent>,
  ) => {
    const nextContext = extendInputContext<RightInputVoictentContext>({
      inputContext,
      nextRightInputContext: {
        gepp: rightAppreffinge.gepp,
        isWibiz: true,
        modifyTropoignantInput: odeshinTupleToGritionTuple,
      },
    });

    return {
      andFromOdeshinVoictent: buildRightInputOdeshinVoictentAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
        NextPinbetunfInputTuple<TPinbetunfInputTuple, TRightInputVoictent>
      >(nextContext),
      andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
        NextPinbetunfInputTuple<TPinbetunfInputTuple, TRightInputVoictent>
      >(nextContext),

      toHubblepup: buildOutputHubblepupAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
        NextPinbetunfInputTuple<TPinbetunfInputTuple, TRightInputVoictent>
      >(nextContext),
    };
  };

  return buildRightInputOdeshinVoictentAppreffinge;
};

export type RightInputOdeshinVoictentAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = {
  andFromOdeshinVoictent: RightInputOdeshinVoictentAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  >;
};
