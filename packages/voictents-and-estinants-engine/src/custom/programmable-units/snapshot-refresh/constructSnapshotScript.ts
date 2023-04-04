import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  OUTPUT_FILE_GEPP,
  OutputFileVoictent,
} from '../output-file/outputFile';
import {
  FILTERED_ENGINE_PROGRAM_GEPP,
  FilteredEngineProgramVoictent,
} from './filteredEngineProgram';

export const constructSnapshotScript = buildEstinant()
  .fromOdeshinVoictent<FilteredEngineProgramVoictent>({
    gepp: FILTERED_ENGINE_PROGRAM_GEPP,
  })
  .toHubblepup<OutputFileVoictent>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe((inputList) => {
    const filePathSet = new Set(inputList.map((input) => input.filePath));

    const text = [...filePathSet]
      .map((filePath) => `npx ts-node "${filePath}"`)
      .join('&&\\\n');

    return {
      fileName: 'refreshSnapshot',
      fileExtensionSuffix: 'sh',
      text,
    };
  })
  .assemble();
