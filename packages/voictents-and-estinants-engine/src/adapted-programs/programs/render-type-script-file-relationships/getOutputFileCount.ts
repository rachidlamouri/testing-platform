import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  OUTPUT_FILE_GEPP,
  OutputFileVoque,
} from '../../programmable-units/output-file/outputFile';
import {
  SANITY_SNAPSHOT_GEPP,
  SanitySnapshotVoque,
} from '../../programmable-units/sanity-snapshot/sanitySnapshot';

/**
 * Captures the number of generated output files. Commit the output file count
 * to check if changes to a program affect the number of output files.
 */
export const getOutputFileCount = buildEstinant({
  name: 'getOutputFileCount',
})
  .fromVoictent2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .toHubblepup2<SanitySnapshotVoque>({
    gepp: SANITY_SNAPSHOT_GEPP,
  })
  .onPinbe((outputFileList) => {
    return {
      zorn: 'output-file-count',
      grition: outputFileList.length,
    };
  })
  .assemble();
