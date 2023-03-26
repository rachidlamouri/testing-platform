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
  AggregatedOutput,
  extendInputContext,
  InputContext,
  InputOutputContext,
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

type OutputVickenTuple = [];

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
    >,
    OutputVickenTuple
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<
      TRightVickenTuple,
      TRightInputVoictent,
      TVoictentTuple,
      TZorn
    >,
    OutputVickenTuple
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
    const nextInputContext = extendInputContext<RightInputHubblepupContext>({
      inputContext,
      nextRightInputContext: {
        gepp: rightAppreffinge.gepp,
        isWibiz: false,
        framate: rightAppreffinge.framate,
        croard: rightAppreffinge.croard,
        modifyTropoignantInput: hubblepupTupleToHubblepupTuple,
      },
    });

    const nextInputOutputContext: InputOutputContext = {
      inputContext: nextInputContext,
      outputContext: {
        aggregatePinbetunfOutput: () => {
          const aggregatedOutput: AggregatedOutput = {};
          return aggregatedOutput;
        },
        constituentResultNormalizerList: [],
      },
    };

    type TNextRightVickenTuple = AppendRightVickenToTuple<
      TRightVickenTuple,
      RightHubblepupVicken<TRightInputVoictent, TVoictentTuple, TZorn>
    >;

    return {
      andFromHubblepupTuple: buildRightInputHubblepupTupleAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple
      >(nextInputContext),
      andFromOdeshinVoictent: buildRightInputOdeshinVoictentAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple
      >(nextInputContext),
      andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple
      >(nextInputContext),

      toGrition: buildOutputGritionAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple
      >(nextInputContext),
      toHubblepup: buildOutputHubblepupAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple,
        OutputVickenTuple
      >(nextInputOutputContext),
      toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple,
        OutputVickenTuple
      >(nextInputOutputContext),
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
