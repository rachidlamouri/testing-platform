import { GenericIndexedHubblepupTuple } from '../../../core/types/hubblepup/hubblepup';
import { GenericVoque } from '../../../core/types/voque/voque';
import {
  Complexzorn,
  ZornTuple2,
} from '../../../package-agnostic-utilities/data-structure/zorn';
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
  buildOutputHubblepupTupleAppreffingeBuilder2,
  OutputHubblepupTupleAppreffingeBuilderParent2,
} from '../output/outputHubblepupTupleAppreffingeBuilder2';
import { PartialRightHubblepupTupleAppreffinge } from '../shared/partialAppreffinge';
import {
  PinbetunfBuilderParent2,
  buildPinbetunfBuilder2,
} from '../pinbetunf/pinbetunfBuilder2';
import {
  buildRightInputVoictentAppreffingeBuilder2,
  RightInputVoictentAppreffingeBuilderParent2,
} from './rightInputVoictentAppreffingeBuilder2';
import {
  AdaptedRightInputHubblepupTupleVicken,
  GenericAdaptedLeftInputVicken,
  GenericAdaptedRightInputVickenTuple,
} from '../shared/vicken';

type NextAdaptedRightInputVickenTuple<
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TRightInputVoque extends GenericVoque,
  TZornTuple extends ZornTuple2,
> = [
  ...TAdaptedRightInputVickenTuple,
  AdaptedRightInputHubblepupTupleVicken<TRightInputVoque, TZornTuple>,
];

type EmptyAdaptedOutputVickenTuple = [];

/**
 * Constructs the context needed to build a right input stream connection for
 * zero or more hubblepups.
 *
 * @readableName RightInputItemTupleStreamConfigurationBuilder
 */
type RightInputHubblepupTupleAppreffingeBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
> = <TRightInputVoque extends GenericVoque, TZornTuple extends ZornTuple2>(
  partialRightAppreffinge: PartialRightHubblepupTupleAppreffinge<
    TAdaptedLeftInputVicken,
    TRightInputVoque,
    TZornTuple
  >,
) => SpreadN<
  [
    RightInputHubblepupTupleAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque,
        TZornTuple
      >
    >,
    RightInputVoictentAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque,
        TZornTuple
      >
    >,

    PinbetunfBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque,
        TZornTuple
      >,
      EmptyAdaptedOutputVickenTuple
    >,

    OutputHubblepupAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque,
        TZornTuple
      >,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputHubblepupTupleAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque,
        TZornTuple
      >,
      EmptyAdaptedOutputVickenTuple
    >,
  ]
>;

export const buildRightInputHubblepupTupleAppreffingeBuilder2 = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): RightInputHubblepupTupleAppreffingeBuilder2<
  TAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple
> => {
  const buildRightInputHubblepupTupleAppreffinge2: RightInputHubblepupTupleAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple
  > = <TRightInputVoque extends GenericVoque, TZornTuple extends ZornTuple2>(
    partialRightAppreffinge: PartialRightHubblepupTupleAppreffinge<
      TAdaptedLeftInputVicken,
      TRightInputVoque,
      TZornTuple
    >,
  ) => {
    const nextContext = buildInputOutputContextFromRightInputContext({
      previousContext: inputOutputContext,
      rightInputContext: {
        version: 2,
        gepp: partialRightAppreffinge.gepp,
        isWibiz: false,
        framate: (leftInput: TAdaptedLeftInputVicken['tropoignantInput']) => {
          const list = partialRightAppreffinge
            .framate(leftInput)
            .map((intermediateValue) => {
              if (intermediateValue instanceof Complexzorn) {
                return intermediateValue.forHuman;
              }

              return intermediateValue;
            });

          return list;
        },
        croard: (rightInput: TRightInputVoque['indexedHubblepupPelie']) => {
          const intermediateValue = partialRightAppreffinge.croard(rightInput);
          if (intermediateValue instanceof Complexzorn) {
            return intermediateValue.forHuman;
          }

          return intermediateValue;
        },
        modifyTropoignantInput: (indexedHubblepupTuple) => {
          return (indexedHubblepupTuple as GenericIndexedHubblepupTuple).map(
            (indexedHubblepup) => {
              return indexedHubblepup.hubblepup;
            },
          );
        },
      },
    });

    return {
      andFromHubblepupTuple2: buildRightInputHubblepupTupleAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque,
          TZornTuple
        >
      >(nextContext),
      andFromVoictent2: buildRightInputVoictentAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque,
          TZornTuple
        >
      >(nextContext),

      onPinbe: buildPinbetunfBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque,
          TZornTuple
        >,
        EmptyAdaptedOutputVickenTuple
      >(nextContext),

      toHubblepup2: buildOutputHubblepupAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque,
          TZornTuple
        >,
        EmptyAdaptedOutputVickenTuple
      >(nextContext),
      toHubblepupTuple2: buildOutputHubblepupTupleAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque,
          TZornTuple
        >,
        EmptyAdaptedOutputVickenTuple
      >(nextContext),
    };
  };

  return buildRightInputHubblepupTupleAppreffinge2;
};

export type RightInputHubblepupTupleAppreffingeBuilderParent2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
> = {
  andFromHubblepupTuple2: RightInputHubblepupTupleAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple
  >;
};
