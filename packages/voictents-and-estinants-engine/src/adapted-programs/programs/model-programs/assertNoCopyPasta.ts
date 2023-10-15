import * as uuid from 'uuid';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
  EngineProgrammedTransform3StreamMetatype,
} from '../../programmable-units/engine-program/engineEstinant3';
import {
  ENGINE_PROGRAM_3_COLLECTION_ID,
  EngineProgram3StreamMetatype,
} from '../../programmable-units/engine-program/engineProgram3';
import {
  ENGINE_STREAM_METATYPE_2_COLLECTION_ID,
  EngineStreamMetatype2StreamMetatype,
} from '../../programmable-units/engine-program/engineVoque2';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorElementLocatorTypeName,
  ProgramErrorEgg,
  ReportingProgrammedTransformLocator,
} from '../../programmable-units/error/programError';
import { EngineProgrammedTransformLocator2TypeName } from '../../programmable-units/engine-program/engineEstinantLocator2';

const PROGRAMMED_TRANSFORM_NAME = 'assertNoCopyPasta' as const;
type ProgrammedTransformName = typeof PROGRAMMED_TRANSFORM_NAME;
type ReportingLocator =
  ReportingProgrammedTransformLocator<ProgrammedTransformName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: PROGRAMMED_TRANSFORM_NAME,
  filePath: __filename,
};

/**
 * Checks if any programs, transforms, or collection item types have the exact
 * same description. This usually indicates that some code was copied and the
 * description was not changed
 */
export const assertNoCopyPasta = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromCollection2<EngineProgram3StreamMetatype>({
    collectionId: ENGINE_PROGRAM_3_COLLECTION_ID,
  })
  .andFromCollection2<EngineStreamMetatype2StreamMetatype>({
    collectionId: ENGINE_STREAM_METATYPE_2_COLLECTION_ID,
  })
  .andFromCollection2<EngineProgrammedTransform3StreamMetatype>({
    collectionId: ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((programList, streamMetatypeList, programmedTransformList) => {
    const describedProgramEntryList = programList.map((program) => {
      return [program.description, { program }] as const;
    });

    const describedStreamMetatypeEntryList = streamMetatypeList.map(
      (streamMetatype) => {
        return [streamMetatype.commentText, { streamMetatype }] as const;
      },
    );

    const describedProgrammedTransformEntryList = programmedTransformList.map(
      (programmedTransform) => {
        return [
          programmedTransform.commentText,
          { programmedTransform },
        ] as const;
      },
    );

    const duplicateDescribedDatumByDescription = new Map<string, unknown[]>();

    [
      ...describedProgramEntryList,
      ...describedStreamMetatypeEntryList,
      ...describedProgrammedTransformEntryList.filter(
        ([, { programmedTransform }]) => {
          return (
            programmedTransform.locator.typeName !==
            EngineProgrammedTransformLocator2TypeName.BuildAddMetadataForSerialization
          );
        },
      ),
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
