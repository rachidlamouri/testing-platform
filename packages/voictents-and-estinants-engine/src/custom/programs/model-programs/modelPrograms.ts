import {
  buildVoictentByGepp,
  digikikify,
} from '../../../type-script-adapter/digikikify';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import {
  categorizeFiles,
  categorizeFiles2,
} from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import {
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
  EngineFunctionConfigurationVoque,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { getProgramBodyDeclarationsByIdentifier } from '../../programmable-units/type-script-file/programBodyDeclarationsByIdentifier';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { addInteractivityToSvgDocument } from '../../programmable-units/graph-visualization/addInteractivityToSvgDocument';
import { renderGraphvizCodeToSvgDocument } from '../../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { filterEngineProgramFile } from '../../programmable-units/type-script-file-relationships/filterEngineProgramFile';
import { getEngineEstinantLocatorCollection2 } from '../../programmable-units/engine-program/getEngineEstinantLocatorCollection2';
import { getEngineProgram3 } from '../../programmable-units/engine-program/getEngineProgram3';
import { captureOutputFileDigestList } from '../../programmable-units/captureOutputFileDigestList';
import { signalError } from '../../programmable-units/error/signalError';
import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import { SANITY_SNAPSHOT_GEPP } from '../../programmable-units/sanitySnapshot';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { OutputFileVoictent } from '../../programmable-units/output-file/outputFileVoictent';
import { DigikikifierStrategy } from '../../../core/engine/digikikify';
import { getEngineVoque2 } from '../../programmable-units/engine-program/getEngineVoque2';
import { getEngineEstinant3 } from '../../programmable-units/engine-program/getEngineEstinant3';
import { getEngineProgramLocator3 } from '../../programmable-units/engine-program/getEngineProgramLocator3';
import { getEngineVoqueLocatorCollection2 } from '../../programmable-units/engine-program/getEngineVoqueLocatorCollection2';
import { getEngineEstinantGraphElements } from './getEngineEstinantGraphElements';
import { getEngineProgramVoqueElements } from './getEngineProgramVoqueElements';
import { getDirectedGraphMetadataById2 } from './getDirectedGraphMetadataById2';
import { getEngineEstinantMetadataEntry } from './getEngineEstinantMetadataEntry';
import { getInputMetdataEntry } from './getInputMetdataEntry';
import { getEngineVoqueMetadataEntry } from './getEngineVoqueMetadataEntry';
import { getTopLevelEngineProgramGraphElements } from './getTopLevelEngineProgramGraphElements';
import { getInputEdges } from './getInputEdges';
import { getOutputEdge } from './getOutputEdge';
import { groupGraphElements } from './groupGraphElements';
import { getDirectedGraphFromGraphElementGroup } from './getDirectedGraphFromGraphElementGroup';
import { getTopLevelEngineProgramMetadataEntries } from './getTopLevelEngineProgramMetadataEntries';
import { PROGRAM_ERROR_GEPP } from '../../programmable-units/error/programError';
import { assertNoCopyPasta } from './assertNoCopyPasta';
import { defaultFileGeppCombination } from '../../programmable-units/file/defaultFileGeppCombination';

const programFileCache = new ProgramFileCache({
  namespace: 'modelPrograms',
});

/**
 * Creates an interactive model for each engine program.
 */
digikikify({
  explicitVoictentTuple: [
    new InMemoryVoictent<FileSystemObjectEnumeratorConfigurationVoque>({
      gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialHubblepupPelueTuple: [
        VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
      ],
    }),
    new InMemoryVoictent<EngineFunctionConfigurationVoque>({
      gepp: ENGINE_FUNCTION_CONFIGURATION_GEPP,
      initialHubblepupPelueTuple: [
        CORE_ENGINE_FUNCTION_CONFIGURATION,
        CORE_ENGINE_FUNCTION_2_CONFIGURATION,
        ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
      ],
    }),
  ] as const,
  fileSystemNodeGeppCombination: defaultFileGeppCombination,
  uninferableVoictentByGepp: buildVoictentByGepp([
    new ProgramErrorVoictent({
      programFileCache,
    }),
    new OutputFileVoictent({
      programFileCache,
    }),
  ] as const),
  errorGepp: PROGRAM_ERROR_GEPP,
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,
    categorizeFiles2,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    getCommentedProgramBodyDeclarationList,
    getProgramBodyDeclarationsByIdentifier,
    getTypeScriptFileImportList,

    filterEngineProgramFile,
    getEngineProgramLocator3,
    getEngineEstinantLocatorCollection2,
    getEngineEstinant3,
    getEngineProgram3,
    getEngineVoqueLocatorCollection2,
    getEngineVoque2,

    getTopLevelEngineProgramGraphElements,
    getEngineProgramVoqueElements,
    getEngineEstinantGraphElements,
    getInputEdges,
    getOutputEdge,
    groupGraphElements,
    getDirectedGraphFromGraphElementGroup,

    getTopLevelEngineProgramMetadataEntries,
    getEngineVoqueMetadataEntry,
    getEngineEstinantMetadataEntry,
    getInputMetdataEntry,
    getDirectedGraphMetadataById2,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,

    captureOutputFileDigestList,

    assertNoCopyPasta,

    reportErrors,
    signalError,
  ] as const,
  programFileCache,
  serializeeGeppList: [
    // note: keep this is a multiline list for easier debugging
    SANITY_SNAPSHOT_GEPP,
  ],
  strategy: DigikikifierStrategy.WaitForAllDependencies,
});
