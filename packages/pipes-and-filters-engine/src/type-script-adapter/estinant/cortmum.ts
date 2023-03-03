import { Estinant } from './estinant';
import { Tropoignant } from '../tropoignant';
import {
  VoictentTuple,
  VoictentTupleToAggregateVoictentRecord,
  VoictentTupleToGeppTuple,
  VoictentTupleToHubblepupTuple,
} from '../voictent';
import { Zorn } from '../../utilities/semantic-types/zorn';
import { Croarder } from '../croarder';
import { Pinbetunf } from '../pinbetunf';
import { HubblepupTuple } from '../hubblepup';

export type CortmumPinbetunf<
  TInputVoictentTuple extends VoictentTuple,
  TOutputVoictentTuple extends VoictentTuple,
> = Pinbetunf<
  VoictentTupleToHubblepupTuple<TInputVoictentTuple>,
  VoictentTupleToAggregateVoictentRecord<TOutputVoictentTuple>
>;

export type CortmumTropoignant<
  TInputVoictentTuple extends VoictentTuple,
  TOutputVoictentTuple extends VoictentTuple,
> = Tropoignant<TInputVoictentTuple, TOutputVoictentTuple>;

/**
 * A many to many estinant
 */
export type Cortmum<
  TInputVoictentTuple extends VoictentTuple,
  TOutputVoictentTuple extends VoictentTuple,
  TZorn extends Zorn,
> = Estinant<TInputVoictentTuple, TOutputVoictentTuple, TZorn>;

export type CortmumBuilderInput<
  TInputVoictentTuple extends VoictentTuple,
  TOutputVoictentTuple extends VoictentTuple,
  TZorn extends Zorn,
> = {
  inputGeppTuple: VoictentTupleToGeppTuple<TInputVoictentTuple>;
  outputGeppTuple: VoictentTupleToGeppTuple<TOutputVoictentTuple>;
  croard: Croarder<TInputVoictentTuple, TZorn>;
  pinbe: CortmumPinbetunf<TInputVoictentTuple, TOutputVoictentTuple>;
};

export const buildCortmum = <
  TInputVoictentTuple extends VoictentTuple,
  TOutputVoictentTuple extends VoictentTuple,
  TZorn extends Zorn,
>({
  inputGeppTuple,
  outputGeppTuple,
  croard,
  pinbe,
}: CortmumBuilderInput<
  TInputVoictentTuple,
  TOutputVoictentTuple,
  TZorn
>): Cortmum<TInputVoictentTuple, TOutputVoictentTuple, TZorn> => {
  const tropoig: CortmumTropoignant<
    TInputVoictentTuple,
    TOutputVoictentTuple
  > = (...inputs) => {
    const outputAggregateVoictentRecord: Record<
      string | number | symbol,
      unknown
    > = pinbe(...inputs);

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

  const estinant: Cortmum<TInputVoictentTuple, TOutputVoictentTuple, TZorn> = {
    inputGeppTuple,
    croard,
    tropoig,
  };

  return estinant;
};
