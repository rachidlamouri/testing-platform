import { assertNotNull } from '../../../../package-agnostic-utilities/nil/assertNotNull';
import { isNotNull } from '../../../../package-agnostic-utilities/nil/isNotNull';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../../adapter/identifiable-item/identifiableItem';
import {
  FILE_ANCESTOR_DIRECTORY_PATH_SET_COLLECTION_ID,
  FileAncestorDirectoryPathSetStreamMetatype,
} from '../../../programmable-units/file/fileAncestorDirectoryPathSet';
import {
  TYPE_SCRIPT_FILE_COLLECTION_ID,
  TypeScriptFileStreamMetatype,
} from '../../../programmable-units/type-script-file/typeScriptFile';
import {
  PARTITIONED_BOUNDARY_TRIE_COLLECTION_ID,
  PartitionedBoundaryTrieStreamMetatype,
} from '../boundary/partitionedBoundaryTrie';
import {
  BOUNDED_FILE_COLLECTION_ID,
  BoundedFileInstance,
  BoundedFileStreamMetatype,
} from './boundedFile';

/**
 * Associates a file to its boundary.
 */
export const getBoundedFile = buildProgrammedTransform({
  name: 'getBoundedFile',
})
  .fromItem2<TypeScriptFileStreamMetatype>({
    collectionId: TYPE_SCRIPT_FILE_COLLECTION_ID,
  })
  .andFromItemTuple2<FileAncestorDirectoryPathSetStreamMetatype, [string]>({
    collectionId: FILE_ANCESTOR_DIRECTORY_PATH_SET_COLLECTION_ID,
    getRightKeyTuple: (file) => {
      return [file.item.filePath.serialized];
    },
    getRightKey: (file) => {
      return file.item.filePath;
    },
  })
  .andFromItemTuple2<
    PartitionedBoundaryTrieStreamMetatype,
    [IdentifiableItemId]
  >({
    // TODO: make a more readable pattern for singletons
    collectionId: PARTITIONED_BOUNDARY_TRIE_COLLECTION_ID,
    getRightKeyTuple: () => [''],
    getRightKey: () => '',
  })
  .toItem2<BoundedFileStreamMetatype>({
    collectionId: BOUNDED_FILE_COLLECTION_ID,
  })
  .onTransform(
    (file, [{ set: ancestorDirectoryPathSet }], [partitionedBoundaryTrie]) => {
      const boundary = partitionedBoundaryTrie.find(
        file.nodePath.partList,
        isNotNull,
      );

      assertNotNull(
        boundary,
        `Unable to find boundary for file ${file.filePath.serialized}`,
      );

      return new BoundedFileInstance({
        boundary,
        file,
        ancestorDirectoryPathSet,
      });
    },
  )
  .assemble();
