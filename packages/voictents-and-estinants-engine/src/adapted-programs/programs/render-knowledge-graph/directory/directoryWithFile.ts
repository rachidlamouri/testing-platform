import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { Directory } from '../../../programmable-units/file/directory';

/**
 * A directory with a TypeScript file
 */
type DirectoryWithFile = Directory;

export const DIRECTORY_WITH_FILE_GEPP = 'directory-with-file';

type DirectoryWithFileGepp = typeof DIRECTORY_WITH_FILE_GEPP;

export type DirectoryWithFileVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    DirectoryWithFileGepp,
    DirectoryWithFile
  >;
