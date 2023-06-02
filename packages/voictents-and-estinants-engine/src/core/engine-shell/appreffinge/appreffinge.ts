import { Merge } from 'type-fest';
import { Croader2, Croarder } from './croarder';
import { Framation, Framation2 } from './framation';
import { GenericGepp } from '../voictent/gepp';

export type LeftAppreffinge = {
  gepp: GenericGepp;
  // determines if the input acts on the voictent as a whole or each item individually
  isWibiz?: boolean;
};

type RightAppreffinge =
  | Merge<
      LeftAppreffinge,
      {
        croard: Croarder;
        framate: Framation;
      }
    >
  | Merge<
      LeftAppreffinge,
      {
        croard2: Croader2;
        framate2: Framation2;
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
