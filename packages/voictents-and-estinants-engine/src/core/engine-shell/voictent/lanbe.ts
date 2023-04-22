import { Simplify } from 'type-fest';
import { Hubblepup, HubblepupTuple } from '../quirm/hubblepup';

export enum LanbeTypeName {
  VoictentLanbe = 'VoictentLanbe',
  VoictentItemLanbe = 'VoictentItemLanbe',
}

type BaseLanbe<
  TTypeName extends LanbeTypeName,
  TOutput extends Hubblepup | HubblepupTuple,
> = {
  typeName: TTypeName;
  debugName: string;
  hasNext: () => boolean;
  advance: () => void;
  dereference: () => TOutput | null;
};

export type VoictentLanbe = Simplify<
  BaseLanbe<LanbeTypeName.VoictentLanbe, HubblepupTuple> & {
    isAccumulating: () => boolean;
  }
>;

export type VoictentItemLanbe = BaseLanbe<
  LanbeTypeName.VoictentItemLanbe,
  Hubblepup
>;

/**
 * A data structure that facilitates streaming Hubblepups from a voictent or the entire tuple from the Voictent at once.
 * It encapsulates stream operations on a Voictent.
 * This allows an external entity to read a Voictent without needing a direct reference to it.
 */
export type Lanbe = VoictentLanbe | VoictentItemLanbe;
