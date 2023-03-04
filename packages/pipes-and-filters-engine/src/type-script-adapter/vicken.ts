import { Tuple } from '../utilities/semantic-types/tuple';
import { Zorn } from '../utilities/semantic-types/zorn';
import {
  Voictent,
  VoictentTuple,
  VoictentTupleToHubblepupTuple,
} from './voictent';

export type Vicken<
  TVoictent extends Voictent = Voictent,
  TVoictentTuple extends Tuple<TVoictent> = Tuple<TVoictent>,
  TZorn extends Zorn = Zorn,
> = {
  voictent: TVoictent;
  voictentTuple: TVoictentTuple;
  zorn: TZorn;
};

export type VickenTuple = Tuple<Vicken>;

export type VickenTupleToHubblepupTuple<TVickenTuple extends VickenTuple> = {
  [Index in keyof TVickenTuple]: VoictentTupleToHubblepupTuple<
    TVickenTuple[Index]['voictentTuple']
  >;
};

export type VickenTupleToVoictentTuple<TVickenTuple extends VickenTuple> = {
  [Index in keyof TVickenTuple]: TVickenTuple[Index]['voictent'];
};

type VickenVoictentTupleToZornTuple<
  TVoictentTuple extends VoictentTuple,
  TZorn extends Zorn,
> = {
  [Index in keyof TVoictentTuple]: TZorn;
};

export type VickenZornTuple<TVicken extends Vicken> = Readonly<
  VickenVoictentTupleToZornTuple<TVicken['voictentTuple'], TVicken['zorn']>
>;
