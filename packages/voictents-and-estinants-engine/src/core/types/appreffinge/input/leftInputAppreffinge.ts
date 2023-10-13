import { GenericLeftInputStreamConnectionMetatype } from '../../stream-connection-metatype/leftInputStreamConnectionMetatype';

/**
 * Determines how to stream a collection into the left input of a transform
 * input group. See the data types of its properties for more details.
 *
 * @readableName LeftInputStreamConfiguration
 *
 * @canonicalDeclaration
 */
export type LeftInputStreamConfiguration<
  TLeftInputVicken extends GenericLeftInputStreamConnectionMetatype,
> = {
  collectionId: TLeftInputVicken['streamMetatype']['collectionId'];
  isCollectionStream: TLeftInputVicken['isCollectionStream'];
};

export type GenericLeftInputAppreffinge =
  LeftInputStreamConfiguration<GenericLeftInputStreamConnectionMetatype>;
