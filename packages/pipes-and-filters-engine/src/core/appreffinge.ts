import { Merge } from '../utilities/merge';
import { Croarder } from './croarder';
import { Framation } from './framation';
import { Gepp } from './gepp';

export type LeftAppreffinge = {
  gepp: Gepp;
};

export type RightAppreffinge = Merge<
  LeftAppreffinge,
  {
    croard: Croarder;
    framate: Framation;
  }
>;

/**
 * Information used to configure a Dreanor
 */
export type RightAppreffingeTuple = readonly RightAppreffinge[];
