import {
  LanbeTypeName,
  ReferenceTypeName,
  HubblepupPelieLanbe2,
  VoictentPelieLanbe,
} from '../../../core/engine-shell/voictent/lanbe';
import { Voictent2 } from '../../../core/engine/voictent2';
import { GenericVoque } from '../../../core/engine/voque';
import { InMemoryCache } from './inMemoryCache';

type AbstractInMemoryVoictent2ConstructorInput<TVoque extends GenericVoque> = {
  gepp: TVoque['gepp'];
  initialHubblepupPelueTuple: TVoque['hubblepupPelue'][];
};

export abstract class AbstractAsymmetricInMemoryVoictent2<
    TRestrictingVoque extends GenericVoque,
    TVoque extends TRestrictingVoque,
  >
  extends InMemoryCache<TVoque['hubblepupPelie']>
  implements Voictent2<TRestrictingVoque, TVoque>
{
  public readonly gepp: TVoque['gepp'];

  private initialHubblepupPelueTuple: TVoque['hubblepupPelie'][];

  constructor({
    gepp,
    initialHubblepupPelueTuple,
  }: AbstractInMemoryVoictent2ConstructorInput<TVoque>) {
    super();

    this.gepp = gepp;
    this.initialHubblepupPelueTuple = initialHubblepupPelueTuple;
  }

  initialize(): void {
    this.initialHubblepupPelueTuple.forEach((hubblepup) => {
      this.addHubblepup(hubblepup);
    });
  }

  addHubblepup(hubblepup: TVoque['hubblepupPelue']): void {
    const transformedHubblepup = this.transformHubblepup(hubblepup);
    this.addDatum(transformedHubblepup);
    this.onTransformedHubblepup(
      transformedHubblepup,
      this.datumTuple.length - 1,
    );
  }

  protected abstract transformHubblepup(
    hubblepup: TVoque['hubblepupPelue'],
  ): TVoque['hubblepupPelie'];

  protected abstract getIndexByName(
    hubblepup: TVoque['hubblepupPelie'],
  ): TVoque['indexByName'];

  protected abstract onTransformedHubblepup(
    hubblepup: TVoque['hubblepupPelie'],
    index: number,
  ): void;

  createVoictentLanbe(debugName: string): VoictentPelieLanbe | null {
    const lanbe: VoictentPelieLanbe = {
      typeName: LanbeTypeName.VoictentPelieLanbe,
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
          typeName: ReferenceTypeName.VoictentPelie,
          value: [...this.datumTuple],
        };
      },
    };

    return lanbe;
  }

  createVoictentItemLanbe(
    debugName: string,
  ): HubblepupPelieLanbe2<TRestrictingVoque, TVoque> {
    const pointer = this.createPointer(debugName);

    const lanbe: HubblepupPelieLanbe2<TRestrictingVoque, TVoque> = {
      typeName: LanbeTypeName.HubblepupPelieLanbe2,
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
          typeName: ReferenceTypeName.IndexedHubblepupPelie,
          value: indexedHubblepup,
        };
      },
    };

    return lanbe;
  }
}
