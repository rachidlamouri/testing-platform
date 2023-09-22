import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { OUTPUT_FILE_GEPP, OutputFileVoque } from '../output-file/outputFile';
import {
  ENGINE_PROGRAM_FILE_GEPP,
  EngineProgramFileVoque,
} from '../type-script-file-relationships/engineProgramFile';

/**
 * Creates the output "refreshSnapshot" file. The file is a shell script that runs all engine programs
 * for the purpose of updating their runtime profile snapshots.
 */
export const constructSnapshotScript = buildEstinant({
  name: 'constructSnapshotScript',
})
  .fromVoictent2<EngineProgramFileVoque>({
    gepp: ENGINE_PROGRAM_FILE_GEPP,
  })
  .toHubblepup2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe((inputList) => {
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
