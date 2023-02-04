import { UnknownString } from '../utilities/types/unknownHelpers';

export type UnknownCollectionLocator = UnknownString;

export type UnknownCollectionLocatorPart = UnknownString;

export type UnknownCollectionLocatorTuple = readonly UnknownCollectionLocator[];

// TODO: figure out what to do so we don't have to make an extraneous export
export type CollectionLocator = symbol;
