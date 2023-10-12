import { Simplify, UnionToIntersection } from 'type-fest';
import {
  DigikikifierInput as CoreDigikikifierInput,
  digikikify as coreDigikikify,
} from '../../core/engine/digikikify';
import {
  GenericEstinant2Tuple,
  UnsafeEstinant2,
  GenericEstinant2,
  UnsafeEstinant2Tuple,
  ProgrammedTransform2,
} from '../../core/types/estinant/estinant';
import {
  GenericLeftInputVicken,
  LeftInputVicken,
} from '../../core/types/vicken/leftInputVicken';
import {
  GenericOutputVicken,
  OutputStreamConnectionMetatype,
} from '../../core/types/vicken/outputVicken';
import {
  GenericRightInputVickenTuple,
  RightInputVicken,
} from '../../core/types/vicken/rightInputVicken';
import {
  CollectionId,
  GenericCollectionIdCombination,
  CollectionIdTuple,
} from '../../core/types/collection/collectionId';
import {
  GenericInMemoryOdeshin2ListVoque,
  InMemoryOdeshin2ListVoictent,
} from '../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  GenericCollection2,
  GenericCollection2Tuple,
  UnsafeCollection2Tuple,
  Collection2,
} from '../../core/types/collection/collection2';
import { GenericStreamMetatype } from '../../core/types/stream-metatype/streamMetatype';
import { ProgramErrorGepp } from '../../adapted-programs/programmable-units/error/programError';
import { GenericAbstractSerializableSourceStreamMetatype } from '../../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { SerializableCollection } from '../../layer-agnostic-utilities/collection/serializableCollection';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import {
  FileSystemNodeVoictent,
  GenericFileSystemNodeVoque,
} from '../../adapted-programs/programmable-units/file/fileSystemNodeVoictent';

type VoqueUnionFromVoictentTuple<
  TVoictentTuple extends UnsafeCollection2Tuple,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = TVoictentTuple extends readonly Collection2<any, infer TVoque>[]
  ? TVoque
  : never;

type VoqueFromLeftInputVicken<TLeftInputVicken extends GenericLeftInputVicken> =
  TLeftInputVicken extends LeftInputVicken<infer TVoque> ? TVoque : never;

type VoqueTupleFromRightInputVickenTuple<
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
> = {
  [TIndex in keyof TRightInputVickenTuple]: TRightInputVickenTuple[TIndex] extends RightInputVicken<
    infer TVoque,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >
    ? TVoque
    : never;
};

type VoqueUnionFromRightInputVickenTuple<
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
> = VoqueTupleFromRightInputVickenTuple<TRightInputVickenTuple>[number];

type VoqueOptionTupleFromOutputVicken<
  TOutputVicken extends GenericOutputVicken,
> = TOutputVicken extends OutputStreamConnectionMetatype<
  infer TVoqueOptionTuple
>
  ? TVoqueOptionTuple
  : never;

type VoqueUnionFromOutputVicken<TOutputVicken extends GenericOutputVicken> =
  VoqueOptionTupleFromOutputVicken<TOutputVicken>[number];

type VoqueUnionFromEstinant<TEstinant extends UnsafeEstinant2> =
  TEstinant extends ProgrammedTransform2<
    infer TLeftInputVicken,
    infer TRightInputVickenTuple,
    infer TOutputVicken
  >
    ?
        | VoqueFromLeftInputVicken<TLeftInputVicken>
        | VoqueUnionFromRightInputVickenTuple<TRightInputVickenTuple>
        | VoqueUnionFromOutputVicken<TOutputVicken>
    : never;

type EstinantUnionFromEstinantTuple<
  TEstinantTuple extends UnsafeEstinant2Tuple,
> = TEstinantTuple[number];

type VoqueUnionFromEstinantTuple<TEstinantTuple extends UnsafeEstinant2Tuple> =
  VoqueUnionFromEstinant<EstinantUnionFromEstinantTuple<TEstinantTuple>>;

type GenericInferableVoque =
  | GenericInMemoryOdeshin2ListVoque
  | GenericFileSystemNodeVoque;

type UninferableVoqueUnion<TImplicitVoqueUnion extends GenericStreamMetatype> =
  Exclude<TImplicitVoqueUnion, GenericInferableVoque>;

type InferableVoqueUnion<
  TImplicitVoqueUnion extends GenericStreamMetatype,
  TInferableVoque extends GenericInferableVoque,
> = Extract<TImplicitVoqueUnion, TInferableVoque>;

type GeppCombinationFromVoqueUnion<TVoque extends GenericStreamMetatype> =
  Simplify<
    UnionToIntersection<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      TVoque extends any
        ? {
            [TGepp in TVoque['collectionId']]: null;
          }
        : never
    >
  >;

type VoictentByGeppFromVoqueUnion<TVoque extends GenericStreamMetatype> =
  Simplify<
    UnionToIntersection<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      TVoque extends any
        ? {
            [TGepp in TVoque['collectionId']]: Collection2<TVoque, TVoque>;
          }
        : never
    >
  >;

type UninferableVoictentByGepp<
  TImplicitVoqueUnion extends GenericStreamMetatype,
> = VoictentByGeppFromVoqueUnion<UninferableVoqueUnion<TImplicitVoqueUnion>>;

// TODO: change this to extract any voque whose receieved hubblepup includes Error (I tried this and couldn't get it to work :sad-face:)
type ErrorGepp<TAllVoqueUnion extends GenericStreamMetatype> = Extract<
  TAllVoqueUnion['collectionId'],
  ProgramErrorGepp
>;

type SerializeeGepp<TAllVoqueUnion extends GenericStreamMetatype> = Extract<
  TAllVoqueUnion,
  GenericAbstractSerializableSourceStreamMetatype
>['collectionId'];

type AllVoqueUnion<
  TExplicitVoictentTupleVoqueUnion extends GenericStreamMetatype,
  TEstinantTupleVoqueUnion extends GenericStreamMetatype,
> = TExplicitVoictentTupleVoqueUnion | TEstinantTupleVoqueUnion;

type ImplicitVoqueUnion<
  TRequiredVoqueUnion extends GenericStreamMetatype,
  TExplicitVoqueUnion extends GenericStreamMetatype,
> = Exclude<TRequiredVoqueUnion, TExplicitVoqueUnion>;

type DigikikifierInputFromAllComputedUnions<
  TExplicitVoictentTuple extends UnsafeCollection2Tuple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
  TAllVoqueUnion extends GenericStreamMetatype,
  TImplicitVoqueUnion extends GenericStreamMetatype,
> = {
  explicitVoictentTuple: TExplicitVoictentTuple;
  fileSystemNodeGeppCombination: GeppCombinationFromVoqueUnion<
    InferableVoqueUnion<TImplicitVoqueUnion, GenericFileSystemNodeVoque>
  >;
  uninferableVoictentByGepp: UninferableVoictentByGepp<TImplicitVoqueUnion>;
  errorGepp?: ErrorGepp<TAllVoqueUnion>;
  estinantTuple: TEstinantTuple;
  serializeeGeppList?: SerializeeGepp<TAllVoqueUnion>[];
  programFileCache: ProgramFileCache;
  strategy?: CoreDigikikifierInput['strategy'];
};

type DigikikifierInputFromPreliminaryComputedUnions<
  TExplicitVoictentTuple extends UnsafeCollection2Tuple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
  TExplicitVoictentTupleVoqueUnion extends GenericStreamMetatype,
  TEstinantTupleVoqueUnion extends GenericStreamMetatype,
> = DigikikifierInputFromAllComputedUnions<
  TExplicitVoictentTuple,
  TEstinantTuple,
  AllVoqueUnion<TExplicitVoictentTupleVoqueUnion, TEstinantTupleVoqueUnion>,
  ImplicitVoqueUnion<TEstinantTupleVoqueUnion, TExplicitVoictentTupleVoqueUnion>
>;

type DigikikifierInput<
  TExplicitVoictentTuple extends UnsafeCollection2Tuple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
> = DigikikifierInputFromPreliminaryComputedUnions<
  TExplicitVoictentTuple,
  TEstinantTuple,
  VoqueUnionFromVoictentTuple<TExplicitVoictentTuple>,
  VoqueUnionFromEstinantTuple<TEstinantTuple>
>;

type Digikikifier = <
  TExplicitVoictentTuple extends UnsafeCollection2Tuple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
>(
  input: DigikikifierInput<TExplicitVoictentTuple, TEstinantTuple>,
) => void;

const buildSerializableVoictent = (
  serializerGepp: CollectionId,
  programFileCache: ProgramFileCache,
): GenericCollection2 => {
  const serializableVoictent = new SerializableCollection({
    collectionId: serializerGepp,
    programFileCache,
    initialItemEggTuple: [],
  });

  return serializableVoictent;
};

const buildSerializerEstinantTuple = (
  serializerGepp: CollectionId,
  serializeeGeppList: CollectionId[],
): GenericEstinant2Tuple => {
  const serializeeGeppSet = new Set(serializeeGeppList);

  const serializerEstinantTuple: UnsafeEstinant2[] = [
    ...serializeeGeppSet,
  ].map<UnsafeEstinant2>((serializeeGepp) => {
    return buildAddMetadataForSerialization({
      inputCollectionId: serializeeGepp,
      outputCollectionId: serializerGepp,
    });
  });

  return serializerEstinantTuple;
};

const getVoictentTupleGeppSet = (
  voictentTuple: GenericCollection2Tuple,
): Set<CollectionId> => {
  const voictentTupleGeppSet = new Set(
    voictentTuple.map((voictent) => voictent.collectionId),
  );

  return voictentTupleGeppSet;
};

const getEstinantTupleGeppSet = (
  estinantTuple: GenericEstinant2Tuple,
): CollectionId[] => {
  const estinantGeppList = estinantTuple.flatMap<CollectionId>(
    (estinant: GenericEstinant2) => {
      const leftInputGepp = estinant.leftInputStreamConfiguration.collectionId;
      const rightInputGeppTuple =
        estinant.rightInputStreamConfigurationTuple.map(
          (appreffinge) => appreffinge.collectionId,
        );
      const outputGeppTuple =
        estinant.outputStreamConfiguration.collectionIdTuple;

      return [leftInputGepp, ...rightInputGeppTuple, ...outputGeppTuple];
    },
  );

  const estinantTupleGeppSet = new Set(estinantGeppList);

  const result = [...estinantTupleGeppSet];

  return result;
};

const getInferredFileSystemNodeVoictentTuple = (
  fileSystemNodeGeppCombination: GenericCollectionIdCombination,
): GenericCollection2Tuple => {
  const geppList = Object.keys(fileSystemNodeGeppCombination);
  const voictentList = geppList.map((collectionId) => {
    return new FileSystemNodeVoictent({
      collectionId,
      initialItemEggTuple: [],
    });
  });

  return voictentList;
};

const getInferredInMemoryVoictentTuple = (
  voictentTuple: GenericCollection2Tuple,
  estinantTuple: GenericEstinant2Tuple,
): GenericCollection2Tuple => {
  const voictentTupleGeppSet = getVoictentTupleGeppSet(voictentTuple);
  const estinantTupleGeppSet = getEstinantTupleGeppSet(estinantTuple);

  const missingGeppList = estinantTupleGeppSet.filter(
    (gepp) => !voictentTupleGeppSet.has(gepp),
  );

  const inferredVoictentTuple = missingGeppList.map((collectionId) => {
    return new InMemoryOdeshin2ListVoictent({
      collectionId,
      initialItemEggTuple: [],
    });
  });

  return inferredVoictentTuple;
};

/**
 * The adapted engine. It abstracts the core engine's concerns by providing an
 * easier interface to work with. The types of its other inputs are derived from
 * the type of the input collection tuple and the input programmed transform
 * tuple.
 *
 * @readableName runAdaptedEngine
 */
export const digikikify: Digikikifier = <
  TExplicitVoictentTuple extends UnsafeCollection2Tuple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
>({
  explicitVoictentTuple: specificExplicitVoictentTuple,
  fileSystemNodeGeppCombination: specificFileSystemNodeGeppCombination,
  uninferableVoictentByGepp: specificUninferableVoictentByGepp,
  errorGepp,
  estinantTuple: specificEstinantTuple,
  serializeeGeppList: specificSerializeeGeppList = [],
  programFileCache,
  strategy,
}: DigikikifierInput<TExplicitVoictentTuple, TEstinantTuple>): void => {
  const explicitVoictentTuple = [
    ...specificExplicitVoictentTuple,
    ...Object.values(specificUninferableVoictentByGepp),
  ] as GenericCollection2Tuple;

  // TODO: consider making this an input argument
  // note: The core engine will provide a signal if someone passes in a collection with the same Gepp
  const serializerGepp = 'serialized';

  const serializableVoictent = buildSerializableVoictent(
    serializerGepp,
    programFileCache,
  );

  const genericFileSystemNodeGeppCombination =
    specificFileSystemNodeGeppCombination as GenericCollectionIdCombination;

  const inferredFileSystemNodeVoictentTuple =
    getInferredFileSystemNodeVoictentTuple(
      genericFileSystemNodeGeppCombination,
    );

  const estinantTuple = specificEstinantTuple as GenericEstinant2Tuple;

  const instantiatedVoictentTuple = [
    ...explicitVoictentTuple,
    ...inferredFileSystemNodeVoictentTuple,
  ];

  const inferredVoictentTuple = getInferredInMemoryVoictentTuple(
    instantiatedVoictentTuple,
    estinantTuple,
  );

  const serializeeGeppList = specificSerializeeGeppList as CollectionId[];

  const serializerEstinantTuple = buildSerializerEstinantTuple(
    serializerGepp,
    serializeeGeppList,
  );

  const inputVoictentTuple: GenericCollection2[] = [
    ...explicitVoictentTuple,
    serializableVoictent,
    ...inferredFileSystemNodeVoictentTuple,
    ...inferredVoictentTuple,
  ];

  const inputEstinantTuple = [...estinantTuple, ...serializerEstinantTuple];

  coreDigikikify({
    inputVoictentList: inputVoictentTuple,
    errorGepp,
    estinantTuple: inputEstinantTuple,
    onFinish: (statistics) => {
      if (programFileCache !== undefined) {
        programFileCache.writeRuntimeSnapshot(statistics);
      }
    },
    strategy,
  });
};

type VoictentByGeppTupleFromVoictentTuple<
  TVoictentTuple extends GenericCollection2Tuple,
> = {
  [TIndex in keyof TVoictentTuple]: {
    [TKey in TVoictentTuple[TIndex]['collectionId']]: TVoictentTuple[TIndex];
  };
};

type VoictentByGeppFromVoictentTuple<
  TVoictentTuple extends GenericCollection2Tuple,
> = Simplify<
  UnionToIntersection<
    VoictentByGeppTupleFromVoictentTuple<TVoictentTuple>[number]
  >
>;

export const buildVoictentByGepp = <
  TVoictentTuple extends GenericCollection2Tuple,
>(
  voictentTuple: TVoictentTuple,
): VoictentByGeppFromVoictentTuple<TVoictentTuple> => {
  const entryList = voictentTuple.map((voictent) => {
    return [voictent.collectionId, voictent] as const;
  });

  const result = Object.fromEntries(
    entryList,
  ) as VoictentByGeppFromVoictentTuple<TVoictentTuple>;

  return result;
};

type GeppCombinationFromGeppUnion<TGeppUnion extends CollectionId> = Simplify<
  UnionToIntersection<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TGeppUnion extends any ? { [TGepp in TGeppUnion]: null } : never
  >
>;

export const buildGeppCombination = <TGeppTuple extends CollectionIdTuple>(
  geppTuple: TGeppTuple,
): GeppCombinationFromGeppUnion<TGeppTuple[number]> => {
  const entryList = geppTuple.map((gepp) => {
    return [gepp, null] as const;
  });

  const guranteedGeppSet = Object.fromEntries(
    entryList,
  ) as GeppCombinationFromGeppUnion<TGeppTuple[number]>;

  return guranteedGeppSet;
};
