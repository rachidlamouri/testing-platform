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
  Estinant2,
} from '../../core/types/estinant/estinant';
import {
  GenericLeftInputVicken,
  LeftInputVicken,
} from '../../core/types/vicken/leftInputVicken';
import {
  GenericOutputVicken,
  OutputVicken,
} from '../../core/types/vicken/outputVicken';
import {
  GenericRightInputVickenTuple,
  RightInputVicken,
} from '../../core/types/vicken/rightInputVicken';
import {
  Gepp,
  GenericGeppCombination,
  GeppTuple,
} from '../../core/types/voictent/gepp';
import {
  GenericInMemoryOdeshin2ListVoque,
  InMemoryOdeshin2ListVoictent,
} from '../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import {
  GenericVoictent2,
  GenericVoictent2Tuple,
  UnsafeVoictent2Tuple,
  Voictent2,
} from '../../core/types/voictent/voictent2';
import { GenericVoque } from '../../core/types/voque/voque';
import { ProgramErrorGepp } from '../../adapted-programs/programmable-units/error/programError';
import { GenericAbstractSerializableSourceVoque } from '../../layer-agnostic-utilities/voictent/abstractSerializableVoictent';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/estinant/buildAddMetadataForSerialization';
import { SerializableVoictent } from '../../layer-agnostic-utilities/voictent/serializableVoictent';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import {
  FileSystemNodeVoictent,
  GenericFileSystemNodeVoque,
} from '../../adapted-programs/programmable-units/file/fileSystemNodeVoictent';

type VoqueUnionFromVoictentTuple<
  TVoictentTuple extends UnsafeVoictent2Tuple,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = TVoictentTuple extends readonly Voictent2<any, infer TVoque>[]
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
> = TOutputVicken extends OutputVicken<infer TVoqueOptionTuple>
  ? TVoqueOptionTuple
  : never;

type VoqueUnionFromOutputVicken<TOutputVicken extends GenericOutputVicken> =
  VoqueOptionTupleFromOutputVicken<TOutputVicken>[number];

type VoqueUnionFromEstinant<TEstinant extends UnsafeEstinant2> =
  TEstinant extends Estinant2<
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

type UninferableVoqueUnion<TImplicitVoqueUnion extends GenericVoque> = Exclude<
  TImplicitVoqueUnion,
  GenericInferableVoque
>;

type InferableVoqueUnion<
  TImplicitVoqueUnion extends GenericVoque,
  TInferableVoque extends GenericInferableVoque,
> = Extract<TImplicitVoqueUnion, TInferableVoque>;

type GeppCombinationFromVoqueUnion<TVoque extends GenericVoque> = Simplify<
  UnionToIntersection<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TVoque extends any
      ? {
          [TGepp in TVoque['gepp']]: null;
        }
      : never
  >
>;

type VoictentByGeppFromVoqueUnion<TVoque extends GenericVoque> = Simplify<
  UnionToIntersection<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TVoque extends any
      ? {
          [TGepp in TVoque['gepp']]: Voictent2<TVoque, TVoque>;
        }
      : never
  >
>;

type UninferableVoictentByGepp<TImplicitVoqueUnion extends GenericVoque> =
  VoictentByGeppFromVoqueUnion<UninferableVoqueUnion<TImplicitVoqueUnion>>;

// TODO: change this to extract any voque whose receieved hubblepup includes Error (I tried this and couldn't get it to work :sad-face:)
type ErrorGepp<TAllVoqueUnion extends GenericVoque> = Extract<
  TAllVoqueUnion['gepp'],
  ProgramErrorGepp
>;

type SerializeeGepp<TAllVoqueUnion extends GenericVoque> = Extract<
  TAllVoqueUnion,
  GenericAbstractSerializableSourceVoque
>['gepp'];

type AllVoqueUnion<
  TExplicitVoictentTupleVoqueUnion extends GenericVoque,
  TEstinantTupleVoqueUnion extends GenericVoque,
> = TExplicitVoictentTupleVoqueUnion | TEstinantTupleVoqueUnion;

type ImplicitVoqueUnion<
  TRequiredVoqueUnion extends GenericVoque,
  TExplicitVoqueUnion extends GenericVoque,
> = Exclude<TRequiredVoqueUnion, TExplicitVoqueUnion>;

type DigikikifierInputFromAllComputedUnions<
  TExplicitVoictentTuple extends UnsafeVoictent2Tuple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
  TAllVoqueUnion extends GenericVoque,
  TImplicitVoqueUnion extends GenericVoque,
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
  TExplicitVoictentTuple extends UnsafeVoictent2Tuple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
  TExplicitVoictentTupleVoqueUnion extends GenericVoque,
  TEstinantTupleVoqueUnion extends GenericVoque,
> = DigikikifierInputFromAllComputedUnions<
  TExplicitVoictentTuple,
  TEstinantTuple,
  AllVoqueUnion<TExplicitVoictentTupleVoqueUnion, TEstinantTupleVoqueUnion>,
  ImplicitVoqueUnion<TEstinantTupleVoqueUnion, TExplicitVoictentTupleVoqueUnion>
>;

type DigikikifierInput<
  TExplicitVoictentTuple extends UnsafeVoictent2Tuple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
> = DigikikifierInputFromPreliminaryComputedUnions<
  TExplicitVoictentTuple,
  TEstinantTuple,
  VoqueUnionFromVoictentTuple<TExplicitVoictentTuple>,
  VoqueUnionFromEstinantTuple<TEstinantTuple>
>;

type Digikikifier = <
  TExplicitVoictentTuple extends UnsafeVoictent2Tuple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
>(
  input: DigikikifierInput<TExplicitVoictentTuple, TEstinantTuple>,
) => void;

const buildSerializableVoictent = (
  serializerGepp: Gepp,
  programFileCache: ProgramFileCache,
): GenericVoictent2 => {
  const serializableVoictent = new SerializableVoictent({
    gepp: serializerGepp,
    programFileCache,
    initialHubblepupPelueTuple: [],
  });

  return serializableVoictent;
};

const buildSerializerEstinantTuple = (
  serializerGepp: Gepp,
  serializeeGeppList: Gepp[],
): GenericEstinant2Tuple => {
  const serializeeGeppSet = new Set(serializeeGeppList);

  const serializerEstinantTuple: UnsafeEstinant2[] = [
    ...serializeeGeppSet,
  ].map<UnsafeEstinant2>((serializeeGepp) => {
    return buildAddMetadataForSerialization({
      inputGepp: serializeeGepp,
      outputGepp: serializerGepp,
    });
  });

  return serializerEstinantTuple;
};

const getVoictentTupleGeppSet = (
  voictentTuple: GenericVoictent2Tuple,
): Set<Gepp> => {
  const voictentTupleGeppSet = new Set(
    voictentTuple.map((voictent) => voictent.gepp),
  );

  return voictentTupleGeppSet;
};

const getEstinantTupleGeppSet = (
  estinantTuple: GenericEstinant2Tuple,
): Gepp[] => {
  const estinantGeppList = estinantTuple.flatMap<Gepp>(
    (estinant: GenericEstinant2) => {
      const leftInputGepp = estinant.leftInputAppreffinge.gepp;
      const rightInputGeppTuple = estinant.rightInputAppreffingeTuple.map(
        (appreffinge) => appreffinge.gepp,
      );
      const outputGeppTuple = estinant.outputAppreffinge.geppTuple;

      return [leftInputGepp, ...rightInputGeppTuple, ...outputGeppTuple];
    },
  );

  const estinantTupleGeppSet = new Set(estinantGeppList);

  const result = [...estinantTupleGeppSet];

  return result;
};

const getInferredFileSystemNodeVoictentTuple = (
  fileSystemNodeGeppCombination: GenericGeppCombination,
): GenericVoictent2Tuple => {
  const geppList = Object.keys(fileSystemNodeGeppCombination);
  const voictentList = geppList.map((gepp) => {
    return new FileSystemNodeVoictent({
      gepp,
      initialHubblepupPelueTuple: [],
    });
  });

  return voictentList;
};

const getInferredInMemoryVoictentTuple = (
  voictentTuple: GenericVoictent2Tuple,
  estinantTuple: GenericEstinant2Tuple,
): GenericVoictent2Tuple => {
  const voictentTupleGeppSet = getVoictentTupleGeppSet(voictentTuple);
  const estinantTupleGeppSet = getEstinantTupleGeppSet(estinantTuple);

  const missingGeppList = estinantTupleGeppSet.filter(
    (gepp) => !voictentTupleGeppSet.has(gepp),
  );

  const inferredVoictentTuple = missingGeppList.map((gepp) => {
    return new InMemoryOdeshin2ListVoictent({
      gepp,
      initialHubblepupPelueTuple: [],
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
 * @readable runAdaptedEngine
 */
export const digikikify: Digikikifier = <
  TExplicitVoictentTuple extends UnsafeVoictent2Tuple,
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
  ] as GenericVoictent2Tuple;

  // TODO: consider making this an input argument
  // note: The core engine will provide a signal if someone passes in a collection with the same Gepp
  const serializerGepp = 'serialized';

  const serializableVoictent = buildSerializableVoictent(
    serializerGepp,
    programFileCache,
  );

  const genericFileSystemNodeGeppCombination =
    specificFileSystemNodeGeppCombination as GenericGeppCombination;

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

  const serializeeGeppList = specificSerializeeGeppList as Gepp[];

  const serializerEstinantTuple = buildSerializerEstinantTuple(
    serializerGepp,
    serializeeGeppList,
  );

  const inputVoictentTuple: GenericVoictent2[] = [
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
  TVoictentTuple extends GenericVoictent2Tuple,
> = {
  [TIndex in keyof TVoictentTuple]: {
    [TKey in TVoictentTuple[TIndex]['gepp']]: TVoictentTuple[TIndex];
  };
};

type VoictentByGeppFromVoictentTuple<
  TVoictentTuple extends GenericVoictent2Tuple,
> = Simplify<
  UnionToIntersection<
    VoictentByGeppTupleFromVoictentTuple<TVoictentTuple>[number]
  >
>;

export const buildVoictentByGepp = <
  TVoictentTuple extends GenericVoictent2Tuple,
>(
  voictentTuple: TVoictentTuple,
): VoictentByGeppFromVoictentTuple<TVoictentTuple> => {
  const entryList = voictentTuple.map((voictent) => {
    return [voictent.gepp, voictent] as const;
  });

  const result = Object.fromEntries(
    entryList,
  ) as VoictentByGeppFromVoictentTuple<TVoictentTuple>;

  return result;
};

type GeppCombinationFromGeppUnion<TGeppUnion extends Gepp> = Simplify<
  UnionToIntersection<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TGeppUnion extends any ? { [TGepp in TGeppUnion]: null } : never
  >
>;

export const buildGeppCombination = <TGeppTuple extends GeppTuple>(
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
