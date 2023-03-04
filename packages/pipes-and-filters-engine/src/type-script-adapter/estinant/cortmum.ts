import { Estinant } from './estinant';
import { Tropoignant } from '../tropoignant';
import {
  VoictentTuple,
  VoictentTupleToAggregateVoictentRecord,
  VoictentTupleToGeppTuple,
} from '../voictent';
import { Pinbetunf } from '../pinbetunf';
import { HubblepupTuple } from '../hubblepup';
import { Vition, VitionToHubblepupInputList } from '../vition';
import { RightAppreffingeTuple } from '../appreffinge';
import { Gepp } from '../gepp';

export type CortmumPinbetunf<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = Pinbetunf<
  VitionToHubblepupInputList<TInputVition>,
  VoictentTupleToAggregateVoictentRecord<TOutputVoictentTuple>
>;

export type CortmumTropoignant<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = Tropoignant<TInputVition, TOutputVoictentTuple>;

/**
 * A many to many estinant
 */
export type Cortmum<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = Estinant<TInputVition, TOutputVoictentTuple>;

export type CortmumBuilderInput<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = {
  leftGepp: TInputVition['leftVoictent']['gepp'];
  rightAppreffingeTuple: RightAppreffingeTuple<TInputVition>;
  outputGeppTuple: VoictentTupleToGeppTuple<TOutputVoictentTuple>;
  pinbe: CortmumPinbetunf<TInputVition, TOutputVoictentTuple>;
};

export const buildCortmum = <
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
>({
  leftGepp,
  rightAppreffingeTuple,
  outputGeppTuple,
  pinbe,
}: CortmumBuilderInput<TInputVition, TOutputVoictentTuple>): Cortmum<
  TInputVition,
  TOutputVoictentTuple
> => {
  const tropoig: CortmumTropoignant<TInputVition, TOutputVoictentTuple> = (
    ...inputTuple
  ) => {
    const outputAggregateVoictentRecord = pinbe(...inputTuple) as Record<
      Gepp,
      HubblepupTuple
    >;

    const outputCache = new Map<Gepp, HubblepupTuple>();
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

  const estinant: Cortmum<TInputVition, TOutputVoictentTuple> = {
    leftAppreffinge: {
      gepp: leftGepp,
    },
    rightAppreffingeTuple,
    tropoig,
  };

  return estinant;
};
