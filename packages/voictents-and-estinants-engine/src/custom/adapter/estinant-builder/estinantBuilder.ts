import { InstantiationContext } from './estinantBuilderContext';
import {
  buildLeftInputHubblepupAppreffingeBuilder2,
  LeftInputHubblepupAppreffingeBuilderParent2,
} from './leftInputHubblepupAppreffingeBuilder2';
import { SpreadN } from '../../../utilities/spreadN';
import {
  buildLeftInputVoictentAppreffingeBuilder2,
  LeftInputVoictentAppreffingeBuilderParent2,
} from './leftInputVoictentAppreffingeBuilder2';

export const buildEstinant = (
  context: InstantiationContext,
): SpreadN<
  [
    LeftInputHubblepupAppreffingeBuilderParent2,
    LeftInputVoictentAppreffingeBuilderParent2,
  ]
> => {
  return {
    fromHubblepup2: buildLeftInputHubblepupAppreffingeBuilder2(context),
    fromVoictent2: buildLeftInputVoictentAppreffingeBuilder2(context),
  };
};
