import { Tuple } from '../../package-agnostic-utilities/type/tuple';
import { GenericCollection2 } from '../types/collection/collection2';
import {
  CollectionId,
  CollectionIdSet,
} from '../types/collection/collectionId';
import { GenericProgrammedTransform2 } from '../types/programmed-transform/programmedTransform';

const checkForDuplicateCollections = (
  inputCollectionList: GenericCollection2[],
): string[] => {
  const collectionCountByCollectionId: Record<string, number> = {};
  inputCollectionList.forEach((collection) => {
    const currentCount =
      collectionCountByCollectionId[collection.collectionId] ?? 0;
    collectionCountByCollectionId[collection.collectionId] = currentCount + 1;
  });

  const duplicateCollectionIdList = Object.entries(
    collectionCountByCollectionId,
  )
    .filter(([, count]) => count > 1)
    .map(([collectionId]) => collectionId);

  const messageList = duplicateCollectionIdList.map((collectionId) => {
    return `Voictents must have a unique gepp per program. Found duplicate gepp: ${collectionId}`;
  });

  return messageList;
};

const validateProgrammedTransformCollectionIds = (
  inputCollectionList: GenericCollection2[],
  programmedTransformTuple: Tuple<GenericProgrammedTransform2>,
): string[] => {
  const inputCollectionIdSet: CollectionIdSet = new Set(
    inputCollectionList.map((collection) => {
      return collection.collectionId;
    }),
  );

  const invalidInputOutputList = programmedTransformTuple
    .filter(
      (
        programmedTransform,
      ): programmedTransform is GenericProgrammedTransform2 =>
        programmedTransform.version === 2,
    )
    .flatMap((programmedTransform) => {
      return [
        {
          programmedTransformName: programmedTransform.name,
          collectionId:
            programmedTransform.leftInputStreamConfiguration.collectionId,
          isInput: true,
        },
        ...programmedTransform.rightInputStreamConfigurationTuple.map(
          (rightStreamConfiguration) => {
            return {
              programmedTransformName: programmedTransform.name,
              collectionId: rightStreamConfiguration.collectionId,
              isInput: true,
            };
          },
        ),
        ...programmedTransform.outputStreamConfiguration.collectionIdTuple.map(
          (collectionId) => {
            return {
              programmedTransformName: programmedTransform.name,
              collectionId,
              isInput: false,
            };
          },
        ),
      ];
    })
    .filter(({ collectionId }) => !inputCollectionIdSet.has(collectionId));

  const messageList = invalidInputOutputList.map(
    ({ programmedTransformName, collectionId, isInput }) => {
      const label = isInput ? 'input' : 'output';

      return `Estinant inputs and outputs must have a corresponding voictent. Estinant "${programmedTransformName}" has an ${label} gepp "${collectionId}" without a corresponding voictent.`;
    },
  );

  return messageList;
};

const checkForDuplicateProgrammedTransformNames = (
  programmedTransformTuple: Tuple<GenericProgrammedTransform2>,
): string[] => {
  const programmedTransformCountByName: Record<string, number> = {};
  programmedTransformTuple
    .filter(
      (
        programmedTransform,
      ): programmedTransform is GenericProgrammedTransform2 =>
        programmedTransform.version === 2,
    )
    .forEach((programmedTransform) => {
      const currentCount =
        programmedTransformCountByName[programmedTransform.name] ?? 0;
      programmedTransformCountByName[programmedTransform.name] =
        currentCount + 1;
    });

  const duplicateProgrammedTransformNameList = Object.entries(
    programmedTransformCountByName,
  )
    .filter(([, count]) => count > 1)
    .map(([name]) => name);

  const messageList = duplicateProgrammedTransformNameList.map((name) => {
    return `Estinant names must be unique per program. Found duplicate name: ${name}`;
  });

  return messageList;
};

const checkForHungryProgrammedTransforms = (
  inputCollectionList: GenericCollection2[],
  programmedTransformTuple: Tuple<GenericProgrammedTransform2>,
): string[] => {
  const fedCollectionCollectionIdSet = new Set([
    ...inputCollectionList
      .filter((collection) => {
        // note: It's important that this check comes after all collections are initialized
        return !collection.isEmpty;
      })
      .map((collection) => collection.collectionId),
    ...programmedTransformTuple.flatMap(
      (programmedTransform) =>
        programmedTransform.outputStreamConfiguration.collectionIdTuple,
    ),
  ]);

  const consumedCollectionCollectionIdSet = new Set(
    programmedTransformTuple
      .flatMap((programmedTransform) => {
        return [
          programmedTransform.leftInputStreamConfiguration,
          ...programmedTransform.rightInputStreamConfigurationTuple,
        ];
      })
      .map((streamConfiguration) => streamConfiguration.collectionId),
  );

  // note: downstream estinants are gonna be so hungies
  const unfedCollectionList = inputCollectionList.filter((collection) => {
    const isConsumed = consumedCollectionCollectionIdSet.has(
      collection.collectionId,
    );
    const isFed = fedCollectionCollectionIdSet.has(collection.collectionId);
    return isConsumed && !isFed;
  });

  const messageList = unfedCollectionList.map((collection) => {
    return `Voictent with gepp "${collection.collectionId}" is consumed by an estinant, but is not initialized nor the output of an estinant`;
  });

  return messageList;
};

const validateErrorCollection = (
  errorCollectionId: CollectionId | null,
  errorCollection: GenericCollection2 | null,
): string[] => {
  const messageList =
    errorCollectionId !== null && errorCollection === null
      ? [`Error gepp "${errorCollectionId}" has no corresponding voictent`]
      : [];

  return messageList;
};

type EngineInputValidatorInput = {
  inputCollectionList: GenericCollection2[];
  programmedTransformTuple: Tuple<GenericProgrammedTransform2>;
  errorCollectionId: CollectionId | null;
  errorCollection: GenericCollection2 | null;
};

type ValidatedEngineInput = {
  errorMessageList: string[];
  isCritical: boolean;
};

export const validateEngineInput = ({
  inputCollectionList,
  programmedTransformTuple,
  errorCollectionId,
  errorCollection,
}: EngineInputValidatorInput): ValidatedEngineInput => {
  const duplicateCollectionIdErrorMessageList =
    checkForDuplicateCollections(inputCollectionList);

  const duplicateProgrammedTransformNameErrorMessageList =
    checkForDuplicateProgrammedTransformNames(programmedTransformTuple);

  const programmedTransformCollectinIdErrorMessageList =
    validateProgrammedTransformCollectionIds(
      inputCollectionList,
      programmedTransformTuple,
    );

  const invalidErrorCollectionErrorMessageList = validateErrorCollection(
    errorCollectionId,
    errorCollection,
  );

  const criticalErrorMessageList = [
    ...duplicateCollectionIdErrorMessageList,
    ...duplicateProgrammedTransformNameErrorMessageList,
    ...programmedTransformCollectinIdErrorMessageList,
    ...invalidErrorCollectionErrorMessageList,
  ];

  const hungryProgrammedTransformErrorMessageList =
    checkForHungryProgrammedTransforms(
      inputCollectionList,
      programmedTransformTuple,
    );

  return {
    errorMessageList: [
      ...criticalErrorMessageList,
      ...hungryProgrammedTransformErrorMessageList,
    ],
    isCritical: criticalErrorMessageList.length > 0,
  };
};