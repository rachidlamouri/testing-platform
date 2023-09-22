import { Spread } from 'type-fest';
import { GenericVoque } from '../../../core/engine/voque';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  InputOutputContext,
} from '../shared/estinantBuilderContext';
import { PartialOutputAppreffinge } from '../shared/partialAppreffinge';
import {
  PinbetunfBuilderParent2,
  buildPinbetunfBuilder2,
} from '../pinbetunf/pinbetunfBuilder2';
import {
  AdaptedOutputVicken,
  GenericAdaptedLeftInputVicken,
  GenericAdaptedOutputVickenTuple,
  GenericAdaptedRightInputVickenTuple,
} from '../shared/vicken';

type NextAdaptedOutputVickenTuple<
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
  TOutputVoque extends GenericVoque,
> = [
  ...TAdaptedOutputVickenTuple,
  AdaptedOutputVicken<TOutputVoque, TOutputVoque['hubblepupPelue'][]>,
];

type OutputHubblepupTupleAppreffingeBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = <TOutputVoque extends GenericVoque>(
  partialOutputAppreffinge: PartialOutputAppreffinge<TOutputVoque>,
) => Spread<
  OutputHubblepupTupleAppreffingeBuilderParent2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
  >,
  PinbetunfBuilderParent2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
  >
>;

export const buildOutputHubblepupTupleAppreffingeBuilder2 = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): OutputHubblepupTupleAppreffingeBuilder2<
  TAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple
> => {
  const buildOutputHubblepupTupleAppreffinge2: OutputHubblepupTupleAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  > = <TOutputVoque extends GenericVoque>(
    outputAppreffinge: PartialOutputAppreffinge<TOutputVoque>,
  ) => {
    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult: (leftInput, modifiedInput, aggregatedOutput) => {
        const hubblepupTuple = aggregatedOutput[
          outputAppreffinge.gepp
        ] as TOutputVoque['voictentPelie'];

        return [outputAppreffinge.gepp, hubblepupTuple];
      },
      outputGepp: outputAppreffinge.gepp,
    });

    return {
      toHubblepupTuple2: buildOutputHubblepupTupleAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),
      onPinbe: buildPinbetunfBuilder2<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),
    };
  };

  return buildOutputHubblepupTupleAppreffinge2;
};

export type OutputHubblepupTupleAppreffingeBuilderParent2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = {
  toHubblepupTuple2: OutputHubblepupTupleAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  >;
};
