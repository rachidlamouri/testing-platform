import { GenericIndexedHubblepup } from '../../../core/engine-shell/quirm/hubblepup';
import { GenericVoque } from '../../../core/engine/voque';
import { Voictent } from '../voictent';
import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from './estinantBuilderContext';
import {
  buildOutputHubblepupTupleAppreffingeBuilder2,
  OutputHubblepupTupleAppreffingeBuilderParent2,
} from './outputHubblepupTupleAppreffingeBuilder2';
import { PartialLeftInputAppreffinge } from './partialAppreffinge';
import {
  buildPinbetunfBuilder2,
  PinbetunfBuilderParent2,
} from './pinbetunfBuilder2';
import { AdaptedLeftInputHubblepupVicken } from './vicken';
import { SpreadN } from '../../../utilities/spreadN';
import {
  buildOutputHubblepupConditionalAppreffingeBuilder,
  OutputHubblepupConditionalAppreffingeBuilderParent,
} from './outputHubblepupConditionalAppreffingeBuilder';
import {
  buildOutputHubblepupAppreffingeBuilder2,
  OutputHubblepupAppreffingeBuilderParent2,
} from './outputHubblepupAppreffingeBuilder2';
import {
  buildRightInputHubblepupTupleAppreffingeBuilder2,
  RightInputHubblepupTupleAppreffingeBuilderParent2,
} from './rightInputHubblepupTupleAppreffingeBuilder2';

type EmptyAdaptedRightInputVickenTuple = [];

type EmptyAdaptedOutputVickenTuple = [];

export type LeftAppreffinge<TInputVoictent extends Voictent> = {
  gepp: TInputVoictent['gepp'];
};

export type LeftInputHubblepupAppreffingeBuilder2 = <
  TInputVoque extends GenericVoque,
>(
  partialLeftInputAppreffinge: PartialLeftInputAppreffinge<TInputVoque>,
) => SpreadN<
  [
    RightInputHubblepupTupleAppreffingeBuilderParent2<
      AdaptedLeftInputHubblepupVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,

    PinbetunfBuilderParent2<
      AdaptedLeftInputHubblepupVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,

    OutputHubblepupConditionalAppreffingeBuilderParent<
      AdaptedLeftInputHubblepupVicken<TInputVoque>
    >,
    OutputHubblepupAppreffingeBuilderParent2<
      AdaptedLeftInputHubblepupVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputHubblepupTupleAppreffingeBuilderParent2<
      AdaptedLeftInputHubblepupVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,
  ]
>;

export const buildLeftInputHubblepupAppreffingeBuilder2 = (
  instantiationContext: InstantiationContext,
): LeftInputHubblepupAppreffingeBuilder2 => {
  const buildLeftInputHubblepupAppreffinge: LeftInputHubblepupAppreffingeBuilder2 =
    <TInputVoque extends GenericVoque>(
      partialLeftInputAppreffinge: PartialLeftInputAppreffinge<TInputVoque>,
    ) => {
      const nextContext = buildInputOutputContextFromLeftInputContext({
        instantiationContext,
        leftInputContext: {
          version: 2,
          gepp: partialLeftInputAppreffinge.gepp,
          isWibiz: false,
          modifyTropoignantInput: (
            indexedHubblepup: GenericIndexedHubblepup,
          ) => {
            return indexedHubblepup.hubblepup;
          },
        },
      });

      return {
        andFromHubblepupTuple2:
          buildRightInputHubblepupTupleAppreffingeBuilder2<
            AdaptedLeftInputHubblepupVicken<TInputVoque>,
            EmptyAdaptedRightInputVickenTuple
          >(nextContext),

        onPinbe: buildPinbetunfBuilder2<
          AdaptedLeftInputHubblepupVicken<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),

        toHubblepupOnCondition:
          buildOutputHubblepupConditionalAppreffingeBuilder<
            AdaptedLeftInputHubblepupVicken<TInputVoque>
          >(nextContext),

        toHubblepup2: buildOutputHubblepupAppreffingeBuilder2<
          AdaptedLeftInputHubblepupVicken<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),
        toHubblepupTuple2: buildOutputHubblepupTupleAppreffingeBuilder2<
          AdaptedLeftInputHubblepupVicken<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),
      };
    };

  return buildLeftInputHubblepupAppreffinge;
};

export type LeftInputHubblepupAppreffingeBuilderParent2 = {
  fromHubblepup2: LeftInputHubblepupAppreffingeBuilder2;
};
