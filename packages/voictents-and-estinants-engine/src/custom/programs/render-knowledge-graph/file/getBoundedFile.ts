import { isNotNull } from '../../../../utilities/isNotNull';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoque,
} from '../../../programmable-units/type-script-file/typeScriptFile';
import {
  BoundaryTrieBVoque,
  BOUNDARY_TRIE_B_GEPP,
} from '../boundary/boundaryTrieB';
import {
  BOUNDED_FILE_GEPP,
  BoundedFileInstance,
  BoundedFileVoque,
} from './boundedFile';

/**
 * Associates a file to its boundary
 */
export const getBoundedFile = buildEstinant({
  name: 'getBoundedFile',
})
  .fromHubblepup2<TypeScriptFileVoque>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromHubblepupTuple2<BoundaryTrieBVoque, ['']>({
    // TODO: make a more readable pattern for singletons
    gepp: BOUNDARY_TRIE_B_GEPP,
    framate: () => [''],
    croard: () => '',
  })
  .toHubblepup2<BoundedFileVoque>({
    gepp: BOUNDED_FILE_GEPP,
  })
  .onPinbe((file, [boundaryTrie]) => {
    const boundary = boundaryTrie.find(file.filePathPartList, isNotNull);

    if (boundary === null) {
      throw Error(`Unable to find boundary for file ${file.filePath}`);
    }

    return new BoundedFileInstance({
      boundary,
      file,
    });
  })
  .assemble();
