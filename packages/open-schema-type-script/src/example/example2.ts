import { digikikify } from '../core/digikikify';
import { blindCastEstinants } from './blindCastEstinants';
import { eventLogger } from '../type-script-adapter/debugger/eventLogger';
import { odeshinLogger } from '../type-script-adapter/debugger/odeshinLogger';
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

digikikify({
  initialQuirmTuple: [
    SIMPLE_FILE_A_CONFIGURATION_QUIRM,
    CI_FILE_A_CONFIGURATION_QUIRM,
    EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_QUIRM,
  ],
  estinantTuple: blindCastEstinants([
    fileAEstinant,
    fileAHasKnownExtensionSuffixEstinant,
    validator.validatorExecutor,
    validator.validationAggregator,
    eventLogger,
    odeshinLogger,
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
  ]),
});

// TODO: figure out how to not have to do this
export type Example2 = symbol;
