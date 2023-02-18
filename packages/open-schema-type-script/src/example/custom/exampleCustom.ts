import { digikikify } from '../../core/digikikify';
import { eventDebuggerEstinant } from '../core/debugger/eventDebuggerEstinant';
import { quirmDebuggerEstinant } from '../core/debugger/quirmDebuggerEstinant';
import { blindCastEstinants } from '../adapter/blindCastEstinants';
import { fileAMentursection } from './file/fileAMentursection';
import { fileAEstinant } from './file/fileA';
import {
  CI_FILE_A_CONFIGURATION_QUIRM,
  SIMPLE_FILE_A_CONFIGURATION_QUIRM,
} from './file/fileAConfiguration';
import { fileAHasKnownExtensionSuffixEstinant } from './file/fileAHasKnownExtensionSuffix';
import { typeScriptFileBEstinant } from './file/typeScriptFileB';
import { validator } from './validation/validator';
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

digikikify({
  initialQuirmTuple: [
    SIMPLE_FILE_A_CONFIGURATION_QUIRM,
    CI_FILE_A_CONFIGURATION_QUIRM,
    EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_QUIRM,
  ],
  estinantTuple: blindCastEstinants([
    identifiableQuirmDebuggerEstinant,
    eventDebuggerEstinant,
    quirmDebuggerEstinant,
    fileAEstinant,
    fileAHasKnownExtensionSuffixEstinant,
    validator.validatorExecutor,
    validator.validationAggregator,
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
  ]),
});

// TODO: figure out how to not have to do this
export type ExampleCustom = symbol;
