import { digikikify } from '../../core/digikikify';
import { eventDebuggerEstinant } from '../core/debugger/eventDebuggerEstinant';
import { quirmDebuggerEstinant } from '../core/debugger/quirmDebuggerEstinant';
import { fileAMentursection } from './file/fileAMentursection';
import { fileAEstinant } from './file/fileA';
import {
  CI_FILE_A_CONFIGURATION_QUIRM,
  SIMPLE_FILE_A_CONFIGURATION_QUIRM,
} from './file/fileAConfiguration';
import { fileAHasKnownExtensionSuffixEstinant } from './file/fileAHasKnownExtensionSuffix';
import { typeScriptFileBEstinant } from './file/typeScriptFileB';
import {
  validationAggregator,
  validatorExecutor,
} from './validation/validator';
import { typeScriptFileCEstinant } from './file/typeScriptFileC';
import { typeScriptFileDEstinant } from './file/typeScriptFileD';
import { typeScriptFileDHasProperlyNamedExportValidation } from './file/typeScriptFileDHasProperlyNamedExportValidation';
import { yamlFileBEstinant } from './file/yamlFileB';
import { actualCiYamlFileMentursection } from './ciYamlFile/actualCiYamlFile';
import { EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_QUIRM } from './ciYamlFile/expectedCiYamlFileContentsConfiguration';
import { expectedCiYamlFileContentsOnama } from './ciYamlFile/expectedCiYamlFileContents';
import { assertableCiYamlFileCortmumEstinant } from './ciYamlFile/assertableCiYamlFileContents';
import { assertableCiYamlFileContentsDifferenceOnama } from './ciYamlFile/assertableCiYamlFileContentsDifference';
import { ciYamlFileValidationEstinant } from './ciYamlFile/ciYamlFileValidationEstinant';
import { identifiableQuirmDebuggerEstinant } from '../../custom-adapter/identifiableQuirmDebuggerEstinant';
import { typeScriptFileD2Estinant } from './program/typeScriptFileD2';
import { programFileAEstinant } from './program/programFileA';
import { programFileBEstinant } from './program/programFileB';
import {
  programFileCEstinant1,
  programFileCEstinant2,
} from './program/programFileC';
import { programFileRendererEstinant } from './program/programFileRendererEstinant';

digikikify({
  initialQuirmTuple: [
    SIMPLE_FILE_A_CONFIGURATION_QUIRM,
    CI_FILE_A_CONFIGURATION_QUIRM,
    EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_QUIRM,
  ],
  estinantTuple: [
    identifiableQuirmDebuggerEstinant,
    eventDebuggerEstinant,
    quirmDebuggerEstinant,
    fileAEstinant,
    fileAHasKnownExtensionSuffixEstinant,
    validatorExecutor,
    validationAggregator,
    fileAMentursection,
    typeScriptFileBEstinant,
    typeScriptFileCEstinant,
    typeScriptFileDEstinant,
    typeScriptFileDHasProperlyNamedExportValidation,
    yamlFileBEstinant,
    actualCiYamlFileMentursection,
    expectedCiYamlFileContentsOnama,
    assertableCiYamlFileCortmumEstinant,
    assertableCiYamlFileContentsDifferenceOnama,
    ciYamlFileValidationEstinant,
    typeScriptFileD2Estinant,
    programFileAEstinant,
    programFileBEstinant,
    programFileCEstinant1,
    programFileCEstinant2,
    programFileRendererEstinant,
  ],
});

// TODO: figure out how to not have to do this
export type ExampleCustom = symbol;
