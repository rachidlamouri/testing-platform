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

export const buildEstinant = (): LeftInputVoictentAppreffingeBuilderParent &
  LeftInputOdeshinVoictentAppreffingeBuilderParent &
  LeftInputHubblepupAppreffingeBuilderParent &
  LeftInputGritionBuilderParent => {
  return {
    fromGrition: buildLeftInputGritionAppreffingeBuilder(),
    fromHubblepup: buildLeftInputHubblepupAppreffingeBuilder(),
    fromOdeshinVoictent: buildLeftInputOdeshinVoictentAppreffingeBuilder(),
    fromVoictent: buildLeftInputVoictentAppreffingeBuilder(),
  };
};
