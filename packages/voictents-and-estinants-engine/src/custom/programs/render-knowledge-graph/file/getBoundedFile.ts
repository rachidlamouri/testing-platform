import { assertNotNull } from '../../../../utilities/assertNotNull';
import { isNotNull } from '../../../../utilities/isNotNull';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { OdeshinZorn } from '../../../adapter/odeshin2';
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
export const getBoundedFile = buildEstinant({
  name: 'getBoundedFile',
})
  .fromHubblepup2<TypeScriptFileVoque>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromHubblepupTuple2<PartitionedBoundaryTrieVoque, [OdeshinZorn]>({
    // TODO: make a more readable pattern for singletons
    gepp: PARTITIONED_BOUNDARY_TRIE_GEPP,
    framate: () => [''],
    croard: () => '',
  })
  .toHubblepup2<BoundedFileVoque>({
    gepp: BOUNDED_FILE_GEPP,
  })
  .onPinbe((file, [partitionedBoundaryTrie]) => {
    const boundary = partitionedBoundaryTrie.find(
      file.nodePath.partList,
      isNotNull,
    );

    assertNotNull(
      boundary,
      `Unable to find boundary for file ${file.filePath}`,
    );

    return new BoundedFileInstance({
      boundary,
      file,
    });
  })
  .assemble();
