import { digikikify as coreDigikikify } from '../core/digikikify';
import { EstinantTuple as CoreEstinantTuple } from '../core/estinant';
import { Quirm } from '../core/quirm';
import { StralineTuple } from '../utilities/semantic-types/straline';
import { Estinant } from './estinant/estinant';
import { VickenTupleToVoictentTuple } from './vicken';
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
type AnyEstinant = Estinant<any, any>;

type AnyEstinantTuple = readonly AnyEstinant[];

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
};

type QuirmDebuggerFromEstinantTuple<TEstinantTuple extends AnyEstinantTuple> = {
  handlerByGepp: EstinantTupleToPartialAggregateQuirmHandler<TEstinantTuple>;
  defaultHandler: OnHubblepupAddedToVoictentsHandler<TEstinantTuple>;
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
  });
};
