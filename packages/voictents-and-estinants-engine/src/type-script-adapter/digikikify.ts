import {
  DigikikifierInput,
  digikikify as coreDigikikify,
} from '../core/engine/digikikify';
import {
  UnsafeEstinant2,
  Estinant2 as CoreEstinant2,
  UnsafeEstinant2Tuple,
  GenericEstinant2,
} from '../core/engine-shell/estinant/estinant';
import { GenericVoque, GenericVoqueTuple, Voque } from '../core/engine/voque';
import { Gepp } from '../core/engine-shell/voictent/gepp';
import {
  GenericVoictent2,
  GenericVoictent2Tuple,
  UnsafeVoictent2,
  UnsafeVoictent2Tple,
  Voictent2,
} from '../core/engine/voictent2';
import {
  GenericInMemoryOdeshin2Voque,
  InMemoryOdeshin2Voictent,
} from '../core/engine/inMemoryOdeshinVoictent2';
import { FlattenTuple } from '../utilities/flattenTuple';
import { DeduplicateTupleItems } from '../utilities/deduplicateTupleItems';
import { FilterTupleByRejectionUnion } from '../utilities/filterTuple';
import { buildAddMetadataForSerialization } from '../example-programs/buildAddMetadataForSerialization';
import { SerializableVoictent } from '../example-programs/serializableVoictent';
import { ProgramFileCache } from '../utilities/programFileCache';
import { GenericAbstractSerializableSourceVoque } from '../example-programs/abstractSerializableVoictent';

type EstinantInputOutputVoqueTuple<TEstinant extends UnsafeEstinant2> =
  TEstinant extends CoreEstinant2<
    infer TLeftInputVicken,
    infer TRightInputVickenTuple,
    infer TOutputVicken
  >
    ? [
        TLeftInputVicken['voque'],
        ...{
          [TIndex in keyof TRightInputVickenTuple]: TRightInputVickenTuple[TIndex]['voque'];
        },
        ...TOutputVicken['outputVoqueOptionTuple'],
      ]
    : never;

type EstinantTupleInputOutputVoqueTupleTuple<
  TEstinantTuple extends UnsafeEstinant2Tuple,
> = {
  [TIndex in keyof TEstinantTuple]: EstinantInputOutputVoqueTuple<
    TEstinantTuple[TIndex]
  >;
};

type EstinantTupleInputOutputVoqueTuple<
  TEstinantTuple extends UnsafeEstinant2Tuple,
> = DeduplicateTupleItems<
  FlattenTuple<EstinantTupleInputOutputVoqueTupleTuple<TEstinantTuple>>
>;

type EstinantInputOutputVoqueUnion<TEstinant extends UnsafeEstinant2> =
  TEstinant extends CoreEstinant2<
    infer TLeftInputVicken,
    infer TRightInputVickenTuple,
    infer TOutputVicken
  >
    ?
        | TLeftInputVicken['voque']
        | TRightInputVickenTuple[number]['voque']
        | TOutputVicken['outputVoqueOptionTuple'][number]
    : never;

type EstinantTupleInputOutputVoqueUnion<
  TEstinantTuple extends UnsafeEstinant2Tuple,
> = {
  [Index in keyof TEstinantTuple]: EstinantInputOutputVoqueUnion<
    TEstinantTuple[Index]
  >;
}[number];

type SimilarVoque<TVoque extends GenericVoque> = Voque<
  Gepp,
  TVoque['receivedHubblepup'],
  TVoque['emittedHubblepup'],
  TVoque['indexByName'],
  TVoque['emittedVoictent']
>;

type InferredVoictent2<TVoque extends GenericVoque> = Voictent2<
  SimilarVoque<TVoque>,
  TVoque
>;

type VoqueUnionFromVoictentUnion<
  TVoictentUnion extends UnsafeVoictent2,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = TVoictentUnion extends Voictent2<any, infer TVoque> ? TVoque : never;

type VoictentTupleFromVoqueTuple<TVoqueTuple extends GenericVoqueTuple> = {
  [TIndex in keyof TVoqueTuple]: InferredVoictent2<TVoqueTuple[TIndex]>;
};

type VoictentListB<
  TExplicitVoictentTuple extends UnsafeVoictent2Tple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
> = VoictentTupleFromVoqueTuple<
  FilterTupleByRejectionUnion<
    EstinantTupleInputOutputVoqueTuple<TEstinantTuple>,
    | VoqueUnionFromVoictentUnion<TExplicitVoictentTuple[number]>
    | GenericInMemoryOdeshin2Voque
  >
>;

type AllVoqueUnion<
  TExplicitVoictentTuple extends UnsafeVoictent2Tple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
> =
  | EstinantTupleInputOutputVoqueUnion<TEstinantTuple>
  | VoqueUnionFromVoictentUnion<TExplicitVoictentTuple[number]>;

type SerializeeVoictentGepp<
  TExplicitVoictentTuple extends UnsafeVoictent2Tple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
> = Extract<
  AllVoqueUnion<TExplicitVoictentTuple, TEstinantTuple>,
  GenericAbstractSerializableSourceVoque
>['gepp'];

type DigikikifyInput<
  TExplicitVoictentTuple extends UnsafeVoictent2Tple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
> = {
  populatedVoictentTuple: TExplicitVoictentTuple;
  uninferableVoictentTuple: VoictentListB<
    TExplicitVoictentTuple,
    TEstinantTuple
  >;
  estinantTuple: TEstinantTuple;
  serializeeVoictentGeppList?: SerializeeVoictentGepp<
    TExplicitVoictentTuple,
    TEstinantTuple
  >[];
  programFileCache: ProgramFileCache;
  strategy?: DigikikifierInput['strategy'];
};

export const digikikify = <
  TVoictentTupleA extends UnsafeVoictent2Tple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
>({
  populatedVoictentTuple,
  uninferableVoictentTuple,
  estinantTuple,
  serializeeVoictentGeppList = [],
  programFileCache,
  strategy,
}: DigikikifyInput<TVoictentTupleA, TEstinantTuple>): void => {
  // note: The core engine will provide a signal if someone passes in a collection with the same Gepp
  const serializerVoictentGepp = 'serialized';

  const serializableVoictent = new SerializableVoictent({
    gepp: serializerVoictentGepp,
    programFileCache,
    initialHubblepupTuple: [],
  });

  const serializerEstinantTuple: UnsafeEstinant2[] = [
    ...new Set(serializeeVoictentGeppList),
  ].map<UnsafeEstinant2>((serializeeVoictentGepp) => {
    return buildAddMetadataForSerialization({
      inputGepp: serializeeVoictentGepp,
      outputGepp: serializerVoictentGepp,
    });
  });

  const explicitInputVoictentList = [
    ...populatedVoictentTuple,
    ...(uninferableVoictentTuple as GenericVoictent2Tuple),
    serializableVoictent,
  ];

  const explicitInputVoictentGeppSet = new Set(
    explicitInputVoictentList.map(
      (voictent: GenericVoictent2) => voictent.gepp,
    ),
  );

  const estinantGeppList = estinantTuple.flatMap<Gepp>(
    (estinant: GenericEstinant2) => [
      estinant.leftInputAppreffinge.gepp,
      ...estinant.rightInputAppreffingeTuple.map(
        (appreffinge) => appreffinge.gepp,
      ),
      ...estinant.outputAppreffinge.geppTuple,
    ],
  );

  const estinantGeppSet = new Set(estinantGeppList);

  const inferredInputGeppList = [...estinantGeppSet].filter(
    (gepp) => !explicitInputVoictentGeppSet.has(gepp),
  );
  const inferredInputVoictentList = inferredInputGeppList.map((gepp) => {
    return new InMemoryOdeshin2Voictent({
      gepp,
      initialHubblepupTuple: [],
    });
  });

  const inputVoictentList = [
    ...explicitInputVoictentList,
    ...inferredInputVoictentList,
  ];

  const inputEstinantTuple = [...estinantTuple, ...serializerEstinantTuple];

  coreDigikikify({
    inputVoictentList,
    estinantTuple: inputEstinantTuple,
    onFinish: (statistics) => {
      if (programFileCache !== undefined) {
        programFileCache.writeRuntimeSnapshot(statistics);
      }
    },
    strategy,
  });
};
