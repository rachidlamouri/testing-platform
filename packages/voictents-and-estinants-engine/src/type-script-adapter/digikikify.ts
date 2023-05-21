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
import { Estinant, Estinant2 } from './estinant/estinant';
import { Hubblepup } from './hubblepup';
import { InMemoryVoictent } from '../core/engine/inMemoryVoictent';
import { GenericVoque } from '../core/engine/voque';
import { Gepp } from '../core/engine-shell/voictent/gepp';
import { HubblepupTuple } from '../core/engine-shell/quirm/hubblepup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyEstinant = Estinant<any, any> | Estinant2<any, any, any>;

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

type InitialHubblepupTupleByGeppUnionFromVoqueUnion<
  TVoqueUnion extends GenericVoque,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = TVoqueUnion extends any
  ? { [Key in TVoqueUnion['gepp']]?: TVoqueUnion['receivedHubblepup'][] }
  : never;

type InitialHubblepupTupleByGepp<TEstinantTuple extends UnsafeEstinant2Tuple> =
  UnionToIntersection<
    InitialHubblepupTupleByGeppUnionFromVoqueUnion<
      EstinantTupleInputOutputVoqueUnion<TEstinantTuple>
    >
  >;

type DigikikifyInput<TEstinantTuple extends UnsafeEstinant2Tuple> = {
  initialHubblepupTupleByGepp: InitialHubblepupTupleByGepp<TEstinantTuple>;
  estinantTuple: TEstinantTuple;
  quirmDebugger?: QuirmDebuggerFromEstinantTuple<TEstinantTuple>;
};

export const digikikify = <TEstinantTuple extends UnsafeEstinant2Tuple>({
  initialHubblepupTupleByGepp,
  estinantTuple,
  quirmDebugger: inputDebugger,
}: DigikikifyInput<TEstinantTuple>): void => {
  const inferredGeppSet = new Set(
    Object.keys(initialHubblepupTupleByGepp as Record<Gepp, HubblepupTuple>),
  );

  const inferredVoictentList = Object.entries(
    initialHubblepupTupleByGepp as Record<Gepp, HubblepupTuple>,
  ).map(([gepp, initialHubblepupTuple]) => {
    return new InMemoryVoictent({
      gepp,
      initialHubblepupTuple: initialHubblepupTuple as Hubblepup[],
    });
  });

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

  const otherInputGeppList = [...estinantGeppSet].filter(
    (gepp) => !inferredGeppSet.has(gepp),
  );
  const otherVoictentList = otherInputGeppList.map((gepp) => {
    return new InMemoryVoictent({
      gepp,
      initialHubblepupTuple: [],
    });
  });

  const inputVoictentList = [...inferredVoictentList, ...otherVoictentList];

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
