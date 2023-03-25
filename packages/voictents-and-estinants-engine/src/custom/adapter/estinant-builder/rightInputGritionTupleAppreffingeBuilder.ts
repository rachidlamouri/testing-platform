import {
  AppendRightVickenToTuple,
  LeftVicken,
  RightGritionVicken,
  RightVickenTuple,
  VickenVoictentTupleToZornTuple,
} from '../../../type-script-adapter/vicken';
import { VoictentToHubblepup } from '../../../type-script-adapter/voictent';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import { Zorn } from '../../../utilities/semantic-types/zorn';
import { OdeshinVoictent } from '../odeshinVoictent';
import {
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

type NextVickenTuple<
  TRightVickenTuple extends RightVickenTuple,
  TRightInputVoictent extends OdeshinVoictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
  TZorn extends Zorn,
> = AppendRightVickenToTuple<
  TRightVickenTuple,
  RightGritionVicken<TRightInputVoictent, TVoictentTuple, TZorn>
>;

export type RightInputGritionTupleAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
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
  NextVickenTuple<TRightVickenTuple, TRightInputVoictent, TVoictentTuple, TZorn>
> &
  RightInputHubblepupTupleAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<
      TRightVickenTuple,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >
  > &
  RightInputOdeshinVoictentAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<
      TRightVickenTuple,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >
  > &
  RightInputVoictentAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<
      TRightVickenTuple,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >
  > &
  OutputGritionAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<
      TRightVickenTuple,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >
  > &
  OutputHubblepupAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<
      TRightVickenTuple,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<
      TRightVickenTuple,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >
  >;

export const buildRightInputGritionTupleAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
>(
  inputContext: InputContext,
): RightInputGritionTupleAppreffingeBuilder<TLeftVicken, TRightVickenTuple> => {
  const buildRightInputGritionTupleAppreffinge: RightInputGritionTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
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
      RightGritionVicken<TRightInputVoictent, TVoictentTuple, TZorn>
    >;

    return {
      andFromGritionTuple: buildRightInputGritionTupleAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple
      >(nextContext),
      andFromHubblepupTuple: buildRightInputHubblepupTupleAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple
      >(nextContext),
      andFromOdeshinVoictent: buildRightInputOdeshinVoictentAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple
      >(nextContext),
      andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple
      >(nextContext),

      toGrition: buildOutputGritionAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple
      >(nextContext),
      toHubblepup: buildOutputHubblepupAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple
      >(nextContext),
      toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple
      >(nextContext),
    };
  };

  return buildRightInputGritionTupleAppreffinge;
};

export type RightInputGritionTupleAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = {
  andFromGritionTuple: RightInputGritionTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
  >;
};
