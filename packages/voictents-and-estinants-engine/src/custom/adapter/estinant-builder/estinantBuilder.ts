import {
  buildLeftInputVoictentAppreffingeBuilder,
  LeftInputVoictentAppreffingeBuilderParent,
} from './leftInputVoictentAppreffingeBuilder';
import {
  buildLeftInputHubblepupAppreffingeBuilder,
  LeftInputHubblepupAppreffingeBuilderParent,
} from './leftInputHubblepupAppreffingeBuilder';
import {
  buildLeftInputGritionAppreffingeBuilder,
  LeftInputGritionBuilderParent,
} from './leftInputGritionAppreffingeBuilder';
import {
  buildLeftInputOdeshinVoictentAppreffingeBuilder,
  LeftInputOdeshinVoictentAppreffingeBuilderParent,
} from './leftInputOdeshinVoictentAppreffingeBuilder';
import { InstantiationContext } from './estinantBuilderContext';
import {
  buildLeftInputHubblepupAppreffingeBuilder2,
  LeftInputHubblepupAppreffingeBuilderParent2,
} from './leftInputHubblepupAppreffingeBuilder2';
import { SpreadN } from '../../../utilities/spreadN';

export const buildEstinant = (
  context: InstantiationContext,
): SpreadN<
  [
    LeftInputHubblepupAppreffingeBuilderParent2,
    LeftInputGritionBuilderParent,
    LeftInputHubblepupAppreffingeBuilderParent,
    LeftInputOdeshinVoictentAppreffingeBuilderParent,
    LeftInputVoictentAppreffingeBuilderParent,
  ]
> => {
  return {
    fromHubblepup2: buildLeftInputHubblepupAppreffingeBuilder2(context),
    fromGrition: buildLeftInputGritionAppreffingeBuilder(context),
    fromHubblepup: buildLeftInputHubblepupAppreffingeBuilder(context),
    fromOdeshinVoictent:
      buildLeftInputOdeshinVoictentAppreffingeBuilder(context),
    fromVoictent: buildLeftInputVoictentAppreffingeBuilder(context),
  };
};
