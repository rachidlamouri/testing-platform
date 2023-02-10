import { digikikify } from '../core/digikikify';
import { Estinant } from '../core/estinant';
import { Gepp } from '../core/gepp';
import { Quirm, QuirmTuple } from '../core/quirm';
import { TropoignantTypeName } from '../core/tropoignant';
import { blindCastEstinants } from './blindCastEstinants';
import { eventLogger } from './debugger/eventLogger';
import { odeshinLogger } from './debugger/odeshinLogger';
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

const myGeppA: Gepp = 'example-1';
const myGeppB: Gepp = 'example-2';
const myGeppC: Gepp = 'example-3';
const myGeppHello: Gepp = 'example-hello';
const myGeppGoodbye: Gepp = 'example-goodbye';

const myQuirm1: Quirm<string> = {
  geppTuple: [myGeppA, myGeppB],
  hubblepup: 'myself!',
};

const myQuirm2: Quirm<string> = {
  geppTuple: [myGeppA, myGeppC],
  hubblepup: 'someone else',
};

const myEstinant1: Estinant<string, QuirmTuple<string>> = {
  inputGepp: myGeppA,
  tropoignant: {
    typeName: TropoignantTypeName.Onama,
    process: function sayHello(input) {
      return [
        {
          geppTuple: [myGeppHello],
          hubblepup: `Hello ${input}`,
        },
      ];
    },
  },
};

const myEstinant2: Estinant<string, QuirmTuple<string>> = {
  inputGepp: myGeppC,
  tropoignant: {
    typeName: TropoignantTypeName.Onama,
    process: function sayGoodbye(input) {
      return [
        {
          geppTuple: [myGeppGoodbye],
          hubblepup: `Goodbye ${input}`,
        },
      ];
    },
  },
};

digikikify({
  initialQuirmTuple: [
    myQuirm1,
    myQuirm2,
    SIMPLE_FILE_A_CONFIGURATION_QUIRM,
    CI_FILE_A_CONFIGURATION_QUIRM,
  ],
  estinantTuple: blindCastEstinants([
    myEstinant1,
    myEstinant2,
    fileAEstinant,
    fileAHasKnownExtensionSuffixEstinant,
    validator.validatorExecutor,
    validator.validatorStreamer,
    eventLogger,
    odeshinLogger,
    fileAMentursection,
    typeScriptFileBEstinant,
    typeScriptFileCEstinant,
    typeScriptFileDEstinant,
    typeScriptFileDHasProperlyNamedExportValidation,
    yamlFileBEstinant,
  ]),
});

// TODO: figure out how to not have to do this
export type Example = symbol;
