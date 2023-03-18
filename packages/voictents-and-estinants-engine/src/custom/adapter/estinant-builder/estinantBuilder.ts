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

type LeftInputBuilderParent =
  // TODO: use type-fest
  LeftInputVoictentAppreffingeBuilderParent &
    LeftInputHubblepupAppreffingeBuilderParent &
    LeftInputGritionBuilderParent;

type EstinantBuilder = () => LeftInputBuilderParent;

export const buildEstinant: EstinantBuilder = () => {
  return {
    fromVoictent: buildLeftInputVoictentAppreffingeBuilder(),
    fromHubblepup: buildLeftInputHubblepupAppreffingeBuilder(),
    fromGrition: buildLeftInputGritionAppreffingeBuilder(),
  };
};
