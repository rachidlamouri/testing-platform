import { assertNotNull } from '../../../../package-agnostic-utilities/nil/assertNotNull';
import { isNotNull } from '../../../../package-agnostic-utilities/nil/isNotNull';
import { buildProgrammedTransform } from '../../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../../adapter/identifiable-item/identifiableItem';
import {
  FILE_ANCESTOR_DIRECTORY_PATH_SET_GEPP,
  FileAncestorDirectoryPathSetVoque,
} from '../../../programmable-units/file/fileAncestorDirectoryPathSet';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoque,
} from '../../../programmable-units/type-script-file/typeScriptFile';
import {
  PARTITIONED_BOUNDARY_TRIE_GEPP,
  PartitionedBoundaryTrieVoque,
} from '../boundary/partitionedBoundaryTrie';
import {
  BOUNDED_FILE_GEPP,
  BoundedFileInstance,
  BoundedFileVoque,
} from './boundedFile';

/**
 * Associates a file to its boundary.
 */
export const getBoundedFile = buildProgrammedTransform({
  name: 'getBoundedFile',
})
  .fromItem2<TypeScriptFileVoque>({
    collectionId: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromHubblepupTuple2<FileAncestorDirectoryPathSetVoque, [string]>({
    gepp: FILE_ANCESTOR_DIRECTORY_PATH_SET_GEPP,
    framate: (file) => {
      return [file.item.filePath.serialized];
    },
    croard: (file) => {
      return file.item.filePath;
    },
  })
  .andFromHubblepupTuple2<PartitionedBoundaryTrieVoque, [OdeshinZorn]>({
    // TODO: make a more readable pattern for singletons
    gepp: PARTITIONED_BOUNDARY_TRIE_GEPP,
    framate: () => [''],
    croard: () => '',
  })
  .toItem2<BoundedFileVoque>({
    collectionId: BOUNDED_FILE_GEPP,
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
