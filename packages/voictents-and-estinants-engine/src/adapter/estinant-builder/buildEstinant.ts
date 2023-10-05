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

/**
 * A utility function for building an estinant with the builder pattern. This is
 * essential to the adapter layer as it guides the programmer's types, allows
 * the programmer to ignore engine-specific concerns, and it constructs an
 * engine-compatiable estinant.
 *
 * @readableName BuildProgrammedTransform
 */
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
