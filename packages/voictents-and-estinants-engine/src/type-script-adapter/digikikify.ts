import {
  RuntimeStatisticsHandler,
  digikikify as coreDigikikify,
} from '../core/engine/digikikify';
import { EstinantTuple as CoreEstinantTuple } from '../core/engine-shell/estinant/estinant';
import { Quirm } from '../core/engine-shell/quirm/quirm';
import { StralineTuple } from '../utilities/semantic-types/straline';
import { Estinant, Estinant2 } from './estinant/estinant';
import { RightVickenTuple, VickenTupleToVoictentTuple } from './vicken';
import {
  Voictent,
  VoictentArrayToVoictentItem,
  VoictentToQuirm,
  VoictentUnionToAggregateVoictentItemRecord,
  VoictentUnionToAggregateVoictentRecord,
} from './voictent';
import { Gepp } from './gepp';
import { HubblepupTuple } from './hubblepup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyEstinant = Estinant<any, any> | Estinant2<any, any, any>;

type AnyEstinantTuple = readonly AnyEstinant[];

type IDK<TRightVickenTuple extends RightVickenTuple> = {
  [Index in keyof TRightVickenTuple]: TRightVickenTuple[Index]['voictent'];
};

/**
 * Combines the input and output VoictentTuple types for each each estinant individually
 */
type EstinantTupleToCombinedVoictentTuple<
  TEstinantTuple extends AnyEstinantTuple,
> = {
  [Index in keyof TEstinantTuple]: TEstinantTuple[Index] extends Estinant<
    infer TInputVition,
    infer TOutputVoictentTuple
  >
    ?
        | TInputVition['leftVoictent']
        | VickenTupleToVoictentTuple<TInputVition['rightVickenTuple']>[number]
        | TOutputVoictentTuple[number]
    : TEstinantTuple[Index] extends Estinant2<
        infer TLeftVicken,
        infer TRightVickenTuple,
        infer TOutputVickenTuple
      >
    ?
        | TLeftVicken['voictent']
        | IDK<TRightVickenTuple>[number]
        | TOutputVickenTuple[number]['voictent']
    : never;
};

type EstinantTupleToVoictentUnion<TEstinantTuple extends AnyEstinantTuple> =
  EstinantTupleToCombinedVoictentTuple<TEstinantTuple>[number];

type EstinantTupleToVoictentArray<TEstinantTuple extends AnyEstinantTuple> =
  EstinantTupleToVoictentUnion<TEstinantTuple>[];

type EstinantTupleToPartialAggregateVoictentRecord<
  TEstinantTuple extends AnyEstinantTuple,
> = Partial<
  VoictentUnionToAggregateVoictentRecord<
    EstinantTupleToVoictentUnion<TEstinantTuple>
  >
>;

type EstinantTupleToPartialAggregateQuirmHandler<
  TEstinantTuple extends AnyEstinantTuple,
> = {
  [Key in keyof VoictentUnionToAggregateVoictentItemRecord<
    EstinantTupleToVoictentUnion<TEstinantTuple>
  >]?: (quirm: {
    gepp: Key;
    hubblepup: VoictentUnionToAggregateVoictentItemRecord<
      EstinantTupleToVoictentUnion<TEstinantTuple>
    >[Key];
  }) => void;
};

type OnHubblepupAddedToVoictentsHandler<
  TEstinantTuple extends AnyEstinantTuple,
> = (
  voictentItem: VoictentArrayToVoictentItem<
    EstinantTupleToVoictentArray<TEstinantTuple>
  >,
) => void;

export type QuirmDebugger<TVoictent extends Voictent> = {
  handlerByGepp: {
    [Key in TVoictent['gepp']]?: (quirm: VoictentToQuirm<TVoictent>) => void;
  };
  defaultHandler: (quirm: Quirm) => void;
  onFinish: RuntimeStatisticsHandler;
};

type QuirmDebuggerFromEstinantTuple<TEstinantTuple extends AnyEstinantTuple> = {
  handlerByGepp: EstinantTupleToPartialAggregateQuirmHandler<TEstinantTuple>;
  defaultHandler: OnHubblepupAddedToVoictentsHandler<TEstinantTuple>;
  onFinish?: RuntimeStatisticsHandler;
};

type DigikikifyInput<TEstinantTuple extends AnyEstinantTuple> = {
  initialVoictentsByGepp: EstinantTupleToPartialAggregateVoictentRecord<TEstinantTuple>;
  estinantTuple: TEstinantTuple;
  quirmDebugger?: QuirmDebuggerFromEstinantTuple<TEstinantTuple>;
};

type InferredDigikikifyInput<TPotentialEstinantTuple> =
  TPotentialEstinantTuple extends AnyEstinantTuple
    ? DigikikifyInput<TPotentialEstinantTuple>
    : DigikikifyInput<[]>;

/**
 * Inputs types are inferred from the "estinantTuple" type, so if the "estinantTuple" type
 * is not an EstinantTuple then all inputs get inferred to empty lists.
 */
export const digikikify = <TPotentialEstinantTuple extends StralineTuple>({
  initialVoictentsByGepp,
  estinantTuple,
  quirmDebugger: inputDebugger,
}: InferredDigikikifyInput<TPotentialEstinantTuple>): void => {
  coreDigikikify({
    initialQuirmTuple: Object.entries(
      initialVoictentsByGepp as Record<Gepp, HubblepupTuple>,
    ).flatMap<Quirm>(([gepp, hubblepupTuple]) => {
      return hubblepupTuple.map<Quirm>((hubblepup) => {
        return {
          gepp,
          hubblepup,
        };
      });
    }),
    estinantTuple: estinantTuple as CoreEstinantTuple,
    onHubblepupAddedToVoictents: (quirm) => {
      const quirmDebugger = inputDebugger as QuirmDebugger<Voictent>;

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
