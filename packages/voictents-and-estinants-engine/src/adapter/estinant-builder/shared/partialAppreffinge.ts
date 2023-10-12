/**
 * An appreffinge without isWibiz
 *
 * @noCanonicalDeclaration
 *
 * @readableName PartialStreamConfiguration
 *
 * @todo split this file into left and right appreffinges
 */

import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { IdTuple2 } from '../../../package-agnostic-utilities/data-structure/id';
import { GenericAdaptedLeftInputVicken } from './vicken';

export type PartialLeftInputAppreffinge<
  TLeftInputVoque extends GenericStreamMetatype,
> = {
  collectionId: TLeftInputVoque['collectionId'];
};

export type PartialRightHubblepupTupleAppreffinge<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TRightInputVoque extends GenericStreamMetatype,
  TZornTuple extends IdTuple2,
> = {
  gepp: TRightInputVoque['collectionId'];
  framate: (
    leftInput: TAdaptedLeftInputVicken['tropoignantInput'],
  ) => TZornTuple;
  croard: (
    rightInput: TRightInputVoque['indexedItemStreamable'],
  ) => TZornTuple[number];
};

export type PartialRightVoictentAppreffinge<
  TRightInputVoque extends GenericStreamMetatype,
> = {
  gepp: TRightInputVoque['collectionId'];
};

export type PartialOutputAppreffinge<
  TOutputVoque extends GenericStreamMetatype,
> = {
  collectionId: TOutputVoque['collectionId'];
};
