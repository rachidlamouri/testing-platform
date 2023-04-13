import { digikikify } from '../../../type-script-adapter/digikikify';
import { buildQuirmDebugger } from '../../debugger/quirmDebugger';
import { categorizeFiles } from '../file/categorizeFiles';
import { enumerateFileSystemObjects } from '../file/enumerateFileSystemObjects';
import { FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP } from '../file/fileSystemObjectEnumeratorConfiguration';
import { constructLocationSvg } from './constructLocationSvg';
import { parseTsvFile } from './parseTsvFiles';
import { populateHtmlFile } from './populateHtmlFile';

digikikify({
  initialVoictentsByGepp: {
    [FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP]: [
      {
        directoryPath:
          'packages/voictents-and-estinants-engine/src/custom/programmable-units/minecraft',
        ignoredNodePathConfigurationList: [],
      },
    ],
  },
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,
    parseTsvFile,
    constructLocationSvg,
    populateHtmlFile,
  ],
  quirmDebugger: buildQuirmDebugger('assembleSubwayMap'),
});
