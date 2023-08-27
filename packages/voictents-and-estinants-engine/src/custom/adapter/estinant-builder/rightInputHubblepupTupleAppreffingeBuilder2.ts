import { GenericIndexedHubblepupTuple } from '../../../core/engine-shell/quirm/hubblepup';
import { GenericVoque } from '../../../core/engine/voque';
import { Zorn2, ZornTuple2 } from '../../../utilities/semantic-types/zorn';
import { SpreadN } from '../../../utilities/spreadN';
import {
  buildInputOutputContextFromRightInputContext,
  InputOutputContext,
} from './estinantBuilderContext';
import {
  buildOutputHubblepupAppreffingeBuilder2,
  OutputHubblepupAppreffingeBuilderParent2,
} from './outputHubblepupAppreffingeBuilder2';
import {
  buildOutputHubblepupTupleAppreffingeBuilder2,
  OutputHubblepupTupleAppreffingeBuilderParent2,
} from './outputHubblepupTupleAppreffingeBuilder2';
import { PartialRightHubblepupTupleAppreffinge } from './partialAppreffinge';
import {
  buildRightInputVoictentAppreffingeBuilder2,
  RightInputVoictentAppreffingeBuilderParent2,
} from './rightInputVoictentAppreffingeBuilder2';
import {
  AdaptedRightInputHubblepupTupleVicken,
  GenericAdaptedLeftInputVicken,
  GenericAdaptedRightInputVickenTuple,
} from './vicken';

type NextAdaptedRightInputVickenTuple<
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TRightInputVoque extends GenericVoque,
  TZornTuple extends ZornTuple2,
> = [
  ...TAdaptedRightInputVickenTuple,
  AdaptedRightInputHubblepupTupleVicken<TRightInputVoque, TZornTuple>,
];

type EmptyAdaptedOutputVickenTuple = [];

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
        framate: partialRightAppreffinge.framate,
        croard: (rightInput: TRightInputVoque['indexedEmittedHubblepup']) => {
          const intermediateValue = partialRightAppreffinge.croard(rightInput);
          if (intermediateValue instanceof Zorn2) {
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
