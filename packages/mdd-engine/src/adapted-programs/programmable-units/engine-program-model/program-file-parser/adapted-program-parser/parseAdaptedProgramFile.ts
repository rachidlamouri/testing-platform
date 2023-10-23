import { LocatableError } from '../../../error/locatableError';
import { FileSourceInstance } from '../../../linting/source/fileSource';
import { AdaptedProgramFileParserInput } from './adaptedProgramFileParserInput';
import { CollectionDefinitionLocator } from '../../collection-definition/collectionDefinitionLocator';
import { CollectionInstanceSkeleton } from '../../collection-instance/collectionInstanceSkeleton';
import { ItemDefinitionLocator } from '../../item-definition/itemDefinitionLocator';
import { isNotNullish } from '../../../../../package-agnostic-utilities/nil/isNotNullish';
import { parseExplicitCollectionInstanceTuple } from './collection-instance/parseExplicitCollectionInstanceTuple';
import { isNullish } from '../../../../../package-agnostic-utilities/nil/isNullish';
import { parseUninferableCollectionByCollectionId } from './collection-instance/parseUninferableCollectionByCollectionId';
import { parseProgrammedTransformTuple } from './programmed-transform/parseProgrammedTransformTuple';
import { ProgrammedTransformLocator } from '../../programmed-transform/programmedTransformLocator';
import { ProgramSkeleton } from '../../program/programSkeleton';
import { ParsedCollectionStatus } from './collection-instance/parseCollectionInstanceListNode';

const reporterSource = new FileSourceInstance({
  absoluteFilePath: __filename,
});

type AdaptedProgramFileParserOutput = {
  errorList: LocatableError[];
  collectionDefinitionLocatorList: CollectionDefinitionLocator[];
  itemDefinitionLocatorList: ItemDefinitionLocator[];
  collectionInstanceSkeletonList: CollectionInstanceSkeleton[];
  programmedTransformLocatorList: ProgrammedTransformLocator[];
  programSkeleton: ProgramSkeleton;
};

/**
 * Gathers all locators and skeletons from an adapted program file
 */
export const parseAdaptedProgramFile = (
  adaptedParserContext: AdaptedProgramFileParserInput,
): AdaptedProgramFileParserOutput => {
  const { programLocator } = adaptedParserContext;

  const nullableParsedExplicitCollectionInstanceList =
    parseExplicitCollectionInstanceTuple(adaptedParserContext);

  const parsedExplicitCollectionInstanceList =
    nullableParsedExplicitCollectionInstanceList ?? [];

  const unparseableCollectionInstanceTupleError =
    nullableParsedExplicitCollectionInstanceList === null
      ? [
          new LocatableError({
            message:
              'Unable able to parse explicit input collection list. Expected a non-empty array expression with "as const"',
            reporterSource,
            errorSource: programLocator.programFile.source,
            context: {
              programLocator,
            },
          }),
        ]
      : [];

  const parsedUninferableCollectionByCollectionId =
    parseUninferableCollectionByCollectionId(adaptedParserContext);

  const parsedUninferableCollectionInstanceList =
    parsedUninferableCollectionByCollectionId.parsedCollectionList ?? [];

  const unparseableUninferableCollectionByCollectionIdError =
    parsedUninferableCollectionByCollectionId.parsedCollectionList === null
      ? [
          new LocatableError({
            message: `Unable able to parse uninferable collection by collection id. Expected a call to ${parsedUninferableCollectionByCollectionId.expectedBuilderFunctionName} with a single non-empty array expression parameter with "as const"`,
            reporterSource,
            errorSource: programLocator.programFile.source,
            context: {
              programLocator,
            },
          }),
        ]
      : [];

  const combinedParsedCollectionInstanceList = [
    ...parsedExplicitCollectionInstanceList.map((result, originalIndex) => {
      return {
        listTypeName: 'explicit' as const,
        result,
        originalIndex,
      };
    }),
    ...parsedUninferableCollectionInstanceList.map((result, originalIndex) => {
      return {
        listTypeName: 'uninferable' as const,
        result,
        originalIndex,
      };
    }),
  ];

  const collectionDefinitionLocatorList = combinedParsedCollectionInstanceList
    .map(({ result }) => result?.parsedNode?.collectionDefinitionLocator)
    .filter(isNotNullish);

  const itemDefinitionLocatorList = combinedParsedCollectionInstanceList
    .map(({ result }) => result?.parsedNode?.itemDefinitionLocator)
    .filter(isNotNullish);

  const collectionInstanceSkeletonList = combinedParsedCollectionInstanceList
    .map(({ result }) => result?.parsedNode?.collectionInstanceSkeleton)
    .filter(isNotNullish);

  const unparseableCollectionInstanceErrorList = [
    ...parsedExplicitCollectionInstanceList.map((result, originalIndex) => {
      return {
        listTypeName: 'explicit' as const,
        result,
        originalIndex,
      };
    }),
    ...parsedUninferableCollectionInstanceList.map((result, originalIndex) => {
      return {
        listTypeName: 'uninferable' as const,
        result,
        originalIndex,
      };
    }),
  ]
    .filter(({ result }) => {
      return (
        result?.status !== ParsedCollectionStatus.PendingParserImplementation &&
        isNullish(result?.parsedNode?.collectionDefinitionLocator)
      );
    })
    .map(({ listTypeName, originalIndex }) => {
      return new LocatableError({
        message: `Unable to parse ${listTypeName} collection tuple definition`,
        reporterSource,
        errorSource: programLocator.programFile.source,
        context: {
          listTypeName,
          programLocator,
          originalIndex,
        },
      });
    });

  const nullableParsedProgramTransformTuple =
    parseProgrammedTransformTuple(adaptedParserContext);

  const parsedProgramTransformTuple = nullableParsedProgramTransformTuple ?? [];

  const unparseableProgrammedTransformTupleError =
    nullableParsedProgramTransformTuple === null
      ? [
          new LocatableError({
            message: `Unable able to parse programmed transform tuple. Expected an array literal with "as const"`,
            reporterSource,
            errorSource: programLocator.programFile.source,
            context: {
              programLocator,
            },
          }),
        ]
      : [];

  const programmedTransformLocatorList =
    parsedProgramTransformTuple.filter(isNotNullish);

  const unparseableProgrammedTransformErrorList = programmedTransformLocatorList
    .map((result, originalIndex) => {
      return {
        result,
        originalIndex,
      };
    })
    .filter(({ result }) => result === null)
    .map(({ originalIndex }) => {
      return new LocatableError({
        message: `Unable to parse programmed transform entry ${originalIndex}`,
        reporterSource,
        errorSource: programLocator.programFile.source,
        context: {
          programLocator,
          originalIndex,
        },
      });
    });

  const errorList: LocatableError[] = [
    ...unparseableCollectionInstanceTupleError,
    ...unparseableUninferableCollectionByCollectionIdError,
    ...unparseableCollectionInstanceErrorList,
    ...unparseableProgrammedTransformTupleError,
    ...unparseableProgrammedTransformErrorList,
  ];

  const programSkeleton = new ProgramSkeleton({
    programLocator,
    collectionDefinitionLocatorList,
    collectionInstanceSkeletonList,
    programmedTransformLocatorList,
  });

  return {
    errorList,
    collectionDefinitionLocatorList,
    itemDefinitionLocatorList,
    collectionInstanceSkeletonList,
    programmedTransformLocatorList,
    programSkeleton,
  };
};
