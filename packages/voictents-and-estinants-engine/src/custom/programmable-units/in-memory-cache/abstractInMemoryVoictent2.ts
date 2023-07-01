import {
  LanbeTypeName,
  ReferenceTypeName,
  VoictentItemLanbe2,
  VoictentLanbe,
} from '../../../core/engine-shell/voictent/lanbe';
import { Voictent2 } from '../../../core/engine/voictent2';
import { GenericVoque } from '../../../core/engine/voque';
import { InMemoryCache } from './inMemoryCache';

type AbstractInMemoryVoictent2ConstructorInput<TVoque extends GenericVoque> = {
  gepp: TVoque['gepp'];
  initialHubblepupTuple: TVoque['receivedHubblepup'][];
};

export abstract class AbstractAsymmetricInMemoryVoictent2<
    TRestrictingVoque extends GenericVoque,
    TVoque extends TRestrictingVoque,
  >
  extends InMemoryCache<TVoque['emittedHubblepup']>
  implements Voictent2<TRestrictingVoque, TVoque>
{
  public readonly gepp: TVoque['gepp'];

  private initialHubblepupTuple: TVoque['emittedHubblepup'][];

  constructor({
    gepp,
    initialHubblepupTuple,
  }: AbstractInMemoryVoictent2ConstructorInput<TVoque>) {
    super();

    this.gepp = gepp;
    this.initialHubblepupTuple = initialHubblepupTuple;
  }

  initialize(): void {
    this.initialHubblepupTuple.forEach((hubblepup) => {
      this.addHubblepup(hubblepup);
    });
  }

  addHubblepup(hubblepup: TVoque['receivedHubblepup']): void {
    const transformedHubblepup = this.transformHubblepup(hubblepup);
    this.addDatum(transformedHubblepup);
    this.onTransformedHubblepup(
      transformedHubblepup,
      this.datumTuple.length - 1,
    );
  }

  protected abstract transformHubblepup(
    hubblepup: TVoque['receivedHubblepup'],
  ): TVoque['emittedHubblepup'];

  protected abstract getIndexByName(
    hubblepup: TVoque['emittedHubblepup'],
  ): TVoque['indexByName'];

  protected abstract onTransformedHubblepup(
    hubblepup: TVoque['emittedHubblepup'],
    index: number,
  ): void;

  createVoictentLanbe(debugName: string): VoictentLanbe | null {
    const lanbe: VoictentLanbe = {
      typeName: LanbeTypeName.VoictentLanbe,
      debugName,
      hasNext: () => {
        return this.didStopAccumulating;
      },
      isAccumulating: () => {
        return this.isAccumulating;
      },
      advance: () => {},
      dereference: () => {
        return {
          typeName: ReferenceTypeName.Voictent,
          value: [...this.datumTuple],
        };
      },
    };

    return lanbe;
  }

  createVoictentItemLanbe(
    debugName: string,
  ): VoictentItemLanbe2<TRestrictingVoque, TVoque> {
    const pointer = this.createPointer(debugName);

    const lanbe: VoictentItemLanbe2<TRestrictingVoque, TVoque> = {
      typeName: LanbeTypeName.VoictentItemLanbe2,
      debugName,
      hasNext: () => {
        return pointer.hasNext();
      },
      advance: () => {
        pointer.advance();
      },
      dereference: () => {
        const hubblepup = pointer.dereference();

        const indexedHubblepup = {
          indexByName: this.getIndexByName(hubblepup),
          hubblepup,
        };

        return {
          typeName: ReferenceTypeName.IndexedVoictentItem,
          value: indexedHubblepup,
        };
      },
    };

    return lanbe;
  }
}
