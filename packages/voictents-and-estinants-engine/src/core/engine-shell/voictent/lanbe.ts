import { Simplify } from 'type-fest';
import { Hubblepup, HubblepupTuple } from '../quirm/hubblepup';
import { GenericVoictentConfiguration } from '../../engine/voque';

export enum LanbeTypeName {
  VoictentLanbe = 'VoictentLanbe',
  VoictentItemLanbe = 'VoictentItemLanbe',
  VoictentItemLanbe2 = 'VoictentItemLanbe2',
}

export enum ReferenceTypeName {
  Voictent = 'Voictent',
  VoictentItem = 'VoictentItem',
  IndexedVoictentItem = 'IndexedVoictentItem',
}

type BaseLanbe<
  TLanbeTypeName extends LanbeTypeName,
  TReferenceTypeName extends ReferenceTypeName,
  TOutput extends Hubblepup | HubblepupTuple,
> = {
  typeName: TLanbeTypeName;
  debugName: string;
  hasNext: () => boolean;
  advance: () => void;
  dereference: () => {
    // TODO: this is just a temporary measure while we update lanbe. So replace "typeName" with something else or just remove it altogether
    typeName: TReferenceTypeName;
    value: TOutput;
  };
};

export type VoictentLanbe = Simplify<
  BaseLanbe<
    LanbeTypeName.VoictentLanbe,
    ReferenceTypeName.Voictent,
    HubblepupTuple
  > & {
    isAccumulating: () => boolean;
  }
>;

export type VoictentItemLanbe = BaseLanbe<
  LanbeTypeName.VoictentItemLanbe,
  ReferenceTypeName.VoictentItem,
  Hubblepup
>;

export type VoictentItemLanbe2<
  TVoictentConfiguration extends GenericVoictentConfiguration,
> = BaseLanbe<
  LanbeTypeName.VoictentItemLanbe2,
  ReferenceTypeName.IndexedVoictentItem,
  TVoictentConfiguration['indexedEmittedHubblepup']
>;

export type GenericVoictentItemLanbe2 =
  VoictentItemLanbe2<GenericVoictentConfiguration>;

/**
 * A data structure that facilitates streaming Hubblepups from a voictent or the entire tuple from the Voictent at once.
 * It encapsulates stream operations on a Voictent.
 * This allows an external entity to read a Voictent without needing a direct reference to it.
 */
export type Lanbe =
  | VoictentLanbe
  | VoictentItemLanbe
  | GenericVoictentItemLanbe2;
