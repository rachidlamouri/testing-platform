import {
  AppendRightVickenToTuple,
  LeftVicken,
  RightGritionVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { VoictentToHubblepup } from '../../../type-script-adapter/voictent';
import { ZornTuple } from '../../../utilities/semantic-types/zorn';
import { OdeshinVoictent } from '../odeshinVoictent';
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
  TZornTuple extends ZornTuple,
> = {
  gepp: TRightInputVoictent['gepp'];
  framate: (leftInput: TLeftVicken['tropoignantInput']) => TZornTuple;
  croard: (
    rightInput: VoictentToHubblepup<TRightInputVoictent>,
  ) => TZornTuple[number];
};

type NextVickenTuple<
  TRightVickenTuple extends RightVickenTuple,
  TRightInputVoictent extends OdeshinVoictent,
  TZornTuple extends ZornTuple,
> = AppendRightVickenToTuple<
  TRightVickenTuple,
  RightGritionVicken<TRightInputVoictent, TZornTuple>
>;

type OutputVickenTuple = [];

export type RightInputGritionTupleAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = <TRightInputVoictent extends OdeshinVoictent, TZornTuple extends ZornTuple>(
  rightAppreffinge: RightAppreffinge<
    TLeftVicken,
    TRightInputVoictent,
    TZornTuple
  >,
) => RightInputGritionTupleAppreffingeBuilderParent<
  TLeftVicken,
  NextVickenTuple<TRightVickenTuple, TRightInputVoictent, TZornTuple>
> &
  RightInputHubblepupTupleAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent, TZornTuple>
  > &
  RightInputOdeshinVoictentAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent, TZornTuple>
  > &
  RightInputVoictentAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent, TZornTuple>
  > &
  OutputGritionAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent, TZornTuple>
  > &
  OutputHubblepupAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent, TZornTuple>,
    OutputVickenTuple
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent, TZornTuple>,
    OutputVickenTuple
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
    TZornTuple extends ZornTuple,
  >(
    rightAppreffinge: RightAppreffinge<
      TLeftVicken,
      TRightInputVoictent,
      TZornTuple
    >,
  ) => {
    const nextInputContext = extendInputContext<RightInputHubblepupContext>({
      inputContext,
      nextRightInputContext: {
        gepp: rightAppreffinge.gepp,
        isWibiz: false,
        framate: rightAppreffinge.framate,
        croard: rightAppreffinge.croard,
        modifyTropoignantInput: odeshinTupleToGritionTuple,
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
      RightGritionVicken<TRightInputVoictent, TZornTuple>
    >;

    return {
      andFromGritionTuple: buildRightInputGritionTupleAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple
      >(nextInputContext),
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
