import { UnionToIntersection } from 'type-fest';
import {
  RuntimeStatisticsHandler,
  digikikify as coreDigikikify,
} from '../core/engine/digikikify';
import {
  UnsafeEstinant2,
  Estinant2 as CoreEstinant2,
  UnsafeEstinant2Tuple,
  GenericEstinant2,
} from '../core/engine-shell/estinant/estinant';
import { GenericQuirm2, Quirm2 } from '../core/engine-shell/quirm/quirm';
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

type QuirmHandler<TVoque extends GenericVoque> = (
  quirm: Quirm2<TVoque>,
) => void;

type PartialQuirmHandlerDebuggerByGeppUnion<TVoqueUnion extends GenericVoque> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TVoqueUnion extends any
    ? { [TGepp in TVoqueUnion['gepp']]?: QuirmHandler<TVoqueUnion> }
    : never;

type QuirmUnionFromVoqueUnion<TVoqueUnion extends GenericVoque> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TVoqueUnion extends any ? Quirm2<TVoqueUnion> : never;

type OnHubblepupAddedToVoictentsHandler2<TVoqueUnion extends GenericVoque> = (
  quirm: QuirmUnionFromVoqueUnion<TVoqueUnion>,
) => void;

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

type PartialQuirmDebuggerByGepp<TVoqueUnion extends GenericVoque> =
  UnionToIntersection<PartialQuirmHandlerDebuggerByGeppUnion<TVoqueUnion>>;

export type SimplerQuirmDebugger<TVoqueUnion extends GenericVoque> = {
  handlerByGepp: PartialQuirmDebuggerByGepp<TVoqueUnion>;
  defaultHandler: (quirm: GenericQuirm2) => void;
  onFinish: RuntimeStatisticsHandler;
};

export type QuirmDebuggerFromVoqueUnion<TVoqueUnion extends GenericVoque> = {
  handlerByGepp: PartialQuirmDebuggerByGepp<TVoqueUnion>;
  defaultHandler: OnHubblepupAddedToVoictentsHandler2<TVoqueUnion>;
  onFinish?: RuntimeStatisticsHandler;
};

type QuirmDebuggerFromEstinantTuple<
  TEstinantTuple extends UnsafeEstinant2Tuple,
> = QuirmDebuggerFromVoqueUnion<
  EstinantTupleInputOutputVoqueUnion<TEstinantTuple>
>;

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
> = AllVoqueUnion<
  TExplicitVoictentTuple,
  TEstinantTuple
> extends GenericAbstractSerializableSourceVoque
  ? AllVoqueUnion<TExplicitVoictentTuple, TEstinantTuple>['gepp']
  : never;

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
  programFileCache?: ProgramFileCache;
  // TODO: remove this
  quirmDebugger?: QuirmDebuggerFromEstinantTuple<TEstinantTuple>;
};

export const digikikify = <
  TVoictentTupleA extends UnsafeVoictent2Tple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
>({
  populatedVoictentTuple,
  uninferableVoictentTuple,
  estinantTuple,
  serializeeVoictentGeppList,
  programFileCache,
}: DigikikifyInput<TVoictentTupleA, TEstinantTuple>): void => {
  // note: The core engine will provide a signal if someone passes in a collection with the same Gepp
  const serializerVoictentGepp = 'serialized';

  let serializableVoictentMonuple: [] | [GenericVoictent2];
  let serializerEstinantTuple: UnsafeEstinant2[];

  if (serializeeVoictentGeppList !== undefined && programFileCache) {
    serializableVoictentMonuple = [
      new SerializableVoictent({
        gepp: serializerVoictentGepp,
        programFileCache,
        initialHubblepupTuple: [],
      }),
    ];

    serializerEstinantTuple = [
      ...new Set(serializeeVoictentGeppList),
    ].map<UnsafeEstinant2>((serializeeVoictentGepp) => {
      return buildAddMetadataForSerialization({
        inputGepp: serializeeVoictentGepp,
        outputGepp: serializerVoictentGepp,
      });
    });
  } else {
    serializableVoictentMonuple = [];
    serializerEstinantTuple = [];
  }

  const explicitInputVoictentList = [
    ...populatedVoictentTuple,
    ...(uninferableVoictentTuple as GenericVoictent2Tuple),
    ...serializableVoictentMonuple,
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
  });
};
