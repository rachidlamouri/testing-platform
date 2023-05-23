import { UnionToIntersection } from 'type-fest';
import {
  RuntimeStatisticsHandler,
  digikikify as coreDigikikify,
} from '../core/engine/digikikify';
import {
  UnsafeEstinant2,
  Estinant2 as CoreEstinant2,
  UnsafeEstinant2Tuple,
  GenericEstinant2Tuple,
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
  quirmDebugger?: QuirmDebuggerFromEstinantTuple<TEstinantTuple>;
};

export const digikikify = <
  TVoictentTupleA extends UnsafeVoictent2Tple,
  TEstinantTuple extends UnsafeEstinant2Tuple,
>({
  populatedVoictentTuple: initialedVoictentTuple,
  uninferableVoictentTuple,
  estinantTuple,
  quirmDebugger: inputDebugger,
}: DigikikifyInput<TVoictentTupleA, TEstinantTuple>): void => {
  const explicitInputVoictentList = [
    ...initialedVoictentTuple,
    ...(uninferableVoictentTuple as GenericVoictent2Tuple),
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

  coreDigikikify({
    inputVoictentList,
    estinantTuple,
    onHubblepupAddedToVoictents: (quirm) => {
      const quirmDebugger =
        inputDebugger as QuirmDebuggerFromEstinantTuple<GenericEstinant2Tuple>;

      if (!quirmDebugger) {
        return;
      }

      const handler =
        quirmDebugger.handlerByGepp[quirm.gepp] ?? quirmDebugger.defaultHandler;

      handler(quirm);
    },
    onFinish: inputDebugger?.onFinish,
  });
};
