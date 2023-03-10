import { Merge } from '../utilities/merge';
import { Croarder } from './croarder';
import { Framation } from './framation';
import { Gepp } from './gepp';

export type LeftAppreffinge = {
  gepp: Gepp;
  // determines if the input acts on the voictent as a whole or each item individually
  isWibiz?: boolean;
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

export type Appreffinge = LeftAppreffinge | RightAppreffinge;

// TODO: remove after making "isWibiz" non-optional
export const getIsWibiz = (appreffinge: Appreffinge): boolean =>
  appreffinge.isWibiz ?? false;
