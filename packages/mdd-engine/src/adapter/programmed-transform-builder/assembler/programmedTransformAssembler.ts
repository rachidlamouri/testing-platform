import { RightInputStreamConfiguration } from '../../../core/types/stream-configuration/input/right/rightInputStreamConfiguration';
import {
  ProgrammedTransform2,
  GenericProgrammedTransform2,
} from '../../../core/types/programmed-transform/programmedTransform';
import { GenericCoreTransform2 } from '../../../core/types/programmed-transform/coreTransform';
import { GenericLeftInputStreamConnectionMetatype } from '../../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import {
  GenericRightInputItemTupleStreamConnectionMetatype,
  GenericRightInputStreamConnectionMetatypeTuple,
  GenericRightInputCollectionStreamConnectionMetatype,
} from '../../../core/types/stream-connection-metatype/rightInputStreamConnectionMetatype';
import {
  DeprecatedId,
  IdTuple,
} from '../../../package-agnostic-utilities/data-structure/id';
import {
  AssemblerContext,
  CoreConstituentOutputEntry,
} from '../shared/programmedTransformBuilderContext';
import {
  CoreOutputStreamConnectionMetatypeFromAdaptedOutputStreamConnectionMetatypeTuple,
  GenericAdaptedOutputStreamConnectionMetatypeTuple,
} from '../shared/streamConnectionMetatype';

/**
 * Constructs a programmed transform given all of the context accumulated by the builder
 * chain
 *
 * @readableName ProgrammedTransformAssembler
 */
type ProgrammedTransformAssembler<
  TLeftInputStreamConnectionMetatype extends GenericLeftInputStreamConnectionMetatype,
  TRightInputStreamConnectionMetatypeTuple extends GenericRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = () => ProgrammedTransform2<
  TLeftInputStreamConnectionMetatype,
  TRightInputStreamConnectionMetatypeTuple,
  CoreOutputStreamConnectionMetatypeFromAdaptedOutputStreamConnectionMetatypeTuple<TAdaptedOutputStreamConnectionMetatypeTuple>
>;

export const buildProgrammedTransformAssembler = <
  TLeftInputStreamConnectionMetatype extends GenericLeftInputStreamConnectionMetatype,
  TRightInputStreamConnectionMetatypeTuple extends GenericRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
>(
  assemblerContext: AssemblerContext,
): ProgrammedTransformAssembler<
  TLeftInputStreamConnectionMetatype,
  TRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple
> => {
  const assembleProgrammedTransform: ProgrammedTransformAssembler<
    TLeftInputStreamConnectionMetatype,
    TRightInputStreamConnectionMetatypeTuple,
    TAdaptedOutputStreamConnectionMetatypeTuple
  > = () => {
    const {
      instantiationContext,
      inputContext: { leftInputContext, rightInputContextTuple },
      outputContext,
    } = assemblerContext;

    const transform: GenericCoreTransform2 = (
      leftInput,
      ...rightInputTuple
    ) => {
      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      const modifiedLeftInput =
        leftInputContext.modifyCoreTransformInput(leftInput);

      const modifiedRightInputTuple = rightInputContextTuple.map(
        (rightInputContext, index) => {
          const adaptedRightInput = rightInputTuple[index];

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return rightInputContext.modifyCoreTransformInput(adaptedRightInput);
        },
      );
      const modifiedOutput = assemblerContext.transform(
        modifiedLeftInput,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ...modifiedRightInputTuple,
      );

      const aggregatedOutput =
        outputContext.aggregateAdaptedTransformOutput(modifiedOutput);

      const outputEntryList =
        outputContext.constituentResultNormalizerList.map<CoreConstituentOutputEntry>(
          (normalizeResult) => {
            const outputEntry = normalizeResult(
              leftInput,
              modifiedLeftInput,
              aggregatedOutput,
            );
            return outputEntry;
          },
        );
      /* eslint-enable @typescript-eslint/no-unsafe-assignment */

      const output = Object.fromEntries(outputEntryList);

      return output;
    };

    const programmedTransform = {
      name: instantiationContext.name,
      leftInputStreamConfiguration: {
        collectionId: leftInputContext.collectionId,
        isCollectionStream: leftInputContext.isCollectionStream,
      },
      rightInputStreamConfigurationTuple: rightInputContextTuple.map(
        (rightInputContext) => {
          if (rightInputContext.isCollectionStream) {
            return {
              collectionId: rightInputContext.collectionId,
              isCollectionStream: rightInputContext.isCollectionStream,
              getRightKeyTuple: undefined,
              getRightKey: undefined,
            } satisfies RightInputStreamConfiguration<
              GenericLeftInputStreamConnectionMetatype,
              GenericRightInputCollectionStreamConnectionMetatype
            >;
          }

          return {
            collectionId: rightInputContext.collectionId,
            isCollectionStream: rightInputContext.isCollectionStream,
            getRightKeyTuple: (leftInput): IdTuple => {
              return rightInputContext.getRightKeyTuple(leftInput) as IdTuple;
            },
            getRightKey: (rightInput): DeprecatedId => {
              return rightInputContext.getRightKey(rightInput);
            },
          } satisfies RightInputStreamConfiguration<
            GenericLeftInputStreamConnectionMetatype,
            GenericRightInputItemTupleStreamConnectionMetatype
          >;
        },
      ),
      outputStreamConfiguration: {
        collectionIdTuple: outputContext.collectionIdTuple,
      },
      transform,
    } satisfies GenericProgrammedTransform2 as unknown as ProgrammedTransform2<
      TLeftInputStreamConnectionMetatype,
      TRightInputStreamConnectionMetatypeTuple,
      CoreOutputStreamConnectionMetatypeFromAdaptedOutputStreamConnectionMetatypeTuple<TAdaptedOutputStreamConnectionMetatypeTuple>
    >;
    return programmedTransform;
  };

  return assembleProgrammedTransform;
};

export type ProgrammedTransformAssemblerParent<
  TLeftInputStreamConnectionMetatype extends GenericLeftInputStreamConnectionMetatype,
  TRightInputStreamConnectionMetatypeTuple extends GenericRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = {
  assemble: ProgrammedTransformAssembler<
    TLeftInputStreamConnectionMetatype,
    TRightInputStreamConnectionMetatypeTuple,
    TAdaptedOutputStreamConnectionMetatypeTuple
  >;
};
