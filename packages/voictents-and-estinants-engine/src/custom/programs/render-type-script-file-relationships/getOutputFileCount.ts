import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  OUTPUT_FILE_GEPP,
  OutputFileVoictent,
} from '../../programmable-units/output-file/outputFile';
import {
  SANITY_SNAPSHOT_GEPP,
  SanitySnapshotVoictent,
} from '../../programmable-units/sanitySnapshot';

/**
 * Captures the number of generated output files. Commit the output file count
 * to check if changes to a program affect the number of output files.
 */
export const getOutputFileCount = buildEstinant({
  name: 'getOutputFileCount',
})
  .fromVoictent<OutputFileVoictent>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .toHubblepup<SanitySnapshotVoictent>({
    gepp: SANITY_SNAPSHOT_GEPP,
  })
  .onPinbe((outputFileList) => {
    return {
      zorn: 'output-file-count',
      grition: outputFileList.length,
    };
  })
  .assemble();
