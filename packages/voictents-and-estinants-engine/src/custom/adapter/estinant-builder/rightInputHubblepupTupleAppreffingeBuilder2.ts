import { GenericIndexedHubblepupTuple } from '../../../core/engine-shell/quirm/hubblepup';
import { GenericVoque } from '../../../core/engine/voque';
import { ZornTuple } from '../../../utilities/semantic-types/zorn';
import { SpreadN } from '../../../utilities/spreadN';
import {
  buildInputOutputContextFromRightInputContext,
  InputOutputContext,
} from './estinantBuilderContext';
import {
  buildOutputHubblepupAppreffingeBuilder2,
  OutputHubblepupAppreffingeBuilderParent2,
} from './outputHubblepupAppreffingeBuilder2';
import { PartialRightHubblepupTupleAppreffinge } from './partialAppreffinge';
import {
  AdaptedRightInputHubblepupTupleVicken,
  GenericAdaptedLeftInputVicken,
  GenericAdaptedRightInputVickenTuple,
} from './vicken';

type NextAdaptedRightInputVickenTuple<
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TRightInputVoque extends GenericVoque,
  TZornTuple extends ZornTuple,
> = [
  ...TAdaptedRightInputVickenTuple,
  AdaptedRightInputHubblepupTupleVicken<TRightInputVoque, TZornTuple>,
];

type EmptyAdaptedOutputVickenTuple = [];

export type RightInputHubblepupTupleAppreffingeBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
> = <TRightInputVoque extends GenericVoque, TZornTuple extends ZornTuple>(
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

    OutputHubblepupAppreffingeBuilderParent2<
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
  > = <TRightInputVoque extends GenericVoque, TZornTuple extends ZornTuple>(
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
        croard: partialRightAppreffinge.croard,
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

      toHubblepup2: buildOutputHubblepupAppreffingeBuilder2<
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
