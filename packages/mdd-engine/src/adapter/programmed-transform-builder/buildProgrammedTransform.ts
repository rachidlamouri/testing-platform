import { InstantiationContext } from './shared/programmedTransformBuilderContext';
import {
  buildLeftInputItemStreamConfigurationBuilder2,
  LeftInputItemStreamConfigurationBuilderParent2,
} from './left-input/leftInputItemStreamConfigurationBuilder2';
import { SpreadN } from '../../package-agnostic-utilities/type/spreadN';
import {
  buildLeftInputCollectionStreamConfigurationBuilder2,
  LeftInputCollectionStreamConfigurationBuilderParent2,
} from './left-input/leftInputCollectionStreamConfigurationBuilder2';

/**
 * A utility function for building an estinant with the builder pattern. This is
 * essential to the adapter layer as it guides the programmer's types, allows
 * the programmer to ignore engine-specific concerns, and it constructs an
 * engine-compatiable estinant.
 *
 * @readableName BuildProgrammedTransform
 *
 * @canonicalDeclaration
 */
export const buildProgrammedTransform = (
  context: InstantiationContext,
): SpreadN<
  [
    LeftInputItemStreamConfigurationBuilderParent2,
    LeftInputCollectionStreamConfigurationBuilderParent2,
  ]
> => {
  return {
    fromItem2: buildLeftInputItemStreamConfigurationBuilder2(context),
    fromCollection2:
      buildLeftInputCollectionStreamConfigurationBuilder2(context),
  };
};
