import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  OUTPUT_FILE_COLLECTION_ID,
  OutputFileStreamMetatype,
} from '../output-file/outputFile';
import {
  ENGINE_PROGRAM_FILE_COLLECTION_ID,
  EngineProgramFileStreamMetatype,
} from '../engine-program-model/engineProgramFile';

/**
 * Creates the output "refreshSnapshot" file. The file is a shell script that runs all engine programs
 * for the purpose of updating their runtime profile snapshots.
 */
export const constructSnapshotScript = buildProgrammedTransform({
  name: 'constructSnapshotScript',
})
  .fromCollection2<EngineProgramFileStreamMetatype>({
    collectionId: ENGINE_PROGRAM_FILE_COLLECTION_ID,
  })
  .toItem2<OutputFileStreamMetatype>({
    collectionId: OUTPUT_FILE_COLLECTION_ID,
  })
  .onTransform((programFileCollection) => {
    const filePathSet = new Set(
      programFileCollection.list.map((input) => input.file.filePath.serialized),
    );

    const text = [...filePathSet]
      .map((filePath) => `npx ts-node "${filePath}"`)
      .join(' &&\\\n');

    return {
      fileName: 'refreshSnapshot',
      fileExtensionSuffix: 'sh',
      text,
    };
  })
  .assemble();
