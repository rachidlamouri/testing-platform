import { buildEstinant } from '../adapter/estinant-builder/estinantBuilder';
import { OutputFileVoictent, OUTPUT_FILE_GEPP } from './output-file/outputFile';
import { SANITY_SNAPSHOT_GEPP, SanitySnapshotVoictent } from './sanitySnapshot';
import { getTextDigest } from '../../utilities/getTextDigest';

type OutputFileDigest = {
  fileName: string;
  digest: string;
};

export const captureOutputFileDigestList = buildEstinant({
  name: 'captureOutputFileDigestList',
})
  .fromVoictent<OutputFileVoictent>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .toHubblepup<SanitySnapshotVoictent>({
    gepp: SANITY_SNAPSHOT_GEPP,
  })
  .onPinbe((list) => {
    const digestList = list.map<OutputFileDigest>((file) => {
      return {
        fileName: file.fileName,
        digest: getTextDigest(file.text),
      };
    });

    digestList.sort((digestA, digestB) => {
      if (digestA.fileName < digestB.fileName) {
        return -1;
      }

      return 1;
    });

    return {
      zorn: 'output-file-digest-list',
      grition: digestList,
    };
  })
  .assemble();
