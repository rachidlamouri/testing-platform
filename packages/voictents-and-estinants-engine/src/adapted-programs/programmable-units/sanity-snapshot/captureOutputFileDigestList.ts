import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  FileCacheOutputFile,
  OUTPUT_FILE_GEPP,
  OutputFileVoque,
} from '../output-file/outputFile';
import {
  SANITY_SNAPSHOT_COLLECTION_ID,
  SanitySnapshotVoque,
} from './sanitySnapshot';
import { getTextDigest } from '../../../package-agnostic-utilities/string/getTextDigest';

type OutputFileDigest = {
  fileName: string;
  digest: string;
};

/**
 * Captures a hash of all output files. If an output file changes then the
 * digest will change. Commit the digest list to be prompted to review any
 * output files that change.
 */
export const captureOutputFileDigestList = buildProgrammedTransform({
  name: 'captureOutputFileDigestList',
})
  .fromCollection2<OutputFileVoque>({
    collectionId: OUTPUT_FILE_GEPP,
  })
  .toItem2<SanitySnapshotVoque>({
    collectionId: SANITY_SNAPSHOT_COLLECTION_ID,
  })
  .onTransform((list) => {
    const digestList = list
      .filter(
        (file): file is FileCacheOutputFile => file.fileName !== undefined,
      )
      .map<OutputFileDigest>((file) => {
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
