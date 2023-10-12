import { GenericVoque } from '../../../core/types/voque/voque';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
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
import {
  buildPinbetunfBuilder2,
  PinbetunfBuilderParent2,
} from '../pinbetunf/pinbetunfBuilder2';

type NextAdaptedRightInputVickenTuple<
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TRightInputVoque extends GenericVoque,
> = [
  ...TAdaptedRightInputVickenTuple,
  AdaptedRightInputVoictentVicken<TRightInputVoque>,
];

type EmptyAdaptedOutputVickenTuple = [];

/**
 * Collects the context needed to construct a right input stream connection to
 * consume an entire collection.
 *
 * @readableName RightInputCollectionStreamConfigurationBuilder
 */
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

    PinbetunfBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque
      >,
      EmptyAdaptedOutputVickenTuple
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

      onTransform: buildPinbetunfBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque
        >,
        EmptyAdaptedOutputVickenTuple
      >(nextContext),

      toItem2: buildOutputHubblepupAppreffingeBuilder2<
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
