import { UnknownString } from '../utilities/types/unknownHelpers';

export type UnknownCollectionLocator = UnknownString;

export type UnknownCollectionLocatorTuple = readonly UnknownCollectionLocator[];

export const ROOT_DATUM_INSTANCE_LOCATOR = '' as const;

export type RootDatumInstanceLocator = typeof ROOT_DATUM_INSTANCE_LOCATOR;
