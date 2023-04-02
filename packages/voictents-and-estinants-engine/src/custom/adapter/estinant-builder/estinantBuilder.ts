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

export const buildEstinant = (
  estinantName = '',
): LeftInputGritionBuilderParent &
  LeftInputHubblepupAppreffingeBuilderParent &
  LeftInputOdeshinVoictentAppreffingeBuilderParent &
  LeftInputVoictentAppreffingeBuilderParent => {
  return {
    fromGrition: buildLeftInputGritionAppreffingeBuilder(estinantName),
    fromHubblepup: buildLeftInputHubblepupAppreffingeBuilder(estinantName),
    fromOdeshinVoictent:
      buildLeftInputOdeshinVoictentAppreffingeBuilder(estinantName),
    fromVoictent: buildLeftInputVoictentAppreffingeBuilder(estinantName),
  };
};
