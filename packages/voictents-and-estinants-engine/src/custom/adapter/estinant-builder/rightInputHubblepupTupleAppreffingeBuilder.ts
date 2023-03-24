import {
  AppendRightVickenToTuple,
  LeftVicken,
  RightHubblepupVicken,
  RightVickenTuple,
  VickenVoictentTupleToZornTuple,
} from '../../../type-script-adapter/vicken';
import { VoictentToHubblepup } from '../../../type-script-adapter/voictent';
import { StralineTuple } from '../../../utilities/semantic-types/straline';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import { Zorn } from '../../../utilities/semantic-types/zorn';
import { Voictent } from '../voictent';
import {
  AppendInputToPinbetunfInputTuple,
  extendInputContext,
  InputContext,
  RightInputHubblepupContext,
} from './estinantBuilderContext';
import {
  buildOutputGritionAppreffingeBuilder,
  OutputGritionAppreffingeBuilderParent,
} from './outputGritionAppreffingeBuilder';
import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import {
  buildOutputHubblepupTupleAppreffingeBuilder,
  OutputHubblepupTupleAppreffingeBuilderParent,
} from './outputHubblepupTupleAppreffingeBuilder';
import {
  buildRightInputOdeshinVoictentAppreffingeBuilder,
  RightInputOdeshinVoictentAppreffingeBuilderParent,
} from './rightInputOdeshinVoictentAppreffingeBuilder';
import {
  buildRightInputVoictentAppreffingeBuilder,
  RightInputVoictentAppreffingeBuilderParent,
} from './rightInputVoictentAppreffingeBuilder';
import { hubblepupTupleToHubblepupTuple } from './tropoignantInputOutputModifier';

type RightAppreffinge<
  TLeftVicken extends LeftVicken,
  TRightInputVoictent extends Voictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
  TZorn extends Zorn,
> = {
  gepp: TRightInputVoictent['gepp'];
  framate: (
    leftInput: TLeftVicken['tropoignantInput'],
  ) => VickenVoictentTupleToZornTuple<TVoictentTuple, TZorn>;
  croard: (rightInput: VoictentToHubblepup<TRightInputVoictent>) => TZorn;
};

type RightInputTuple<
  TRightInputVoictent extends Voictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
> = {
  [Index in keyof TVoictentTuple]: TVoictentTuple[Index]['hubblepupTuple'][number];
};

type NextVickenTuple<
  TRightVickenTuple extends RightVickenTuple,
  TRightInputVoictent extends Voictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
  TZorn extends Zorn,
> = AppendRightVickenToTuple<
  TRightVickenTuple,
  RightHubblepupVicken<TRightInputVoictent, TVoictentTuple, TZorn>
>;

type NextPinbetunfInputTuple<
  TPinbetunfInputTuple extends StralineTuple,
  TRightInputVoictent extends Voictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
> = AppendInputToPinbetunfInputTuple<
  TPinbetunfInputTuple,
  RightInputTuple<TRightInputVoictent, TVoictentTuple>
>;

export type RightInputHubblepupTupleAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = <
  TRightInputVoictent extends Voictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
  TZorn extends Zorn,
>(
  rightAppreffinge: RightAppreffinge<
    TLeftVicken,
    TRightInputVoictent,
    TVoictentTuple,
    TZorn
  >,
) => RightInputHubblepupTupleAppreffingeBuilderParent<
  TLeftVicken,
  NextVickenTuple<
    TRightVickenTuple,
    TRightInputVoictent,
    TVoictentTuple,
    TZorn
  >,
  NextPinbetunfInputTuple<
    TPinbetunfInputTuple,
    TRightInputVoictent,
    TVoictentTuple
  >
> &
  RightInputOdeshinVoictentAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<
      TRightVickenTuple,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >,
    NextPinbetunfInputTuple<
      TPinbetunfInputTuple,
      TRightInputVoictent,
      TVoictentTuple
    >
  > &
  RightInputVoictentAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<
      TRightVickenTuple,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >,
    NextPinbetunfInputTuple<
      TPinbetunfInputTuple,
      TRightInputVoictent,
      TVoictentTuple
    >
  > &
  OutputGritionAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<
      TRightVickenTuple,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >,
    NextPinbetunfInputTuple<
      TPinbetunfInputTuple,
      TRightInputVoictent,
      TVoictentTuple
    >
  > &
  OutputHubblepupAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<
      TRightVickenTuple,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >,
    NextPinbetunfInputTuple<
      TPinbetunfInputTuple,
      TRightInputVoictent,
      TVoictentTuple
    >
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<
      TRightVickenTuple,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >,
    NextPinbetunfInputTuple<
      TPinbetunfInputTuple,
      TRightInputVoictent,
      TVoictentTuple
    >
  >;

export const buildRightInputHubblepupTupleAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
>(
  inputContext: InputContext,
): RightInputHubblepupTupleAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TPinbetunfInputTuple
> => {
  const buildRightInputHubblepupTupleAppreffinge: RightInputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  > = <
    TRightInputVoictent extends Voictent,
    TVoictentTuple extends Tuple<TRightInputVoictent>,
    TZorn extends Zorn,
  >(
    rightAppreffinge: RightAppreffinge<
      TLeftVicken,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >,
  ) => {
    const nextContext = extendInputContext<RightInputHubblepupContext>({
      inputContext,
      nextRightInputContext: {
        gepp: rightAppreffinge.gepp,
        isWibiz: false,
        framate: rightAppreffinge.framate,
        croard: rightAppreffinge.croard,
        modifyTropoignantInput: hubblepupTupleToHubblepupTuple,
      },
    });

    type TNextRightVickenTuple = AppendRightVickenToTuple<
      TRightVickenTuple,
      RightHubblepupVicken<TRightInputVoictent, TVoictentTuple, TZorn>
    >;

    type TNextPinbetunfInputTuple = AppendInputToPinbetunfInputTuple<
      TPinbetunfInputTuple,
      RightInputTuple<TRightInputVoictent, TVoictentTuple>
    >;

    return {
      andFromHubblepupTuple: buildRightInputHubblepupTupleAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple,
        TNextPinbetunfInputTuple
      >(nextContext),
      andFromOdeshinVoictent: buildRightInputOdeshinVoictentAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple,
        TNextPinbetunfInputTuple
      >(nextContext),
      andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple,
        TNextPinbetunfInputTuple
      >(nextContext),

      toGrition: buildOutputGritionAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple,
        TNextPinbetunfInputTuple
      >(nextContext),
      toHubblepup: buildOutputHubblepupAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple,
        TNextPinbetunfInputTuple
      >(nextContext),
      toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple,
        TNextPinbetunfInputTuple
      >(nextContext),
    };
  };

  return buildRightInputHubblepupTupleAppreffinge;
};

export type RightInputHubblepupTupleAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = {
  andFromHubblepupTuple: RightInputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  >;
};
