import { Voictent } from '../voictent';
import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import { Vition } from '../../../type-script-adapter/vition';
import { hubblepupTupleToHubblepupTuple } from './tropoignantInputOutputModifier';

export type LeftInputVoictentAppreffingeBuilder = <
  TInputVoictent extends Voictent,
>(
  gepp: TInputVoictent['gepp'],
) => OutputHubblepupAppreffingeBuilderParent<
  Vition<TInputVoictent, []>,
  [TInputVoictent['hubblepupTuple']]
>;

export const buildLeftInputVoictentAppreffingeBuilder =
  (): LeftInputVoictentAppreffingeBuilder => {
    const buildLeftInputVoictentAppreffinge: LeftInputVoictentAppreffingeBuilder =
      <TInputVoictent extends Voictent>(gepp: TInputVoictent['gepp']) => {
        return {
          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            Vition<TInputVoictent, []>,
            [TInputVoictent['hubblepupTuple']]
          >(
            // TODO you can created typed versions of these for type safety
            {
              gepp,
              isWibiz: true,
              modifyTropoignantInput: hubblepupTupleToHubblepupTuple,
            },
            [],
          ),
          // andFromVoictent: buildRightInputVoictentBuilder(),
          // toVoictent: buildOutputVoictentBuilder({
          //   gepp,
          //   isWibiz: true,
          // }),
        };
      };

    return buildLeftInputVoictentAppreffinge;
  };

export type LeftInputVoictentAppreffingeBuilderParent = {
  fromVoictent: LeftInputVoictentAppreffingeBuilder;
};
