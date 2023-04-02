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

export const buildEstinant = (
  context: InstantiationContext = {},
): LeftInputGritionBuilderParent &
  LeftInputHubblepupAppreffingeBuilderParent &
  LeftInputOdeshinVoictentAppreffingeBuilderParent &
  LeftInputVoictentAppreffingeBuilderParent => {
  return {
    fromGrition: buildLeftInputGritionAppreffingeBuilder(context),
    fromHubblepup: buildLeftInputHubblepupAppreffingeBuilder(context),
    fromOdeshinVoictent:
      buildLeftInputOdeshinVoictentAppreffingeBuilder(context),
    fromVoictent: buildLeftInputVoictentAppreffingeBuilder(context),
  };
};
