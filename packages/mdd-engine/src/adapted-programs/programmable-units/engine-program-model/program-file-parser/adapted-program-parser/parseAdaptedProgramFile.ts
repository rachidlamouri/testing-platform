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

const reporterSource = new FileSourceInstance({
  absoluteFilePath: __filename,
});

type AdaptedProgramFileParserOutput = {
  errorList: LocatableError[];
  collectionDefinitionLocatorList: CollectionDefinitionLocator[];
  itemDefinitionLocatorList: ItemDefinitionLocator[];
  collectionInstanceSkeletonList: CollectionInstanceSkeleton[];
  programmedTransformLocatorList: ProgrammedTransformLocator[];
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
    .map(({ result }) => result?.collectionDefinitionLocator)
    .filter(isNotNullish);

  const itemDefinitionLocatorList = combinedParsedCollectionInstanceList
    .map(({ result }) => result?.itemDefinitionLocator)
    .filter(isNotNullish);

  const collectionInstanceSkeletonList = combinedParsedCollectionInstanceList
    .map(({ result }) => result?.collectionInstanceSkeleton)
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
    .filter(({ result }) => isNullish(result?.collectionDefinitionLocator))
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

  return {
    errorList,
    collectionDefinitionLocatorList,
    itemDefinitionLocatorList,
    collectionInstanceSkeletonList,
    programmedTransformLocatorList,
  };

  // const engineCallCommentText = engineCallExpression?.commentText ?? null;
  // TODO: parse uninferable collection

  // TODO: rename these variables or move this code to its own function (I prefer the latter), because these are way too vague
  // const keyName =
  //   engineFunctionConfiguration.uninferableCollectionByCollectionIdKeyIdentifierName;
  // const functionName = buildCollectionByCollectionId.name;

  // const uninferableVoictentByGeppProperty =
  //   engineCallExpressionPropertyList.find((property) => {
  //     return property.key.name === keyName;
  //   });

  // const uninferableVoictentByGeppValueNode =
  //   uninferableVoictentByGeppProperty?.value;

  // const buildVoictentByGeppCallExpression =
  //   isSpecificIdentifiableCallExpression(
  //     uninferableVoictentByGeppValueNode,
  //     functionName,
  //   )
  //     ? uninferableVoictentByGeppValueNode
  //     : null;

  // const hasConstantListOfArguments =
  //   buildVoictentByGeppCallExpression !== null &&
  //   isSpecificConstantTypeScriptAsExpression<TSESTree.ArrayExpression>(
  //     buildVoictentByGeppCallExpression.arguments[0],
  //     isArrayExpression,
  //   );

  // if (!hasConstantListOfArguments) {
  //   parallelErrorList.push(
  //     new LocatableError({
  //       message: `Unable to parse ${keyName} property. Expected a call expression to ${functionName} with a single array literal parameter ending in "as const"`,
  //       reporterSource: errorSource,
  //       context: {
  //         hasConstantListOfArguments,
  //         buildVoictentByGeppCallExpression,
  //         uninferableVoictentByGeppValueNode,
  //         uninferableVoictentByGeppProperty,
  //       },
  //     }),
  //   );
  // }

  // const estinantListProperty = engineCallExpressionPropertyList.find(
  //   (property) =>
  //     property.key.name ===
  //     engineFunctionConfiguration.programmedTransformListKeyIdentifierName,
  // );

  // const estinantListValueNode = estinantListProperty?.value;

  // const estinantNodeList: TSESTree.Identifier[] =
  //   isSpecificConstantTypeScriptAsExpression<ArrayExpressionOfIdentifiers>(
  //     estinantListValueNode,
  //     isArrayExpressionOfIdentifiers,
  //   )
  //     ? estinantListValueNode.expression.elements
  //     : [];

  // if (estinantNodeList.length === 0) {
  //   parallelErrorList.push(new LocatableError({
  //     message:
  //       'Unable able to parse input estinant tuple. Expected an array literal of identifiers with "as const"',
  //     loca
  //     context: {
  //       estinantListProperty,
  //       estinantListValueNode,
  //     },
  //   }));
  // }

  // const estinantIdentifierList = estinantNodeList.map(
  //   (identifier) => identifier.name,
  // );

  // const engineEstinantLocatorList: EngineProgrammedTransformLocator2[] = [];

  // estinantIdentifierList.forEach((identifierName) => {
  //   const fileImport = fileImportsByImportedIdentifier.get(identifierName);

  //   if (fileImport === undefined) {
  //     engineEstinantLocatorList.push(
  //       new EngineProgrammedTransformTopLevelDeclarationLocatorInstance({
  //         typeName:
  //           EngineProgrammedTransformLocator2TypeName.TopLevelDeclaration,
  //         identifierName,
  //         filePath: file.filePath.serialized,
  //         isCoreProgrammedTransform: false,
  //       }),
  //     );
  //     return;
  //   }

  //   engineEstinantLocatorList.push(
  //     new EngineProgrammedTransformTopLevelDeclarationLocatorInstance({
  //       typeName: EngineProgrammedTransformLocator2TypeName.TopLevelDeclaration,
  //       identifierName,
  //       filePath: fileImport.sourcePath,
  //       isCoreProgrammedTransform: false,
  //     }),
  //   );
  // });

  // if (
  //   engineCallExpression?.comment?.typeName !==
  //     CategorizedCommentTypeName.Descriptive ||
  //   engineCallCommentText === null
  // ) {
  //   parallelErrorList.push({
  //     name: `missing-program-description`,
  //     error: new Error('Program is missing a description'),
  //     reporterLocator,
  //     sourceLocator: {
  //       typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
  //       filePath: file.filePath.serialized,
  //     },
  //     context: {
  //       comment: engineCallExpression?.comment,
  //       engineCallCommentText,
  //     },
  //   });
  // }

  // if (
  //   engineCallExpression?.comment?.typeName ===
  //     CategorizedCommentTypeName.Descriptive &&
  //   !engineCallExpression.comment.tagIdSet.has(
  //     CommentTagId.ExplicitCanonicalComment,
  //   )
  // ) {
  //   parallelErrorList.push({
  //     name: `missing-program-canonical-comment-tag`,
  //     error: new Error(
  //       `Program description is missing an @${CommentTagId.ExplicitCanonicalComment} tag`,
  //     ),
  //     reporterLocator,
  //     sourceLocator: {
  //       typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
  //       filePath: file.filePath.serialized,
  //     },
  //     context: {
  //       comment: engineCallExpression?.comment,
  //     },
  //   });
  // }

  // const partialProgramLocator = new PartialEngineProgramLocator2Instance({
  //   programName,
  //   filePath: file.filePath.serialized,
  // });

  // const programmedTransformRelationshipList = engineEstinantLocatorList.map(
  //   (programmedTransformLocator) => {
  //     return new ProgramProgrammedTransformRelationshipInstance({
  //       programName,
  //       programmedTransformLocator,
  //       rootGraphLocator: partialProgramLocator.rootGraphLocator,
  //     });
  //   },
  // );

  // const engineProgramLocator = new EngineProgramLocator3Instance({
  //   isCoreProgram: false,
  //   programName,
  //   description: engineCallCommentText ?? '',
  //   filePath: file.filePath.serialized,
  //   initializedStreamMetatypeLocatorList: engineStreamMetatypeLocatorList,
  //   programmedTransformRelationshipList,
  //   rootGraphLocator: partialProgramLocator.rootGraphLocator,
  //   engineProgramFile: file,
  // });

  // return {
  //   parallelErrorList,
  //   engineProgramLocator,
  // };
};
