import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  PARSED_TYPE_SCRIPT_FILE_GEPP,
  ParsedTypeScriptFileVoictent,
} from '../type-script-file/parsedTypeScriptFile';
import {
  ENGINE_ESTINANT_LOCATOR_2_GEPP,
  EngineEstinantLocator2,
  EngineEstinantLocator2Voictent,
  getEngineEstinantLocatorZorn,
} from './engineEstinantLocator2';
import {
  ENGINE_PROGRAM_LOCATOR_2_GEPP,
  EngineProgramLocator2Voictent,
} from './engineProgramLocator2';

export const getEngineEstinantLocatorCollection = buildEstinant({
  name: 'getEngineEstinantLocatorCollection',
})
  /*
    TODO: Do this better. This input is being used as a delay. We need to:
    - capture the semantics of this behavior in the builder chain
    - provide a usable signal when an estinant fails
  */
  .fromOdeshinVoictent<ParsedTypeScriptFileVoictent>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromOdeshinVoictent<EngineProgramLocator2Voictent>({
    gepp: ENGINE_PROGRAM_LOCATOR_2_GEPP,
  })
  .toHubblepupTuple<EngineEstinantLocator2Voictent>({
    gepp: ENGINE_ESTINANT_LOCATOR_2_GEPP,
  })
  .onPinbe((unused, engineProgramLocatorList) => {
    const entries = engineProgramLocatorList
      .flatMap(
        (engineProgramLocator) =>
          engineProgramLocator.engineEstinantLocatorList,
      )
      .map((engineEstinantLocator): [string, EngineEstinantLocator2] => [
        getEngineEstinantLocatorZorn(engineEstinantLocator),
        engineEstinantLocator,
      ]);

    const locatorByZorn = new Map<string, EngineEstinantLocator2>(entries);

    const uniqueLocatorList = [...locatorByZorn.values()];

    const outputList = uniqueLocatorList.map((locator) => {
      return {
        zorn: getEngineEstinantLocatorZorn(locator),
        grition: locator,
      };
    });

    return outputList;
  })
  .assemble();
