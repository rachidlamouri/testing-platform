import { InstantiationContext } from './shared/estinantBuilderContext';
import {
  buildLeftInputHubblepupAppreffingeBuilder2,
  LeftInputHubblepupAppreffingeBuilderParent2,
} from './left-input/leftInputHubblepupAppreffingeBuilder2';
import { SpreadN } from '../../package-agnostic-utilities/type/spreadN';
import {
  buildLeftInputVoictentAppreffingeBuilder2,
  LeftInputVoictentAppreffingeBuilderParent2,
} from './left-input/leftInputVoictentAppreffingeBuilder2';

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
