import {
  AppendRightVickenToTuple,
  LeftVicken,
  RightHubblepupVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { VoictentToHubblepup } from '../../../type-script-adapter/voictent';
import { ZornTuple } from '../../../utilities/semantic-types/zorn';
import { Voictent } from '../voictent';
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
  TRightInputVoictent extends Voictent,
  TZornTuple extends ZornTuple,
> = AppendRightVickenToTuple<
  TRightVickenTuple,
  RightHubblepupVicken<TRightInputVoictent, TZornTuple>
>;

type OutputVickenTuple = [];

export type RightInputHubblepupTupleAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = <TRightInputVoictent extends Voictent, TZornTuple extends ZornTuple>(
  rightAppreffinge: RightAppreffinge<
    TLeftVicken,
    TRightInputVoictent,
    TZornTuple
  >,
) => RightInputHubblepupTupleAppreffingeBuilderParent<
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

export const buildRightInputHubblepupTupleAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): RightInputHubblepupTupleAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple
> => {
  const buildRightInputHubblepupTupleAppreffinge: RightInputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
  > = <TRightInputVoictent extends Voictent, TZornTuple extends ZornTuple>(
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
        modifyTropoignantInput: hubblepupTupleToHubblepupTuple,
      },
    });

    type TNextRightVickenTuple = AppendRightVickenToTuple<
      TRightVickenTuple,
      RightHubblepupVicken<TRightInputVoictent, TZornTuple>
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
