import { MergeTuple } from '../utilities/mergeTuple';
import { List } from '../utilities/semantic-types/list';
import { Tuple } from '../utilities/semantic-types/tuple';
import { Gepp } from './gepp';
import { Hubblepup, HubblepupTuple } from './hubblepup';
import { Quirm } from './quirm';

export type VoictentItem<
  TGepp extends Gepp = Gepp,
  THubblepup extends Hubblepup = Hubblepup,
> = {
  gepp: TGepp;
  hubblepup: THubblepup;
};

export type Voictent<
  TGepp extends Gepp = Gepp,
  THubblepup extends Hubblepup = Hubblepup,
> = {
  gepp: TGepp;
  hubblepupTuple: readonly THubblepup[];
};

export type VoictentToVoictentItem<TVoictent extends Voictent> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TVoictent extends any
    ? {
        gepp: TVoictent['gepp'];
        hubblepup: TVoictent['hubblepupTuple'][number];
      }
    : never;

export type VoictentArrayToVoictentItem<TVoictentArray extends Voictent[]> =
  VoictentToVoictentItem<TVoictentArray[number]>;

export type VoictentTuple = Tuple<Voictent>;

export type VoictentTupleTuple = Tuple<VoictentTuple>;

export type VoictentList = List<Voictent>;

export type VoictentToHubblepup<TVoictent extends Voictent> =
  TVoictent['hubblepupTuple'][number];

export type VoictentTupleToHubblepupTuple<
  TVoictentTuple extends VoictentTuple,
> = {
  [Index in keyof TVoictentTuple]: TVoictentTuple[Index]['hubblepupTuple'][number];
};

export type VoictentTupleToHubblepupTupleTuple<
  TVoictentTuple extends VoictentTuple,
> = {
  [Index in keyof TVoictentTuple]: TVoictentTuple[Index]['hubblepupTuple'];
};

export type VoictentToQuirm<TVoictent extends Voictent> = Quirm<{
  gepp: TVoictent['gepp'];
  hubblepup: TVoictent['hubblepupTuple'][number];
}>;

export type VoictentTupleToQuirm<TVoictentTuple extends VoictentTuple> = {
  [Index in keyof TVoictentTuple]: VoictentToQuirm<TVoictentTuple[Index]>;
}[number];

export type VoictentTupleToQuirmList<TVoictentTuple extends VoictentTuple> = {
  [Index in keyof TVoictentTuple]: VoictentToQuirm<TVoictentTuple[Index]>;
}[number][];

export type VoictentTupleToQuirmTuple<TVoictentTuple extends VoictentTuple> = {
  [Index in keyof TVoictentTuple]: VoictentToQuirm<TVoictentTuple[Index]>;
};

export type VoictentTupleToGeppTuple<TVoictentTuple extends VoictentTuple> = {
  [Index in keyof TVoictentTuple]: TVoictentTuple[Index]['gepp'];
};

export type VoictentRecord = Record<Gepp, HubblepupTuple>;

export type VoictentToVoictentRecord<TVoictent extends Voictent> = {
  [Key in TVoictent['gepp']]: TVoictent['hubblepupTuple'];
};

export type VoictentTupleToVoictentRecordTuple<
  TVoictentTuple extends VoictentTuple,
> = {
  [Index in keyof TVoictentTuple]: VoictentToVoictentRecord<
    TVoictentTuple[Index]
  >;
};

export type VoictentTupleToAggregateVoictentRecord<
  TVoictentTuple extends VoictentTuple,
> = MergeTuple<VoictentTupleToVoictentRecordTuple<TVoictentTuple>>;

export type VoictentTupleTupleToHubblepupTupleTuple<
  TVoictentTupleTuple extends VoictentTupleTuple,
> = {
  [Index in keyof TVoictentTupleTuple]: VoictentTupleToHubblepupTuple<
    TVoictentTupleTuple[Index]
  >;
};

export type VoictentTupleToGeppIntersection<
  TVoictentTuple extends VoictentTuple,
> = MergeTuple<VoictentTupleToGeppTuple<TVoictentTuple>>;

export type VoictentTupleTupleToGeppIntersectionTuple<
  TVoictentTupleTuple extends VoictentTupleTuple,
> = {
  [Index in keyof TVoictentTupleTuple]: VoictentTupleToGeppIntersection<
    TVoictentTupleTuple[Index]
  >;
};

export type VoictentUnionToAggregateVoictentRecord<
  TVoictentUnion extends Voictent,
> = {
  [TVoictent in TVoictentUnion as TVoictent['gepp'] &
    string]: TVoictent['hubblepupTuple'];
};
