import {
  AppendRightVickenToTuple,
  LeftVicken,
  RightHubblepupVicken,
  RightVickenTuple,
  VickenVoictentTupleToZornTuple,
} from '../../../type-script-adapter/vicken';
import { VoictentToHubblepup } from '../../../type-script-adapter/voictent';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import { Zorn } from '../../../utilities/semantic-types/zorn';
import { Voictent } from '../voictent';
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

type NextVickenTuple<
  TRightVickenTuple extends RightVickenTuple,
  TRightInputVoictent extends Voictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
  TZorn extends Zorn,
> = AppendRightVickenToTuple<
  TRightVickenTuple,
  RightHubblepupVicken<TRightInputVoictent, TVoictentTuple, TZorn>
>;

export type RightInputHubblepupTupleAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
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
  NextVickenTuple<TRightVickenTuple, TRightInputVoictent, TVoictentTuple, TZorn>
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

export const buildRightInputHubblepupTupleAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
>(
  inputContext: InputContext,
): RightInputHubblepupTupleAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple
> => {
  const buildRightInputHubblepupTupleAppreffinge: RightInputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
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

    return {
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

  return buildRightInputHubblepupTupleAppreffinge;
};

export type RightInputHubblepupTupleAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = {
  andFromHubblepupTuple: RightInputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
  >;
};
