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
  buildInputOutputContextFromRightInputContext,
  InputOutputContext,
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
import { indexedOdeshinTupleToGritionTuple } from './tropoignantInputOutputModifier';

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
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent, TZornTuple>,
    OutputVickenTuple
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
  inputOutputContext: InputOutputContext,
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
    const nextContext = buildInputOutputContextFromRightInputContext({
      previousContext: inputOutputContext,
      rightInputContext: {
        gepp: rightAppreffinge.gepp,
        isWibiz: false,
        framate: rightAppreffinge.framate,
        croard: rightAppreffinge.croard,
        modifyTropoignantInput: indexedOdeshinTupleToGritionTuple,
      },
    });

    type TNextRightVickenTuple = AppendRightVickenToTuple<
      TRightVickenTuple,
      RightGritionVicken<TRightInputVoictent, TZornTuple>
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
        TNextRightVickenTuple,
        OutputVickenTuple
      >(nextContext),
      toHubblepup: buildOutputHubblepupAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple,
        OutputVickenTuple
      >(nextContext),
      toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
        TLeftVicken,
        TNextRightVickenTuple,
        OutputVickenTuple
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
