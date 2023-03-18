import {
  Vicken,
  VickenVoictentTupleToZornTuple,
} from '../../../type-script-adapter/vicken';
import { Vition } from '../../../type-script-adapter/vition';
import {
  Straline,
  StralineTuple,
} from '../../../utilities/semantic-types/straline';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import { Zorn } from '../../../utilities/semantic-types/zorn';
import { Voictent } from '../voictent';
import { LeftContext, RightContextTuple } from './estinantBuilderContext';
import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import { hubblepupTupleToHubblepupTuple } from './tropoignantInputOutputModifier';

type RightInputTuple<
  TRightInputVoictent extends Voictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
> = {
  [Index in keyof TVoictentTuple]: TVoictentTuple[Index]['hubblepupTuple'][number];
};

export type RightInputHubblepupAppreffingeBuilder<
  TVition extends Vition,
  TLeftInput extends Straline,
  TRightInputTupleTuple extends StralineTuple,
> = <
  TRightInputVoictent extends Voictent,
  TVoictentTuple extends Tuple<TRightInputVoictent>,
  TZorn extends Zorn,
>(
  gepp: TRightInputVoictent['gepp'],
  framate: (
    leftInput: TLeftInput,
  ) => VickenVoictentTupleToZornTuple<TVoictentTuple, TZorn>,
  croard: (rightInput: TRightInputVoictent['hubblepupTuple'][number]) => TZorn,
) => RightInputHubblepupAppreffingeBuilderParent<
  Vition<
    TVition['leftVoictent'],
    [
      ...TVition['rightVickenTuple'],
      Vicken<TRightInputVoictent, TVoictentTuple, TZorn>,
    ]
  >,
  TLeftInput,
  [
    ...TRightInputTupleTuple,
    RightInputTuple<TRightInputVoictent, TVoictentTuple>,
  ]
> &
  OutputHubblepupAppreffingeBuilderParent<
    Vition<
      TVition['leftVoictent'],
      [
        ...TVition['rightVickenTuple'],
        Vicken<TRightInputVoictent, TVoictentTuple, TZorn>,
      ]
    >,
    [
      TLeftInput,
      ...TRightInputTupleTuple,
      RightInputTuple<TRightInputVoictent, TVoictentTuple>,
    ]
  >;

export const buildRightInputHubblepupAppreffingeBuilder = <
  TVition extends Vition,
  TLeftInput extends Straline,
  TRightInputTupleTuple extends StralineTuple,
>(
  leftContext: LeftContext,
  rightContextTuple: RightContextTuple,
): RightInputHubblepupAppreffingeBuilder<
  TVition,
  TLeftInput,
  TRightInputTupleTuple
> => {
  const buildRightInputHubblepupAppreffinge: RightInputHubblepupAppreffingeBuilder<
    TVition,
    TLeftInput,
    TRightInputTupleTuple
  > = <
    TRightInputVoictent extends Voictent,
    TVoictentTuple extends Tuple<TRightInputVoictent>,
    TZorn extends Zorn,
  >(
    gepp: TRightInputVoictent['gepp'],
    framate: (
      leftInput: TLeftInput,
    ) => VickenVoictentTupleToZornTuple<TVoictentTuple, TZorn>,
    croard: (
      rightInput: TRightInputVoictent['hubblepupTuple'][number],
    ) => TZorn,
  ) => {
    return {
      andFromHubblepup: buildRightInputHubblepupAppreffingeBuilder<
        Vition<
          TVition['leftVoictent'],
          [
            ...TVition['rightVickenTuple'],
            Vicken<TRightInputVoictent, TVoictentTuple, TZorn>,
          ]
        >,
        TLeftInput,
        [
          ...TRightInputTupleTuple,
          RightInputTuple<TRightInputVoictent, TVoictentTuple>,
        ]
      >(leftContext, [
        ...rightContextTuple,
        {
          gepp,
          isWibiz: false,
          framate,
          croard,
          modifyTropoignantInput: hubblepupTupleToHubblepupTuple,
        },
      ]),
      toHubblepup: buildOutputHubblepupAppreffingeBuilder<
        Vition<
          TVition['leftVoictent'],
          [
            ...TVition['rightVickenTuple'],
            Vicken<TRightInputVoictent, TVoictentTuple, TZorn>,
          ]
        >,
        [
          TLeftInput,
          ...TRightInputTupleTuple,
          RightInputTuple<TRightInputVoictent, TVoictentTuple>,
        ]
      >(leftContext, [
        ...rightContextTuple,
        {
          gepp,
          isWibiz: false,
          framate,
          croard,
          modifyTropoignantInput: hubblepupTupleToHubblepupTuple,
        },
      ]),
    };
  };

  return buildRightInputHubblepupAppreffinge;
};

export type RightInputHubblepupAppreffingeBuilderParent<
  TVition extends Vition,
  TLeftInput extends Straline,
  TRightInputTupleTuple extends StralineTuple,
> = {
  andFromHubblepup: RightInputHubblepupAppreffingeBuilder<
    TVition,
    TLeftInput,
    TRightInputTupleTuple
  >;
};
