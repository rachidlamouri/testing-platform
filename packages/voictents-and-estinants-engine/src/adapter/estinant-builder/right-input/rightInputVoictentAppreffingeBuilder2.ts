import { GenericVoque } from '../../../core/engine/voque';
import { SpreadN } from '../../../utilities/spreadN';
import {
  buildInputOutputContextFromRightInputContext,
  InputOutputContext,
} from '../shared/estinantBuilderContext';
import {
  buildOutputHubblepupAppreffingeBuilder2,
  OutputHubblepupAppreffingeBuilderParent2,
} from '../output/outputHubblepupAppreffingeBuilder2';
import {
  OutputHubblepupTupleAppreffingeBuilderParent2,
  buildOutputHubblepupTupleAppreffingeBuilder2,
} from '../output/outputHubblepupTupleAppreffingeBuilder2';
import { PartialRightVoictentAppreffinge } from '../shared/partialAppreffinge';
import {
  AdaptedRightInputVoictentVicken,
  GenericAdaptedLeftInputVicken,
  GenericAdaptedRightInputVickenTuple,
} from '../shared/vicken';

type NextAdaptedRightInputVickenTuple<
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TRightInputVoque extends GenericVoque,
> = [
  ...TAdaptedRightInputVickenTuple,
  AdaptedRightInputVoictentVicken<TRightInputVoque>,
];

type EmptyAdaptedOutputVickenTuple = [];

type RightInputVoictentAppreffingeBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
> = <TRightInputVoque extends GenericVoque>(
  partialRightAppreffinge: PartialRightVoictentAppreffinge<TRightInputVoque>,
) => SpreadN<
  [
    RightInputVoictentAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque
      >
    >,

    OutputHubblepupAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque
      >,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputHubblepupTupleAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque
      >,
      EmptyAdaptedOutputVickenTuple
    >,
  ]
>;

export const buildRightInputVoictentAppreffingeBuilder2 = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): RightInputVoictentAppreffingeBuilder2<
  TAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple
> => {
  const buildRightInputHubblepupAppreffinge: RightInputVoictentAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple
  > = <TRightInputVoque extends GenericVoque>(
    partialRightAppreffinge: PartialRightVoictentAppreffinge<TRightInputVoque>,
  ) => {
    const nextContext = buildInputOutputContextFromRightInputContext({
      previousContext: inputOutputContext,
      rightInputContext: {
        gepp: partialRightAppreffinge.gepp,
        isWibiz: true,
        modifyTropoignantInput: (rightInput) => rightInput as unknown,
      },
    });

    return {
      andFromVoictent2: buildRightInputVoictentAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque
        >
      >(nextContext),

      toHubblepup2: buildOutputHubblepupAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque
        >,
        EmptyAdaptedOutputVickenTuple
      >(nextContext),
      toHubblepupTuple2: buildOutputHubblepupTupleAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque
        >,
        EmptyAdaptedOutputVickenTuple
      >(nextContext),
    };
  };

  return buildRightInputHubblepupAppreffinge;
};

export type RightInputVoictentAppreffingeBuilderParent2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
> = {
  andFromVoictent2: RightInputVoictentAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple
  >;
};
