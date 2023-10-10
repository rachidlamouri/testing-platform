import { Merge } from 'type-fest';
import { Hubblepup } from '../../core/types/hubblepup/hubblepup';
import { Gepp } from '../../core/types/voictent/gepp';
import { Voque } from '../../core/types/voque/voque';
import { AbstractSerializableIndexByName } from '../voictent/abstractSerializableVoictent';

export type InMemoryIndexByName = Merge<
  AbstractSerializableIndexByName,
  {
    listIndex: number;
  }
>;

/**
 * Definese the type information needed to collect and stream data in memory
 *
 * @readableName InMemoryStreamMetatype
 */
export type InMemoryVoque<
  TGepp extends Gepp,
  THubblepupPelue extends Hubblepup,
  THubblepupPelie extends Hubblepup,
  TIndexByName extends InMemoryIndexByName,
  TVoictentPelie,
> = Voque<
  TGepp,
  THubblepupPelue,
  THubblepupPelie,
  TIndexByName,
  TVoictentPelie
>;

export type StandardInMemoryVoque<
  TGepp extends Gepp,
  THubblepup extends Hubblepup,
> = InMemoryVoque<
  TGepp,
  THubblepup,
  THubblepup,
  InMemoryIndexByName,
  THubblepup[]
>;

export type GenericStandardInMemoryVoque = StandardInMemoryVoque<
  Gepp,
  Hubblepup
>;

export type GenericInMemoryVoque = InMemoryVoque<
  Gepp,
  Hubblepup,
  Hubblepup,
  InMemoryIndexByName,
  // TODO: this "unknown" is problematic. It allows a program to specify a
  // collection whose collection stream will not satisfy the constraints of a
  // transform that uses the correct metastream type
  unknown
>;
