import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { Directory } from '../../../programmable-units/file/directory';

/**
 * A directory with a TypeScript file
 */
type DirectoryWithFile = Directory;

export const DIRECTORY_WITH_FILE_COLLECTION_ID = 'directory-with-file';

type DirectoryWithFileCollectionId = typeof DIRECTORY_WITH_FILE_COLLECTION_ID;

export type DirectoryWithFileStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    DirectoryWithFileCollectionId,
    DirectoryWithFile
  >;
