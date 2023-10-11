import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import {
  Item,
  HubblepupIndexByName,
  IndexedHubblepup,
} from '../hubblepup/hubblepup';
import { CollectionId } from '../voictent/gepp';

/**
 * The type information needed to define a strongly typed stream connection,
 * transform input, transform output, or collection without tightly coupling their
 * instances.
 *
 * @readableName StreamMetatype
 *
 * @canonicalDeclaration
 */
export type StreamMetatype<
  TGepp extends CollectionId,
  TItemEgg extends Item,
  TItem extends Item,
  IndexByName extends HubblepupIndexByName,
  TVoictentPelie,
> = {
  gepp: TGepp;
  indexByName: IndexByName;
  hubblepupPelue: TItemEgg;
  hubblepupPelie: TItem;
  indexedHubblepupPelie: IndexedHubblepup<TItem, IndexByName>;
  voictentPelie: TVoictentPelie;
};

export type GenericVoque = StreamMetatype<
  CollectionId,
  Item,
  Item,
  HubblepupIndexByName,
  unknown
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnsafeVoque = StreamMetatype<any, any, any, any, any>;

export type GenericVoqueTuple = Tuple<GenericVoque>;

export type UnsafeVoqueTuple = Tuple<UnsafeVoque>;
