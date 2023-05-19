import { GenericIndexedHubblepup } from '../../../core/engine-shell/quirm/hubblepup';
import { LeftInputHubblepupVicken } from '../../../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../../../core/engine-shell/vicken/outputVicken';
import { GenericVoque } from '../../../core/engine/voque';
import { Voictent } from '../voictent';
import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from './estinantBuilderContext';
import { PartialLeftInputAppreffinge } from './partialAppreffinge';
import {
  buildPinbetunfBuilder2,
  PinbetunfBuilderParent2,
} from './pinbetunfBuilder2';
import { AdaptedLeftInputVicken } from './vicken';

type CurrentAdaptedLeftInputVicken<TInputVoque extends GenericVoque> =
  AdaptedLeftInputVicken<
    LeftInputHubblepupVicken<TInputVoque>,
    TInputVoque['emittedHubblepup']
  >;

type CurrentAdaptedRightInputVickenTuple = [];

type CurrentAdaptedOutputVicken = OutputVicken<[]>;

export type LeftAppreffinge<TInputVoictent extends Voictent> = {
  gepp: TInputVoictent['gepp'];
};

export type LeftInputHubblepupAppreffingeBuilder = <
  TInputVoque extends GenericVoque,
>(
  partialLeftInputAppreffinge: PartialLeftInputAppreffinge<TInputVoque>,
) => PinbetunfBuilderParent2<
  CurrentAdaptedLeftInputVicken<TInputVoque>,
  CurrentAdaptedRightInputVickenTuple,
  CurrentAdaptedOutputVicken
>;

export const buildLeftInputHubblepupAppreffingeBuilder2 = (
  instantiationContext: InstantiationContext,
): LeftInputHubblepupAppreffingeBuilder => {
  const buildLeftInputHubblepupAppreffinge: LeftInputHubblepupAppreffingeBuilder =
    <TInputVoque extends GenericVoque>(
      partialLeftInputAppreffinge: PartialLeftInputAppreffinge<TInputVoque>,
    ) => {
      const nextContext = buildInputOutputContextFromLeftInputContext({
        instantiationContext,
        leftInputContext: {
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
        onPinbe: buildPinbetunfBuilder2<
          CurrentAdaptedLeftInputVicken<TInputVoque>,
          CurrentAdaptedRightInputVickenTuple,
          CurrentAdaptedOutputVicken
        >(nextContext),
      };
    };

  return buildLeftInputHubblepupAppreffinge;
};

export type LeftInputHubblepupAppreffingeBuilderParent2 = {
  fromHubblepup2: LeftInputHubblepupAppreffingeBuilder;
};
