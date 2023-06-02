import {
  DreanorTuple,
  LeftDreanor,
  RightDreanorTuple,
} from './dreanor/dreanor';
import { Estinant, GenericEstinant2 } from '../engine-shell/estinant/estinant';
import { Procody } from './procody/procody';
import { GenericGeppSet } from '../engine-shell/voictent/gepp';
import { GenericVoictent2 } from '../engine/voictent2';

/**
 * The primary thing that the engine operates on in the main loop.
 * The Lanbe allows the Engine to resolve Quirms, and subsequently Hubblepups, to be sent to the Tropoignant that is saved to the Estinant.
 */
export type Platomity = {
  version: 1;
  estinant: Estinant;
  leftDreanor: LeftDreanor;
  rightDreanorTuple: RightDreanorTuple;
  procody: Procody;
  executionCount: number;
};

export type Platomity2 = {
  version: 2;
  estinant: GenericEstinant2;
  leftDreanor: LeftDreanor;
  rightDreanorTuple: RightDreanorTuple;
  outputGeppSet: GenericGeppSet;
  procody: Procody;
  executionCount: number;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependencySet: Set<Virok>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  mutableDependencySet: Set<Virok>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependentSet: Set<Virok>;
};

export const getDreanorTuple = (
  platomity: Platomity | Platomity2,
): DreanorTuple => [platomity.leftDreanor, ...platomity.rightDreanorTuple];

export const isPlatomity2List = (
  list: (Platomity | Platomity2)[],
): list is Platomity2[] => {
  return list.every((platomity) => platomity.version === 2);
};

export type Virok = {
  voictent: GenericVoictent2;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependencySet: Set<Platomity2>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  mutableDependencySet: Set<Platomity2>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependentSet: Set<Platomity2>;
};
