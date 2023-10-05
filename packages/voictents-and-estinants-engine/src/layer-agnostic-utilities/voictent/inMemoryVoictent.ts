import { HubblepupPelieLanbe2 } from '../../core/types/lanbe/lanbe';
import {
  AbstractInMemoryVoictent,
  DereferenceError,
} from './abstractInMemoryVoictent';
import { GenericInMemoryVoque } from '../voque/inMemoryVoque';

/**
 * A collection that can store any hubblepup in an in-memory array.
 *
 * @readableName InMemoryCollection
 */
export class InMemoryVoictent<
  TVoque extends GenericInMemoryVoque,
> extends AbstractInMemoryVoictent<GenericInMemoryVoque, TVoque> {
  protected dereferenceVoictentPelie(): TVoque['voictentPelie'] {
    return this.hubblepupPelieTuple;
  }

  protected dereferenceHubblepupPelie(
    lanbe: HubblepupPelieLanbe2<GenericInMemoryVoque, TVoque>,
  ): TVoque['indexedHubblepupPelie'] {
    const listIndex = this.getLanbeIndex(lanbe);

    if (listIndex === AbstractInMemoryVoictent.minimumInclusiveIndex) {
      throw new DereferenceError(lanbe);
    }

    const hubblepup = this.hubblepupPelieTuple[listIndex];
    return {
      hubblepup,
      indexByName: {
        serializableId: `${listIndex}`,
        listIndex,
      },
    };
  }
}
