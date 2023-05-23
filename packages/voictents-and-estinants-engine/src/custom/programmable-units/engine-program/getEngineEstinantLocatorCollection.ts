import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  PARSED_TYPE_SCRIPT_FILE_GEPP,
  ParsedTypeScriptFileVoque,
} from '../type-script-file/parsedTypeScriptFile';
import {
  ENGINE_ESTINANT_LOCATOR_2_GEPP,
  EngineEstinantLocator2,
  EngineEstinantLocator2Voque,
} from './engineEstinantLocator2';
import {
  ENGINE_PROGRAM_LOCATOR_2_GEPP,
  EngineProgramLocator2Voque,
} from './engineProgramLocator2';

/**
 * Consumes the entire collection of engine program locators in order to
 * deduplicate their estinant locator information. This transform makes sure
 * that each estinant is only processed once.
 */
export const getEngineEstinantLocatorCollection = buildEstinant({
  name: 'getEngineEstinantLocatorCollection',
})
  /*
    TODO: Do this better. This input is being used as a delay. We need to:
    - capture the semantics of this behavior in the builder chain
    - provide a usable signal when an estinant fails
  */
  .fromVoictent2<ParsedTypeScriptFileVoque>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromVoictent2<EngineProgramLocator2Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_2_GEPP,
  })
  .toHubblepupTuple2<EngineEstinantLocator2Voque>({
    gepp: ENGINE_ESTINANT_LOCATOR_2_GEPP,
  })
  .onPinbe((unused, engineProgramLocatorList) => {
    const entries = engineProgramLocatorList
      .flatMap(
        (engineProgramLocator) =>
          engineProgramLocator.engineEstinantLocatorList,
      )
      .map((engineEstinantLocator): [string, EngineEstinantLocator2] => [
        engineEstinantLocator.zorn,
        engineEstinantLocator,
      ]);

    const locatorByZorn = new Map<string, EngineEstinantLocator2>(entries);

    const uniqueLocatorList = [...locatorByZorn.values()];

    return uniqueLocatorList;
  })
  .assemble();
