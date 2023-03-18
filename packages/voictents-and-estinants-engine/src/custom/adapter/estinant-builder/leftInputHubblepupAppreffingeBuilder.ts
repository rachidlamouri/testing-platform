import { Vition } from '../../../type-script-adapter/vition';
import { Voictent } from '../voictent';
import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import {
  buildRightInputHubblepupAppreffingeBuilder,
  RightInputHubblepupAppreffingeBuilderParent,
} from './rightInputHubblepupTupleAppreffingeBuilder';
import { hubblepupToHubblepup } from './tropoignantInputOutputModifier';

export type LeftInputHubblepupAppreffingeBuilder = <
  TInputVoictent extends Voictent,
>(
  gepp: TInputVoictent['gepp'],
) => RightInputHubblepupAppreffingeBuilderParent<
  Vition<TInputVoictent, []>,
  TInputVoictent['hubblepupTuple'][number],
  []
> &
  OutputHubblepupAppreffingeBuilderParent<
    Vition<TInputVoictent, []>,
    [TInputVoictent['hubblepupTuple'][number]]
  >;

export const buildLeftInputHubblepupAppreffingeBuilder =
  (): LeftInputHubblepupAppreffingeBuilder => {
    const buildLeftInputHubblepupAppreffinge: LeftInputHubblepupAppreffingeBuilder =
      <TInputVoictent extends Voictent>(gepp: TInputVoictent['gepp']) => {
        return {
          andFromHubblepup: buildRightInputHubblepupAppreffingeBuilder<
            Vition<TInputVoictent, []>,
            TInputVoictent['hubblepupTuple'][number],
            []
          >(
            {
              gepp,
              isWibiz: false,
              modifyTropoignantInput: hubblepupToHubblepup,
            },
            [],
          ),
          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            Vition<TInputVoictent, []>,
            [TInputVoictent['hubblepupTuple'][number]]
          >(
            {
              gepp,
              isWibiz: false,
              modifyTropoignantInput: hubblepupToHubblepup,
            },
            [],
          ),
        };
      };

    return buildLeftInputHubblepupAppreffinge;
  };

export type LeftInputHubblepupAppreffingeBuilderParent = {
  fromHubblepup: LeftInputHubblepupAppreffingeBuilder;
};
