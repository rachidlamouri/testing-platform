import { Vition } from '../../../type-script-adapter/vition';
import { OdeshinVoictent } from '../odeshinVoictent';
import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import { odeshinToGrition } from './tropoignantInputOutputModifier';

export type LeftInputGritionAppreffingeBuilder = <
  TInputVoictent extends OdeshinVoictent,
>(
  gepp: TInputVoictent['gepp'],
) => OutputHubblepupAppreffingeBuilderParent<
  Vition<TInputVoictent, []>,
  [TInputVoictent['hubblepupTuple'][number]['grition']]
>;

export const buildLeftInputGritionAppreffingeBuilder =
  (): LeftInputGritionAppreffingeBuilder => {
    const buildLeftInputGritionAppreffinge: LeftInputGritionAppreffingeBuilder =
      <TInputVoictent extends OdeshinVoictent>(
        gepp: TInputVoictent['gepp'],
      ) => {
        return {
          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            Vition<TInputVoictent, []>,
            [TInputVoictent['hubblepupTuple'][number]['grition']]
          >(
            {
              gepp,
              isWibiz: false,
              modifyTropoignantInput: odeshinToGrition,
            },
            [],
          ),
        };
      };

    return buildLeftInputGritionAppreffinge;
  };

export type LeftInputGritionBuilderParent = {
  fromGrition: LeftInputGritionAppreffingeBuilder;
};
