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
import { GenericAdaptedLeftInputStreamConnectionMetatype } from './streamConnectionMetatype';

export type PartialLeftInputStreamConfiguration<
  TLeftInputStreamMetatype extends GenericStreamMetatype,
> = {
  collectionId: TLeftInputStreamMetatype['collectionId'];
};

export type PartialRightItemTupleStreamConfiguration<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TRightInputStreamMetatype extends GenericStreamMetatype,
  TIdTuple extends IdTuple2,
> = {
  collectionId: TRightInputStreamMetatype['collectionId'];
  getRightKeyTuple: (
    leftInput: TAdaptedLeftInputStreamConnectionMetatype['coreTransformInput'],
  ) => TIdTuple;
  getRightKey: (
    rightInput: TRightInputStreamMetatype['indexedItemStreamable'],
  ) => TIdTuple[number];
};

export type PartialRightCollectionStreamConfiguration<
  TRightInputStreamMetatype extends GenericStreamMetatype,
> = {
  collectionId: TRightInputStreamMetatype['collectionId'];
};

export type PartialOutputStreamConfiguration<
  TOutputStreamMetatype extends GenericStreamMetatype,
> = {
  collectionId: TOutputStreamMetatype['collectionId'];
};
