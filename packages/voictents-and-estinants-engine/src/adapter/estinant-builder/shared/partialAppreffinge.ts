/**
 * An appreffinge without isWibiz
 *
 * @noCanonicalDeclaration
 *
 * @readableName PartialStreamConfiguration
 *
 * @todo split this file into left and right appreffinges
 */

import { GenericVoque } from '../../../core/types/voque/voque';
import { ZornTuple2 } from '../../../package-agnostic-utilities/datastructure/zorn';
import { GenericAdaptedLeftInputVicken } from './vicken';

export type PartialLeftInputAppreffinge<TLeftInputVoque extends GenericVoque> =
  {
    gepp: TLeftInputVoque['gepp'];
  };

export type PartialRightHubblepupTupleAppreffinge<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TRightInputVoque extends GenericVoque,
  TZornTuple extends ZornTuple2,
> = {
  gepp: TRightInputVoque['gepp'];
  framate: (
    leftInput: TAdaptedLeftInputVicken['tropoignantInput'],
  ) => TZornTuple;
  croard: (
    rightInput: TRightInputVoque['indexedHubblepupPelie'],
  ) => TZornTuple[number];
};

export type PartialRightVoictentAppreffinge<
  TRightInputVoque extends GenericVoque,
> = {
  gepp: TRightInputVoque['gepp'];
};

export type PartialOutputAppreffinge<TOutputVoque extends GenericVoque> = {
  gepp: TOutputVoque['gepp'];
};
