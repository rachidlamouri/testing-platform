import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  OUTPUT_FILE_COLLECTION_ID,
  OutputFileStreamMetatype,
} from '../output-file/outputFile';
import {
  ENGINE_PROGRAM_FILE_GEPP,
  EngineProgramFileVoque,
} from '../type-script-file-relationships/engineProgramFile';

/**
 * Creates the output "refreshSnapshot" file. The file is a shell script that runs all engine programs
 * for the purpose of updating their runtime profile snapshots.
 */
export const constructSnapshotScript = buildProgrammedTransform({
  name: 'constructSnapshotScript',
})
  .fromCollection2<EngineProgramFileVoque>({
    collectionId: ENGINE_PROGRAM_FILE_GEPP,
  })
  .toItem2<OutputFileStreamMetatype>({
    collectionId: OUTPUT_FILE_COLLECTION_ID,
  })
  .onTransform((inputList) => {
    const filePathSet = new Set(
      inputList.map((input) => input.file.filePath.serialized),
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
