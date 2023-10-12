import { GenericLeftInputVicken } from '../../vicken/leftInputVicken';

/**
 * Determines how to stream a collection into the left input of a transform
 * input group. See the data types of its properties for more details.
 *
 * @readableName LeftInputStreamConfiguration
 */
export type LeftInputAppreffinge<
  TLeftInputVicken extends GenericLeftInputVicken,
> = {
  collectionId: TLeftInputVicken['voque']['gepp'];
  isCollectionStream: TLeftInputVicken['isWibiz'];
};

export type GenericLeftInputAppreffinge =
  LeftInputAppreffinge<GenericLeftInputVicken>;
