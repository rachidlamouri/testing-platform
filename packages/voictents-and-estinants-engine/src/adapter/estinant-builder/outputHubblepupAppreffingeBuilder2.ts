import { GenericVoque } from '../../core/engine/voque';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  InputOutputContext,
} from './estinantBuilderContext';
import { PartialOutputAppreffinge } from './partialAppreffinge';
import {
  PinbetunfBuilderParent2,
  buildPinbetunfBuilder2,
} from './pinbetunfBuilder2';
import {
  AdaptedOutputVicken,
  GenericAdaptedLeftInputVicken,
  GenericAdaptedOutputVickenTuple,
  GenericAdaptedRightInputVickenTuple,
} from './vicken';
import { SpreadN } from '../../utilities/spreadN';
import {
  buildOutputHubblepupTupleAppreffingeBuilder2,
  OutputHubblepupTupleAppreffingeBuilderParent2,
} from './outputHubblepupTupleAppreffingeBuilder2';

type NextAdaptedOutputVickenTuple<
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
  TOutputVoque extends GenericVoque,
> = [
  ...TAdaptedOutputVickenTuple,
  AdaptedOutputVicken<TOutputVoque, TOutputVoque['hubblepupPelue']>,
];

type OutputHubblepupAppreffingeBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = <TOutputVoque extends GenericVoque>(
  partialOutputAppreffinge: PartialOutputAppreffinge<TOutputVoque>,
) => SpreadN<
  [
    PinbetunfBuilderParent2<
      TAdaptedLeftInputVicken,
      TAdaptedRightInputVickenTuple,
      NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
    >,

    OutputHubblepupAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      TAdaptedRightInputVickenTuple,
      NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
    >,
    OutputHubblepupTupleAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      TAdaptedRightInputVickenTuple,
      NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
    >,
  ]
>;

export const buildOutputHubblepupAppreffingeBuilder2 = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): OutputHubblepupAppreffingeBuilder2<
  TAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple
> => {
  const buildOutputHubblepupAppreffinge2: OutputHubblepupAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  > = <TOutputVoque extends GenericVoque>(
    outputAppreffinge: PartialOutputAppreffinge<TOutputVoque>,
  ) => {
    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult: (leftInput, modifiedInput, aggregatedOutput) => {
        const hubblepup = aggregatedOutput[
          outputAppreffinge.gepp
        ] as TOutputVoque['hubblepupPelie'];

        return [outputAppreffinge.gepp, [hubblepup]];
      },
      outputGepp: outputAppreffinge.gepp,
    });

    return {
      onPinbe: buildPinbetunfBuilder2<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),

      toHubblepup2: buildOutputHubblepupAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),
      toHubblepupTuple2: buildOutputHubblepupTupleAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),
    };
  };

  return buildOutputHubblepupAppreffinge2;
};

export type OutputHubblepupAppreffingeBuilderParent2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = {
  toHubblepup2: OutputHubblepupAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  >;
};
