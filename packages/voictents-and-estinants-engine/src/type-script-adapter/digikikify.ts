import {
  digikikify as coreDigikikify,
  OnHubblepupAddedToVoictentsHandler as CoreOnHubblepupAddedToVoictentsHandler,
} from '../core/digikikify';
import { EstinantTuple as CoreEstinantTuple } from '../core/estinant';
import { Quirm } from '../core/quirm';
import { StralineTuple } from '../utilities/semantic-types/straline';
import { Estinant } from './estinant/estinant';
import { VickenTupleToVoictentTuple } from './vicken';
import {
  VoictentArrayToVoictentItem,
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

type OnHubblepupAddedToVoictentsHandler<
  TEstinantTuple extends AnyEstinantTuple,
> = (
  voictentItem: VoictentArrayToVoictentItem<
    EstinantTupleToVoictentArray<TEstinantTuple>
  >,
) => void;

type DigikikifyInput<TEstinantTuple extends AnyEstinantTuple> = {
  initialVoictentsByGepp: EstinantTupleToPartialAggregateVoictentRecord<TEstinantTuple>;
  estinantTuple: TEstinantTuple;
  onHubblepupAddedToVoictents: OnHubblepupAddedToVoictentsHandler<TEstinantTuple>;
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
  onHubblepupAddedToVoictents,
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
    onHubblepupAddedToVoictents:
      onHubblepupAddedToVoictents as CoreOnHubblepupAddedToVoictentsHandler,
  });
};
