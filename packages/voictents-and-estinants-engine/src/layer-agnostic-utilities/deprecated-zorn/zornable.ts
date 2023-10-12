import { Merge } from 'type-fest';
import { StreamMetatype } from '../../core/types/voque/voque';
import { AbstractSerializableIndexByName } from '../collection/abstractSerializableCollection';
import { CollectionId } from '../../core/types/voictent/gepp';
import { Item } from '../../core/types/hubblepup/hubblepup';

/**
 * An identifiable object.
 *
 * @todo switch to using ComplexId for the identifier
 *
 * @readableName Identifiable
 */
export type Zornable = {
  zorn: string;
};

type ZornableIndexByName = Merge<AbstractSerializableIndexByName, Zornable>;

export type ZornableVoque<
  TGepp extends CollectionId,
  THubblepupPelue extends Item,
  THubblepupPelie extends Item,
  TVoictentPelie,
> = StreamMetatype<
  TGepp,
  THubblepupPelue,
  THubblepupPelie,
  ZornableIndexByName,
  TVoictentPelie
>;
