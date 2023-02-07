import { digikikify } from '../core/digikikify';
import { Estinant, WortinatorEstinant } from '../core/estinant';
import { Gepp } from '../core/gepp';
import { Quirm, QuirmTuple } from '../core/quirm';
import { TropoignantTypeName, Wortinator } from '../core/tropoignant';
import { logger } from '../utilities/logger';
import { blindCastEstinants } from './blindCastEstinants';
import { fileAEstinant } from './file/fileA';
import { SIMPLE_FILE_A_CONFIGURATION_QUIRM } from './file/fileAConfiguration';
import { fileAHasKnownExtensionSuffixEstinant } from './file/fileAHasKnownExtensionSuffix';
import {
  ValidationResultOdeshin,
  VALIDATION_RESULT_GEPP,
} from './validation/validationResult';

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

let validValidationCount = 0;
const errorMessages: string[] = [];
const myValidationWortinator: Wortinator<ValidationResultOdeshin> = {
  typeName: TropoignantTypeName.Wortinator,
  process: function onValidationResult(inputOdeshin) {
    if (!inputOdeshin.grition.isValid) {
      errorMessages.push(
        `"${inputOdeshin.grition.identifier}" does not satisfy "${inputOdeshin.grition.predicate}"`,
      );
    } else {
      validValidationCount += 1;
    }
  },
};

digikikify({
  initialQuirmTuple: [myQuirm1, myQuirm2, SIMPLE_FILE_A_CONFIGURATION_QUIRM],
  estinantTuple: blindCastEstinants([
    myEstinant1,
    myEstinant2,
    fileAEstinant,
    fileAHasKnownExtensionSuffixEstinant,
    {
      inputGepp: VALIDATION_RESULT_GEPP,
      tropoignant: myValidationWortinator,
    } satisfies WortinatorEstinant<ValidationResultOdeshin>,
  ]),
});

logger.feedLine();
if (errorMessages.length > 0) {
  errorMessages.forEach((message, index) => {
    logger.logText(`  Validation Error ${index}`);
    logger.logText(`  ${message}`);
    logger.feedLine();
  });

  process.exit(1);
} else {
  logger.logText(`Successful validation count: ${validValidationCount}`);
}
