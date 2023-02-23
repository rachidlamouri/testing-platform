import { digikikify } from '../core/digikikify';
import { FILE_A_CONFIGURATION_QUIRM } from './programmable-units/fileAConfigurationQuirm';
import { tsvFileBEstinant } from './programmable-units/tsvFileB';
import { locationSetEstinant } from './programmable-units/locationSet';
import { fileAEstinant } from '../example/custom/file/fileA';
import { fileAHasKnownExtensionSuffixEstinant } from '../example/custom/file/fileAHasKnownExtensionSuffix';
import { fileAMentursection } from '../example/custom/file/fileAMentursection';
import {
  validatorExecutor,
  validationAggregator,
} from '../example/custom/validation/validator';
import { identifiableQuirmDebuggerEstinant } from '../custom-adapter/identifiableQuirmDebuggerEstinant';
import { quirmDebuggerEstinant } from '../example/core/debugger/quirmDebuggerEstinant';
import { outputHtmlFileEstinant } from './programmable-units/outputHtmlFileEstinant';

digikikify({
  initialQuirmTuple: [FILE_A_CONFIGURATION_QUIRM],
  estinantTuple: [
    identifiableQuirmDebuggerEstinant,
    quirmDebuggerEstinant,
    fileAEstinant,
    fileAHasKnownExtensionSuffixEstinant,
    validatorExecutor,
    validationAggregator,
    fileAMentursection,
    tsvFileBEstinant,
    locationSetEstinant,
    outputHtmlFileEstinant,
  ],
});
