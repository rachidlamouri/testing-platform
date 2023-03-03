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
import { kodatar } from '../kodataring';
import { Struss } from '../../utilities/semantic-types/struss';
import { HubblepupTuple } from '../hubblepup';

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
> = Tropoignant<[TInputVoictent], TOutputVoictentTuple>;

/**
 * A one to many estinant
 */
export type Mentursection<
  TInputVoictent extends Voictent,
  TOutputVoictentTuple extends VoictentTuple,
> = Estinant<[TInputVoictent], TOutputVoictentTuple, Struss>;

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
    const outputAggregateVoictentRecord: Record<
      string | number | symbol,
      unknown
    > = pinbe(input);

    const outputCache = new Map<string | number | symbol, unknown>();
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
    inputGeppTuple: [inputGepp],
    croard: kodatar,
    tropoig,
  };

  return estinant;
};
