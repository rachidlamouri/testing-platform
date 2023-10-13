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
} from '../shared/estinantBuilderContext';
import {
  CoreOutputVickenFromAdaptedOutputVickenTuple,
  GenericAdaptedOutputVickenTuple,
} from '../shared/vicken';

/**
 * Constructs an estinant given all of the context accumulated by the builder
 * chain
 *
 * @readableName ProgrammedTransformAssembler
 */
type EstinantAssembler<
  TLeftInputVicken extends GenericLeftInputStreamConnectionMetatype,
  TRightInputVickenTuple extends GenericRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = () => ProgrammedTransform2<
  TLeftInputVicken,
  TRightInputVickenTuple,
  CoreOutputVickenFromAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple>
>;

export const buildEstinantAssembler = <
  TLeftInputVicken extends GenericLeftInputStreamConnectionMetatype,
  TRightInputVickenTuple extends GenericRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
>(
  assemblerContext: AssemblerContext,
): EstinantAssembler<
  TLeftInputVicken,
  TRightInputVickenTuple,
  TAdaptedOutputVickenTuple
> => {
  const assembleEstinant: EstinantAssembler<
    TLeftInputVicken,
    TRightInputVickenTuple,
    TAdaptedOutputVickenTuple
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
      if (leftInputContext.isWibiz || leftInputContext.version === 2) {
        adaptedLeftInput = leftInput;
      } else {
        adaptedLeftInput = (leftInput as GenericIndexedItem).item;
      }

      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      const modifiedLeftInput =
        leftInputContext.modifyTropoignantInput(adaptedLeftInput);

      const modifiedRightInputTuple = rightInputContextTuple.map(
        (rightInputContext, index) => {
          let adaptedRightInput: unknown;
          if (rightInputContext.isWibiz || rightInputContext.version === 2) {
            adaptedRightInput = rightInputTuple[index];
          } else {
            adaptedRightInput = (rightInputTuple[index] as GenericIndexedItem)
              .item;
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return rightInputContext.modifyTropoignantInput(adaptedRightInput);
        },
      );
      const modifiedOutput = assemblerContext.pinbe(
        modifiedLeftInput,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ...modifiedRightInputTuple,
      );

      const aggregatedOutput =
        outputContext.aggregatePinbetunfOutput(modifiedOutput);

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

    const estinant = {
      version: 2,
      name: instantiationContext.name,
      leftInputStreamConfiguration: {
        collectionId: leftInputContext.gepp,
        isCollectionStream: leftInputContext.isWibiz,
      },
      rightInputStreamConfigurationTuple: rightInputContextTuple.map(
        (rightInputContext) => {
          if (rightInputContext.isWibiz) {
            return {
              collectionId: rightInputContext.gepp,
              isCollectionStream: rightInputContext.isWibiz,
              getRightKeyTuple: undefined,
              getRightKey: undefined,
            } satisfies RightInputStreamConfiguration<
              GenericLeftInputStreamConnectionMetatype,
              GenericRightInputCollectionStreamConnectionMetatype
            >;
          }

          return {
            collectionId: rightInputContext.gepp,
            isCollectionStream: rightInputContext.isWibiz,
            getRightKeyTuple: (leftInput): IdTuple => {
              let adaptedLeftInput: unknown;
              if (leftInputContext.isWibiz || leftInputContext.version === 2) {
                adaptedLeftInput = leftInput;
              } else {
                adaptedLeftInput = (leftInput as GenericIndexedItem).item;
              }

              return rightInputContext.framate(adaptedLeftInput) as IdTuple;
            },
            getRightKey: (indexedRightInput): DeprecatedId => {
              let adaptedRightInput: unknown;
              if (
                rightInputContext.isWibiz ||
                rightInputContext.version === 2
              ) {
                adaptedRightInput = indexedRightInput;
              } else {
                adaptedRightInput = indexedRightInput.item;
              }

              return rightInputContext.croard(adaptedRightInput);
            },
          } satisfies RightInputStreamConfiguration<
            GenericLeftInputStreamConnectionMetatype,
            GenericRightInputItemTupleStreamConnectionMetatype
          >;
        },
      ),
      outputStreamConfiguration: {
        collectionIdTuple: outputContext.geppTuple,
      },
      transform,
    } satisfies GenericProgrammedTransform2 as unknown as ProgrammedTransform2<
      TLeftInputVicken,
      TRightInputVickenTuple,
      CoreOutputVickenFromAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple>
    >;
    return estinant;
  };

  return assembleEstinant;
};

export type EstinantAssemblerParent<
  TLeftInputVicken extends GenericLeftInputStreamConnectionMetatype,
  TRightInputVickenTuple extends GenericRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = {
  assemble: EstinantAssembler<
    TLeftInputVicken,
    TRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  >;
};
