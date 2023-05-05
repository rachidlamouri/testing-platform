import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  OUTPUT_FILE_GEPP,
  OutputFileVoictent,
} from '../../programmable-units/output-file/outputFile';
import {
  SANITY_SNAPSHOT_GEPP,
  SanitySnapshotVoictent,
} from '../../programmable-units/sanitySnapshot';

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
