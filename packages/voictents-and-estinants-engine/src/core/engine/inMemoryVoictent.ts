import { VoictentItemLanbe2 } from '../engine-shell/voictent/lanbe';
import {
  AbstractInMemoryVoictent,
  DereferenceError,
} from './abstractInMemoryVoictent';
import { GenericInMemoryVoque } from './inMemoryVoque';

export class InMemoryVoictent<
  TVoque extends GenericInMemoryVoque,
> extends AbstractInMemoryVoictent<GenericInMemoryVoque, TVoque> {
  protected dereference(
    lanbe: VoictentItemLanbe2<GenericInMemoryVoque, TVoque>,
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
