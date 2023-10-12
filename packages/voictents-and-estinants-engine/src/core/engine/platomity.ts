import {
  DreanorTuple,
  LeftDreanor,
  RightDreanorTuple,
} from './dreanor/dreanor';
import { GenericEstinant2 } from '../types/estinant/estinant';
import { Procody } from './procody/procody';
import { GeppSet } from '../types/voictent/gepp';
import { GenericVoictent2 } from '../types/voictent/voictent2';

/**
 * A programmed transform wrapper that is used to connect collections to
 * transforms.
 *
 * @readableName MutableTransformState
 */
export type Platomity2 = {
  version: 2;
  programmedTransform: GenericEstinant2;
  leftDreanor: LeftDreanor;
  rightDreanorTuple: RightDreanorTuple;
  outputGeppSet: GeppSet;
  procody: Procody;
  executionCount: number;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependencySet: Set<Virok>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  mutableDependencySet: Set<Virok>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependentSet: Set<Virok>;
};

export const getDreanorTuple = (platomity: Platomity2): DreanorTuple => [
  platomity.leftDreanor,
  ...platomity.rightDreanorTuple,
];

export type Virok = {
  voictent: GenericVoictent2;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependencySet: Set<Platomity2>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  mutableDependencySet: Set<Platomity2>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependentSet: Set<Platomity2>;
};
