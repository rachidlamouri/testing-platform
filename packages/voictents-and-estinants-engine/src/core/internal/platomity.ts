import {
  DreanorTuple,
  LeftDreanor,
  RightDreanorTuple,
} from './dreanor/dreanor';
import { Estinant, GenericEstinant2 } from '../engine-shell/estinant/estinant';
import { Procody } from './procody/procody';
import { GeppSet } from '../engine-shell/voictent/gepp';

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
  outputGeppSet: GeppSet;
  procody: Procody;
  executionCount: number;
};

export const getDreanorTuple = (
  platomity: Platomity | Platomity2,
): DreanorTuple => [platomity.leftDreanor, ...platomity.rightDreanorTuple];
