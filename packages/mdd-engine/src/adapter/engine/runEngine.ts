import { Simplify, UnionToIntersection } from 'type-fest';
import {
  EngineRunnerInput as CoreEngineRunnerInput,
  runEngine as coreRunEngine,
} from '../../core/engine/runEngine';
import {
  GenericProgrammedTransform2Tuple,
  UnsafeProgrammedTransform2,
  GenericProgrammedTransform2,
  UnsafeProgrammedTransform2Tuple,
  ProgrammedTransform2,
} from '../../core/types/programmed-transform/programmedTransform';
import {
  GenericLeftInputStreamConnectionMetatype,
  LeftInputStreamConnectionMetatype,
} from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import {
  GenericOutputStreamConnectionMetatype,
  OutputStreamConnectionMetatype,
} from '../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import {
  GenericRightInputStreamConnectionMetatypeTuple,
  RightInputStreamConnectionMetatype,
} from '../../core/types/stream-connection-metatype/rightInputStreamConnectionMetatype';
import {
  CollectionId,
  GenericCollectionIdCombination,
  CollectionIdTuple,
} from '../../core/types/collection/collectionId';
import {
  GenericInMemoryIdentifiableItem2ListStreamMetatype,
  InMemoryIdentifiableItem2ListCollection,
} from '../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  GenericCollection2,
  GenericCollection2Tuple,
  UnsafeCollection2Tuple,
  Collection2,
} from '../../core/types/collection/collection2';
import { GenericStreamMetatype } from '../../core/types/stream-metatype/streamMetatype';
import { ProgramErrorCollectionId } from '../../adapted-programs/programmable-units/error/programError';
import { GenericAbstractSerializableSourceStreamMetatype } from '../../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { SerializableCollection } from '../../layer-agnostic-utilities/collection/serializableCollection';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import {
  FileSystemNodeCollection,
  GenericFileSystemNodeStreamMetatype,
} from '../../adapted-programs/programmable-units/file/fileSystemNodeCollection';

type StreamMetatypeUnionFromCollectionTuple<
  TCollectionTuple extends UnsafeCollection2Tuple,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = TCollectionTuple extends readonly Collection2<any, infer TStreamMetatype>[]
  ? TStreamMetatype
  : never;

type StreamMetatypeFromLeftInputStreamConnectionMetatype<
  TLeftInputStreamConnectionMetatype extends GenericLeftInputStreamConnectionMetatype,
> =
  TLeftInputStreamConnectionMetatype extends LeftInputStreamConnectionMetatype<
    infer TStreamMetatype
  >
    ? TStreamMetatype
    : never;

type StreamMetatypeTupleFromRightInputStreamConnectionMetatypeTuple<
  TRightInputStreamConnectionMetatypeTuple extends GenericRightInputStreamConnectionMetatypeTuple,
> = {
  [TIndex in keyof TRightInputStreamConnectionMetatypeTuple]: TRightInputStreamConnectionMetatypeTuple[TIndex] extends RightInputStreamConnectionMetatype<
    infer TStreamMetatype,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >
    ? TStreamMetatype
    : never;
};

type StreamMetatypeUnionFromRightInputStreamConnectionMetatypeTuple<
  TRightInputStreamConnectionMetatypeTuple extends GenericRightInputStreamConnectionMetatypeTuple,
> =
  StreamMetatypeTupleFromRightInputStreamConnectionMetatypeTuple<TRightInputStreamConnectionMetatypeTuple>[number];

type StreamMetatypeOptionTupleFromOutputStreamConnectionMetatype<
  TOutputStreamConnectionMetatype extends GenericOutputStreamConnectionMetatype,
> = TOutputStreamConnectionMetatype extends OutputStreamConnectionMetatype<
  infer TStreamMetatypeOptionTuple
>
  ? TStreamMetatypeOptionTuple
  : never;

type StreamMetatypeUnionFromOutputStreamConnectionMetatype<
  TOutputStreamConnectionMetatype extends GenericOutputStreamConnectionMetatype,
> =
  StreamMetatypeOptionTupleFromOutputStreamConnectionMetatype<TOutputStreamConnectionMetatype>[number];

type StreamMetatypeUnionFromProgrammedTransform<
  TProgrammedTransform extends UnsafeProgrammedTransform2,
> = TProgrammedTransform extends ProgrammedTransform2<
  infer TLeftInputStreamConnectionMetatype,
  infer TRightInputStreamConnectionMetatypeTuple,
  infer TOutputStreamConnectionMetatype
>
  ?
      | StreamMetatypeFromLeftInputStreamConnectionMetatype<TLeftInputStreamConnectionMetatype>
      | StreamMetatypeUnionFromRightInputStreamConnectionMetatypeTuple<TRightInputStreamConnectionMetatypeTuple>
      | StreamMetatypeUnionFromOutputStreamConnectionMetatype<TOutputStreamConnectionMetatype>
  : never;

type ProgrammedTransformUnionFromProgrammedTransformTuple<
  TProgrammedTransformTuple extends UnsafeProgrammedTransform2Tuple,
> = TProgrammedTransformTuple[number];

type StreamMetatypeUnionFromProgrammedTransformTuple<
  TProgrammedTransformTuple extends UnsafeProgrammedTransform2Tuple,
> = StreamMetatypeUnionFromProgrammedTransform<
  ProgrammedTransformUnionFromProgrammedTransformTuple<TProgrammedTransformTuple>
>;

type GenericInferableStreamMetatype =
  | GenericInMemoryIdentifiableItem2ListStreamMetatype
  | GenericFileSystemNodeStreamMetatype;

type UninferableStreamMetatypeUnion<
  TImplicitStreamMetatypeUnion extends GenericStreamMetatype,
> = Exclude<TImplicitStreamMetatypeUnion, GenericInferableStreamMetatype>;

type InferableStreamMetatypeUnion<
  TImplicitStreamMetatypeUnion extends GenericStreamMetatype,
  TInferableStreamMetatype extends GenericInferableStreamMetatype,
> = Extract<TImplicitStreamMetatypeUnion, TInferableStreamMetatype>;

type CollectionIdCombinationFromStreamMetatypeUnion<
  TStreamMetatype extends GenericStreamMetatype,
> = Simplify<
  UnionToIntersection<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TStreamMetatype extends any
      ? {
          [TCollectionId in TStreamMetatype['collectionId']]: null;
        }
      : never
  >
>;

type CollectionByCollectionIdFromStreamMetatypeUnion<
  TStreamMetatype extends GenericStreamMetatype,
> = Simplify<
  UnionToIntersection<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TStreamMetatype extends any
      ? {
          [TCollectionId in TStreamMetatype['collectionId']]: Collection2<
            TStreamMetatype,
            TStreamMetatype
          >;
        }
      : never
  >
>;

type UninferableCollectionByCollectionId<
  TImplicitStreamMetatypeUnion extends GenericStreamMetatype,
> = CollectionByCollectionIdFromStreamMetatypeUnion<
  UninferableStreamMetatypeUnion<TImplicitStreamMetatypeUnion>
>;

// TODO: change this to extract any voque whose receieved hubblepup includes Error (I tried this and couldn't get it to work :sad-face:)
type ErrorCollectionId<TAllStreamMetatypeUnion extends GenericStreamMetatype> =
  Extract<TAllStreamMetatypeUnion['collectionId'], ProgramErrorCollectionId>;

type SerializeeCollectionId<
  TAllStreamMetatypeUnion extends GenericStreamMetatype,
> = Extract<
  TAllStreamMetatypeUnion,
  GenericAbstractSerializableSourceStreamMetatype
>['collectionId'];

type AllStreamMetatypeUnion<
  TExplicitCollectionTupleStreamMetatypeUnion extends GenericStreamMetatype,
  TProgrammedTransformTupleStreamMetatypeUnion extends GenericStreamMetatype,
> =
  | TExplicitCollectionTupleStreamMetatypeUnion
  | TProgrammedTransformTupleStreamMetatypeUnion;

type ImplicitStreamMetatypeUnion<
  TRequiredStreamMetatypeUnion extends GenericStreamMetatype,
  TExplicitStreamMetatypeUnion extends GenericStreamMetatype,
> = Exclude<TRequiredStreamMetatypeUnion, TExplicitStreamMetatypeUnion>;

type EngineRunnerInputFromAllComputedUnions<
  TExplicitCollectionTuple extends UnsafeCollection2Tuple,
  TProgrammedTransformTuple extends UnsafeProgrammedTransform2Tuple,
  TAllStreamMetatypeUnion extends GenericStreamMetatype,
  TImplicitStreamMetatypeUnion extends GenericStreamMetatype,
> = {
  explicitCollectionTuple: TExplicitCollectionTuple;
  fileSystemNodeCollectionIdCombination: CollectionIdCombinationFromStreamMetatypeUnion<
    InferableStreamMetatypeUnion<
      TImplicitStreamMetatypeUnion,
      GenericFileSystemNodeStreamMetatype
    >
  >;
  uninferableCollectionByCollectionId: UninferableCollectionByCollectionId<TImplicitStreamMetatypeUnion>;
  errorCollectionId?: ErrorCollectionId<TAllStreamMetatypeUnion>;
  programmedTransformTuple: TProgrammedTransformTuple;
  serializeeCollectionIdList?: SerializeeCollectionId<TAllStreamMetatypeUnion>[];
  programFileCache: ProgramFileCache;
  strategy?: CoreEngineRunnerInput['strategy'];
};

type EngineRunnerInputFromPreliminaryComputedUnions<
  TExplicitCollectionTuple extends UnsafeCollection2Tuple,
  TProgrammedTransformTuple extends UnsafeProgrammedTransform2Tuple,
  TExplicitCollectionTupleStreamMetatypeUnion extends GenericStreamMetatype,
  TProgrammedTransformTupleStreamMetatypeUnion extends GenericStreamMetatype,
> = EngineRunnerInputFromAllComputedUnions<
  TExplicitCollectionTuple,
  TProgrammedTransformTuple,
  AllStreamMetatypeUnion<
    TExplicitCollectionTupleStreamMetatypeUnion,
    TProgrammedTransformTupleStreamMetatypeUnion
  >,
  ImplicitStreamMetatypeUnion<
    TProgrammedTransformTupleStreamMetatypeUnion,
    TExplicitCollectionTupleStreamMetatypeUnion
  >
>;

type EngineRunnerInput<
  TExplicitCollectionTuple extends UnsafeCollection2Tuple,
  TProgrammedTransformTuple extends UnsafeProgrammedTransform2Tuple,
> = EngineRunnerInputFromPreliminaryComputedUnions<
  TExplicitCollectionTuple,
  TProgrammedTransformTuple,
  StreamMetatypeUnionFromCollectionTuple<TExplicitCollectionTuple>,
  StreamMetatypeUnionFromProgrammedTransformTuple<TProgrammedTransformTuple>
>;

type EngineRunner = <
  TExplicitCollectionTuple extends UnsafeCollection2Tuple,
  TProgrammedTransformTuple extends UnsafeProgrammedTransform2Tuple,
>(
  input: EngineRunnerInput<TExplicitCollectionTuple, TProgrammedTransformTuple>,
) => void;

const buildSerializableCollection = (
  serializerCollectionId: CollectionId,
  programFileCache: ProgramFileCache,
): GenericCollection2 => {
  const serializableCollection = new SerializableCollection({
    collectionId: serializerCollectionId,
    programFileCache,
    initialItemEggTuple: [],
    continueOnDuplicate: true,
  });

  return serializableCollection;
};

const buildSerializerProgrammedTransformTuple = (
  serializerCollectionId: CollectionId,
  serializeeCollectionIdList: CollectionId[],
): GenericProgrammedTransform2Tuple => {
  const serializeeCollectionIdSet = new Set(serializeeCollectionIdList);

  const serializerProgrammedTransformTuple: UnsafeProgrammedTransform2[] = [
    ...serializeeCollectionIdSet,
  ].map<UnsafeProgrammedTransform2>((serializeeCollectionId) => {
    return buildAddMetadataForSerialization({
      inputCollectionId: serializeeCollectionId,
      outputCollectionId: serializerCollectionId,
    });
  });

  return serializerProgrammedTransformTuple;
};

const getCollectionTupleCollectionIdSet = (
  collectionTuple: GenericCollection2Tuple,
): Set<CollectionId> => {
  const collectionTupleCollectionIdSet = new Set(
    collectionTuple.map((collection) => collection.collectionId),
  );

  return collectionTupleCollectionIdSet;
};

const getProgrammedTransformTupleCollectionIdSet = (
  programmedTransformTuple: GenericProgrammedTransform2Tuple,
): CollectionId[] => {
  const programmedTransformCollectionIdList =
    programmedTransformTuple.flatMap<CollectionId>(
      (programmedTransform: GenericProgrammedTransform2) => {
        const leftInputCollectionId =
          programmedTransform.leftInputStreamConfiguration.collectionId;
        const rightInputCollectionIdTuple =
          programmedTransform.rightInputStreamConfigurationTuple.map(
            (streamConfiguration) => streamConfiguration.collectionId,
          );
        const outputCollectionIdTuple =
          programmedTransform.outputStreamConfiguration.collectionIdTuple;

        return [
          leftInputCollectionId,
          ...rightInputCollectionIdTuple,
          ...outputCollectionIdTuple,
        ];
      },
    );

  const programmedTransformTupleCollectionIdSet = new Set(
    programmedTransformCollectionIdList,
  );

  const result = [...programmedTransformTupleCollectionIdSet];

  return result;
};

const getInferredFileSystemNodeCollectionTuple = (
  fileSystemNodeCollectionIdCombination: GenericCollectionIdCombination,
): GenericCollection2Tuple => {
  const collectionIdList = Object.keys(fileSystemNodeCollectionIdCombination);
  const collectionList = collectionIdList.map((collectionId) => {
    return new FileSystemNodeCollection({
      collectionId,
      initialItemEggTuple: [],
      continueOnDuplicate: false,
    });
  });

  return collectionList;
};

const getInferredInMemoryCollectionTuple = (
  collectionTuple: GenericCollection2Tuple,
  programmedTransformTuple: GenericProgrammedTransform2Tuple,
): GenericCollection2Tuple => {
  const collectionTupleCollectionIdSet =
    getCollectionTupleCollectionIdSet(collectionTuple);
  const programmedTransformTupleCollectionIdSet =
    getProgrammedTransformTupleCollectionIdSet(programmedTransformTuple);

  const missingCollectionIdList =
    programmedTransformTupleCollectionIdSet.filter(
      (collectionId) => !collectionTupleCollectionIdSet.has(collectionId),
    );

  const inferredCollectionTuple = missingCollectionIdList.map(
    (collectionId) => {
      return new InMemoryIdentifiableItem2ListCollection({
        collectionId,
        initialItemEggTuple: [],
      });
    },
  );

  return inferredCollectionTuple;
};

/**
 * The adapted engine. It abstracts the core engine's concerns by providing an
 * easier interface to work with. The types of its other inputs are derived from
 * the type of the input collection tuple and the input programmed transform
 * tuple.
 *
 * @readableName runAdaptedEngine
 */
export const runEngine: EngineRunner = <
  TExplicitCollectionTuple extends UnsafeCollection2Tuple,
  TProgrammedTransformTuple extends UnsafeProgrammedTransform2Tuple,
>({
  explicitCollectionTuple: specificExplicitCollectionTuple,
  fileSystemNodeCollectionIdCombination:
    specificFileSystemNodeCollectionIdCombination,
  uninferableCollectionByCollectionId:
    specificUninferableCollectionByCollectionId,
  errorCollectionId,
  programmedTransformTuple: specificProgrammedTransformTuple,
  serializeeCollectionIdList: specificSerializeeCollectionIdList = [],
  programFileCache,
  strategy,
}: EngineRunnerInput<
  TExplicitCollectionTuple,
  TProgrammedTransformTuple
>): void => {
  const explicitCollectionTuple = [
    ...specificExplicitCollectionTuple,
    ...Object.values(specificUninferableCollectionByCollectionId),
  ] as GenericCollection2Tuple;

  // TODO: consider making this an input argument
  // note: The core engine will provide a signal if someone passes in a collection with the same Gepp
  const serializerCollectionId = 'serialized';

  const serializableCollection = buildSerializableCollection(
    serializerCollectionId,
    programFileCache,
  );

  const genericFileSystemNodeCollectionIdCombination =
    specificFileSystemNodeCollectionIdCombination as GenericCollectionIdCombination;

  const inferredFileSystemNodeCollectionTuple =
    getInferredFileSystemNodeCollectionTuple(
      genericFileSystemNodeCollectionIdCombination,
    );

  const programmedTransformTuple =
    specificProgrammedTransformTuple as GenericProgrammedTransform2Tuple;

  const instantiatedCollectionTuple = [
    ...explicitCollectionTuple,
    ...inferredFileSystemNodeCollectionTuple,
  ];

  const inferredCollectionTuple = getInferredInMemoryCollectionTuple(
    instantiatedCollectionTuple,
    programmedTransformTuple,
  );

  const serializeeCollectionIdList =
    specificSerializeeCollectionIdList as CollectionId[];

  const serializerProgrammedTransformTuple =
    buildSerializerProgrammedTransformTuple(
      serializerCollectionId,
      serializeeCollectionIdList,
    );

  const inputCollectionList: GenericCollection2[] = [
    ...explicitCollectionTuple,
    serializableCollection,
    ...inferredFileSystemNodeCollectionTuple,
    ...inferredCollectionTuple,
  ];

  const inputProgrammedTransformTuple = [
    ...programmedTransformTuple,
    ...serializerProgrammedTransformTuple,
  ];

  coreRunEngine({
    inputCollectionList,
    errorCollectionId,
    programmedTransformTuple: inputProgrammedTransformTuple,
    onFinish: (statistics) => {
      if (programFileCache !== undefined) {
        programFileCache.writeRuntimeSnapshot(statistics);
      }
    },
    strategy,
  });
};

type CollectionByCollectionIdTupleFromCollectionTuple<
  TCollectionTuple extends GenericCollection2Tuple,
> = {
  [TIndex in keyof TCollectionTuple]: {
    [TKey in TCollectionTuple[TIndex]['collectionId']]: TCollectionTuple[TIndex];
  };
};

type CollectionByCollectionIdFromCollectionTuple<
  TCollectionTuple extends GenericCollection2Tuple,
> = Simplify<
  UnionToIntersection<
    CollectionByCollectionIdTupleFromCollectionTuple<TCollectionTuple>[number]
  >
>;

export const buildCollectionByCollectionId = <
  TCollectionTuple extends GenericCollection2Tuple,
>(
  collectionTuple: TCollectionTuple,
): CollectionByCollectionIdFromCollectionTuple<TCollectionTuple> => {
  const entryList = collectionTuple.map((collection) => {
    return [collection.collectionId, collection] as const;
  });

  const result = Object.fromEntries(
    entryList,
  ) as CollectionByCollectionIdFromCollectionTuple<TCollectionTuple>;

  return result;
};

type CollectionIdCombinationFromCollectionIdUnion<
  TCollectionIdUnion extends CollectionId,
> = Simplify<
  UnionToIntersection<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TCollectionIdUnion extends any
      ? { [TCollectionId in TCollectionIdUnion]: null }
      : never
  >
>;

export const buildCollectionIdCombination = <
  TCollectionIdTuple extends CollectionIdTuple,
>(
  collectionIdTuple: TCollectionIdTuple,
): CollectionIdCombinationFromCollectionIdUnion<TCollectionIdTuple[number]> => {
  const entryList = collectionIdTuple.map((collectionId) => {
    return [collectionId, null] as const;
  });

  const guaranteedCollectionIdSet = Object.fromEntries(
    entryList,
  ) as CollectionIdCombinationFromCollectionIdUnion<TCollectionIdTuple[number]>;

  return guaranteedCollectionIdSet;
};
