import { Merge } from '../utilities/merge';
import { MergeTuple } from '../utilities/mergeTuple';
import { Croarder } from './croarder';
import { Framation } from './framation';
import { Gepp } from './gepp';
import { Lanbe } from './lanbe';
import { Prected } from './prected';

type Dreanor = {
  gepp: Gepp;
  lanbe: Lanbe;
};

/**
 * Contains the information needed to identify a Voictent, and to stream its Hubblepups
 */
export type LeftDreanor = Merge<{ isLeft: true }, Dreanor>;

/**
 * Contains the information needed to identify a Voictent, and to stream and cache its Hubblepups
 */
export type RightDreanor = MergeTuple<
  [
    { isLeft: false },
    Dreanor,
    {
      framate: Framation;
      croard: Croarder;
      prected: Prected;
    },
  ]
>;

export type RightDreanorTuple = readonly RightDreanor[];
