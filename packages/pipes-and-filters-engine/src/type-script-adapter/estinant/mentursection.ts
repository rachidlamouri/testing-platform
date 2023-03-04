import { Estinant } from './estinant';
import { Tropoignant } from '../tropoignant';
import {
  Voictent,
  VoictentToHubblepup,
  VoictentTuple,
  VoictentTupleToAggregateVoictentRecord,
  VoictentTupleToGeppTuple,
} from '../voictent';
import { Pinbetunf } from '../pinbetunf';
import { HubblepupTuple } from '../hubblepup';
import { StralineObject } from '../../utilities/semantic-types/straline';
import { Vition } from '../vition';

export type MentursectionPinbetunf<
  TInputVoictent extends Voictent,
  TOutputVoictentTuple extends VoictentTuple,
> = Pinbetunf<
  [VoictentToHubblepup<TInputVoictent>],
  VoictentTupleToAggregateVoictentRecord<TOutputVoictentTuple>
>;

export type MentursectionTropoignant<
  TInputVoictent extends Voictent,
  TOutputVoictentTuple extends VoictentTuple,
> = Tropoignant<Vition<TInputVoictent, []>, TOutputVoictentTuple>;

/**
 * A one to many estinant
 */
export type Mentursection<
  TInputVoictent extends Voictent,
  TOutputVoictentTuple extends VoictentTuple,
> = Estinant<Vition<TInputVoictent, []>, TOutputVoictentTuple>;

export type MentursectionBuilderInput<
  TInputVoictent extends Voictent,
  TOutputVoictentTuple extends VoictentTuple,
> = {
  inputGepp: TInputVoictent['gepp'];
  outputGeppTuple: VoictentTupleToGeppTuple<TOutputVoictentTuple>;
  pinbe: MentursectionPinbetunf<TInputVoictent, TOutputVoictentTuple>;
};

export const buildMentursection = <
  TInputVoictent extends Voictent,
  TOutputVoictentTuple extends VoictentTuple,
>({
  inputGepp,
  outputGeppTuple,
  pinbe,
}: MentursectionBuilderInput<
  TInputVoictent,
  TOutputVoictentTuple
>): Mentursection<TInputVoictent, TOutputVoictentTuple> => {
  const tropoig: MentursectionTropoignant<
    TInputVoictent,
    TOutputVoictentTuple
  > = (input) => {
    const outputAggregateVoictentRecord = pinbe(input) as StralineObject;

    const outputCache = new Map<unknown, unknown>();
    Object.entries(outputAggregateVoictentRecord).forEach(([key, value]) => {
      outputCache.set(key, value);
    });

    const outputQuirmList = outputGeppTuple.flatMap((gepp) => {
      const hubblepupTuple = outputCache.get(gepp) as HubblepupTuple;

      return hubblepupTuple.map((hubblepup) => ({
        gepp,
        hubblepup,
      }));
    });

    return outputQuirmList;
  };

  const estinant: Mentursection<TInputVoictent, TOutputVoictentTuple> = {
    leftAppreffinge: { gepp: inputGepp },
    rightAppreffingeTuple: [],
    tropoig,
  };

  return estinant;
};
