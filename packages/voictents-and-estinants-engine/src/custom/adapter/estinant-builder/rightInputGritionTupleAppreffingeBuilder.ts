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
import { OdeshinVoictent } from '../odeshinVoictent';
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
  buildRightInputHubblepupTupleAppreffingeBuilder,
  RightInputHubblepupTupleAppreffingeBuilderParent,
} from './rightInputHubblepupTupleAppreffingeBuilder';
import {
  buildRightInputOdeshinVoictentAppreffingeBuilder,
  RightInputOdeshinVoictentAppreffingeBuilderParent,
} from './rightInputOdeshinVoictentAppreffingeBuilder';
import {
  buildRightInputVoictentAppreffingeBuilder,
  RightInputVoictentAppreffingeBuilderParent,
} from './rightInputVoictentAppreffingeBuilder';
import { odeshinTupleToGritionTuple } from './tropoignantInputOutputModifier';

type RightAppreffinge<
  TLeftVicken extends LeftVicken,
  TRightInputVoictent extends OdeshinVoictent,
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
  TRightInputVoictent extends OdeshinVoictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
> = {
  [Index in keyof TVoictentTuple]: TVoictentTuple[Index]['hubblepupTuple'][number]['grition'];
};

type NextVickenTuple<
  TRightVickenTuple extends RightVickenTuple,
  TRightInputVoictent extends OdeshinVoictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
  TZorn extends Zorn,
> = AppendRightVickenToTuple<
  TRightVickenTuple,
  RightHubblepupVicken<TRightInputVoictent, TVoictentTuple, TZorn>
>;

type NextPinbetunfInputTuple<
  TPinbetunfInputTuple extends StralineTuple,
  TRightInputVoictent extends OdeshinVoictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
> = AppendInputToPinbetunfInputTuple<
  TPinbetunfInputTuple,
  RightInputTuple<TRightInputVoictent, TVoictentTuple>
>;

export type RightInputGritionTupleAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = <
  TRightInputVoictent extends OdeshinVoictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
  TZorn extends Zorn,
>(
  rightAppreffinge: RightAppreffinge<
    TLeftVicken,
    TRightInputVoictent,
    TVoictentTuple,
    TZorn
  >,
) => RightInputGritionTupleAppreffingeBuilderParent<
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
  RightInputHubblepupTupleAppreffingeBuilderParent<
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

export const buildRightInputGritionTupleAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
>(
  inputContext: InputContext,
): RightInputGritionTupleAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TPinbetunfInputTuple
> => {
  const buildRightInputGritionTupleAppreffinge: RightInputGritionTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  > = <
    TRightInputVoictent extends OdeshinVoictent,
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
        modifyTropoignantInput: odeshinTupleToGritionTuple,
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
      andFromGritionTuple: buildRightInputGritionTupleAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple,
        TNextPinbetunfInputTuple
      >(nextContext),
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

  return buildRightInputGritionTupleAppreffinge;
};

export type RightInputGritionTupleAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = {
  andFromGritionTuple: RightInputGritionTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  >;
};
