import { RightInputStreamConfiguration } from '../../../core/types/stream-configuration/input/right/rightInputStreamConfiguration';
import {
  ProgrammedTransform2,
  GenericProgrammedTransform2,
} from '../../../core/types/programmed-transform/programmedTransform';
import { GenericCoreTransform2 } from '../../../core/types/programmed-transform/coreTransform';
import { GenericIndexedItem } from '../../../core/types/item/item';
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
 * Constructs an estinant given all of the context accumulated by the builder
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
      let adaptedLeftInput: unknown;
      if (
        leftInputContext.isCollectionStream ||
        leftInputContext.version === 2
      ) {
        adaptedLeftInput = leftInput;
      } else {
        adaptedLeftInput = (leftInput as GenericIndexedItem).item;
      }

      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      const modifiedLeftInput =
        leftInputContext.modifyCoreTransformInput(adaptedLeftInput);

      const modifiedRightInputTuple = rightInputContextTuple.map(
        (rightInputContext, index) => {
          let adaptedRightInput: unknown;
          if (
            rightInputContext.isCollectionStream ||
            rightInputContext.version === 2
          ) {
            adaptedRightInput = rightInputTuple[index];
          } else {
            adaptedRightInput = (rightInputTuple[index] as GenericIndexedItem)
              .item;
          }

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
              adaptedLeftInput,
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
      version: 2,
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
              let adaptedLeftInput: unknown;
              if (
                leftInputContext.isCollectionStream ||
                leftInputContext.version === 2
              ) {
                adaptedLeftInput = leftInput;
              } else {
                adaptedLeftInput = (leftInput as GenericIndexedItem).item;
              }

              return rightInputContext.getRightKeyTuple(
                adaptedLeftInput,
              ) as IdTuple;
            },
            getRightKey: (indexedRightInput): DeprecatedId => {
              let adaptedRightInput: unknown;
              if (
                rightInputContext.isCollectionStream ||
                rightInputContext.version === 2
              ) {
                adaptedRightInput = indexedRightInput;
              } else {
                adaptedRightInput = indexedRightInput.item;
              }

              return rightInputContext.getRightKey(adaptedRightInput);
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
