import * as uuid from 'uuid';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  ENGINE_ESTINANT_3_GEPP,
  EngineEstinant3Voque,
} from '../../programmable-units/engine-program/engineEstinant3';
import {
  ENGINE_PROGRAM_3_GEPP,
  EngineProgram3Voque,
} from '../../programmable-units/engine-program/engineProgram3';
import {
  ENGINE_VOQUE_2_GEPP,
  EngineVoque2Voque,
} from '../../programmable-units/engine-program/engineVoque2';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorElementLocatorTypeName,
  ProgramErrorEgg,
  ReportingProgrammedTransformLocator,
} from '../../programmable-units/error/programError';
import { EngineEstinantLocator2TypeName } from '../../programmable-units/engine-program/engineEstinantLocator2';

const ESTINANT_NAME = 'assertNoCopyPasta' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingProgrammedTransformLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Checks if any programs, transforms, or collection item types have the exact
 * same description. This usually indicates that some code was copied and the
 * description was not changed
 */
export const assertNoCopyPasta = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromCollection2<EngineProgram3Voque>({
    collectionId: ENGINE_PROGRAM_3_GEPP,
  })
  .andFromCollection2<EngineVoque2Voque>({
    collectionId: ENGINE_VOQUE_2_GEPP,
  })
  .andFromCollection2<EngineEstinant3Voque>({
    collectionId: ENGINE_ESTINANT_3_GEPP,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((programList, voqueList, estinantList) => {
    const describedProgramEntryList = programList.map((program) => {
      return [program.description, { program }] as const;
    });

    const describedVoqueEntryList = voqueList.map((voque) => {
      return [voque.commentText, { voque }] as const;
    });

    const describedEstinantEntryList = estinantList.map((estinant) => {
      return [estinant.commentText, { estinant }] as const;
    });

    const duplicateDescribedDatumByDescription = new Map<string, unknown[]>();

    [
      ...describedProgramEntryList,
      ...describedVoqueEntryList,
      ...describedEstinantEntryList.filter(([, { estinant }]) => {
        return (
          estinant.locator.typeName !==
          EngineEstinantLocator2TypeName.BuildAddMetadataForSerialization
        );
      }),
    ]
      .filter(([description]) => {
        return description !== '';
      })
      .forEach(([description, datum]) => {
        const group =
          duplicateDescribedDatumByDescription.get(description) ?? [];
        group.push(datum);
        duplicateDescribedDatumByDescription.set(description, group);
      });

    const errorList = [...duplicateDescribedDatumByDescription.entries()]
      .filter(([, group]) => group.length > 1)
      .map(([description, duplicateDescriptionGroup]) => {
        return {
          // TODO: remove the need for this unique identfier
          name: `no-copy-pasta/${uuid.v4()}`,
          error: new Error(
            'Encountered two or more program elements with the same description',
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: '',
          },
          context: {
            description,
            duplicateDescriptionGroup,
          },
        } satisfies ProgramErrorEgg<ReportingLocator>;
      });

    return errorList;
  })
  .assemble();
