import { Merge } from 'type-fest';
import { SerializableIndexByName } from '../../example-programs/serializableVoictent';
import { Hubblepup } from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';
import {
  VoictentLanbe,
  LanbeTypeName,
  VoictentItemLanbe2,
  GenericVoictentItemLanbe2,
  ReferenceTypeName,
} from '../engine-shell/voictent/lanbe';
import { Voictent2 } from './voictent2';
import { VoictentConfiguration } from './voictentConfiguration';

export type InMemoryIndexByName = Merge<
  SerializableIndexByName,
  {
    listIndex: number;
  }
>;

class MissingLanbeError extends Error {
  constructor(lanbe: GenericVoictentItemLanbe2) {
    super(`Lanbe "${lanbe.debugName}" does not exist`);
  }
}

type ReceivedHubblepupState = {
  twoTicksAgo: boolean;
  oneTickAgo: boolean;
  thisTick: boolean | null;
};

export type InMemoryVoictentConfiguration<
  TGepp extends Gepp,
  THubblepup extends Hubblepup,
> = VoictentConfiguration<
  TGepp,
  THubblepup,
  THubblepup,
  InMemoryIndexByName,
  THubblepup[]
>;

export type GenericInMemoryVoictentConfiguration =
  InMemoryVoictentConfiguration<Gepp, Hubblepup>;

export type InMemoryVoictentConstructorInput<
  TVoictentConfiguration extends GenericInMemoryVoictentConfiguration,
> = {
  gepp: TVoictentConfiguration['gepp'];
  initialHubblepupTuple: TVoictentConfiguration['outputVoictent'];
};

export class InMemoryVoictent<
  TVoictentConfiguration extends GenericInMemoryVoictentConfiguration,
> implements Voictent2<TVoictentConfiguration>
{
  public readonly gepp: TVoictentConfiguration['gepp'];

  hubblepupTuple: TVoictentConfiguration['outputVoictent'] = [];

  indicesByLanbe: Map<VoictentItemLanbe2<TVoictentConfiguration>, number> =
    new Map();

  static minimumInclusiveIndex = -1;

  private get maximumInclusiveIndex(): number {
    return this.size - 1;
  }

  private receivedHubblepup: ReceivedHubblepupState = {
    twoTicksAgo: false,
    oneTickAgo: false,
    thisTick: null,
  };

  constructor({
    gepp,
    initialHubblepupTuple,
  }: InMemoryVoictentConstructorInput<TVoictentConfiguration>) {
    this.gepp = gepp;

    initialHubblepupTuple.forEach((hubblepup) => {
      this.addHubblepup(hubblepup);
    });
  }

  addHubblepup(hubblepup: TVoictentConfiguration['inputHubblepup']): void {
    this.receivedHubblepup.thisTick = true;

    this.hubblepupTuple.push(hubblepup);
  }

  onTickStart(): void {
    // eslint-disable-next-line prefer-destructuring
    this.receivedHubblepup = {
      twoTicksAgo: this.receivedHubblepup.oneTickAgo,
      oneTickAgo: this.receivedHubblepup.thisTick ?? false,
      thisTick: null,
    };
  }

  get didStopAccumulating(): boolean {
    return (
      this.receivedHubblepup.twoTicksAgo && !this.receivedHubblepup.oneTickAgo
    );
  }

  createVoictentLanbe(debugName: string): VoictentLanbe {
    const lanbe: VoictentLanbe = {
      typeName: LanbeTypeName.VoictentLanbe,
      debugName,
      hasNext: () => {
        return this.didStopAccumulating;
      },
      isAccumulating: () => {
        return (
          this.receivedHubblepup.twoTicksAgo ||
          this.receivedHubblepup.oneTickAgo ||
          (this.receivedHubblepup.thisTick ?? false)
        );
      },
      advance: () => {},
      dereference: () => {
        return {
          typeName: ReferenceTypeName.Voictent,
          value: [...this.hubblepupTuple],
        };
      },
    };

    return lanbe;
  }

  createVoictentItemLanbe(
    debugName: string,
  ): VoictentItemLanbe2<TVoictentConfiguration> {
    const lanbe: VoictentItemLanbe2<TVoictentConfiguration> = {
      typeName: LanbeTypeName.VoictentItemLanbe2,
      debugName,
      hasNext: () => {
        return this.hasNext(lanbe);
      },
      advance: () => {
        this.advance(lanbe);
      },
      dereference: () => {
        const value = this.dereference(lanbe);

        return {
          typeName: ReferenceTypeName.IndexedVoictentItem,
          value,
        };
      },
    };

    this.indicesByLanbe.set(lanbe, InMemoryVoictent.minimumInclusiveIndex);
    return lanbe;
  }

  private getLanbeIndex(
    lanbe: VoictentItemLanbe2<TVoictentConfiguration>,
  ): number {
    const index = this.indicesByLanbe.get(lanbe);

    if (index === undefined) {
      throw new MissingLanbeError(lanbe);
    }

    return index;
  }

  get size(): number {
    return this.hubblepupTuple.length;
  }

  private hasNext(lanbe: VoictentItemLanbe2<TVoictentConfiguration>): boolean {
    const currentIndex = this.getLanbeIndex(lanbe);
    return this.size > 0 && currentIndex < this.maximumInclusiveIndex;
  }

  private advance(lanbe: VoictentItemLanbe2<TVoictentConfiguration>): void {
    if (this.hasNext(lanbe)) {
      const currentIndex = this.getLanbeIndex(lanbe);
      this.indicesByLanbe.set(lanbe, currentIndex + 1);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getSerializableId(
    hubblepup: TVoictentConfiguration['inputHubblepup'],
    listIndex: number,
  ): string {
    return `${listIndex}`;
  }

  private dereference(
    lanbe: VoictentItemLanbe2<TVoictentConfiguration>,
  ): TVoictentConfiguration['indexedOutputHubblepup'] {
    const listIndex = this.getLanbeIndex(lanbe);

    if (listIndex === InMemoryVoictent.minimumInclusiveIndex) {
      throw Error('There is nothing to reference');
    }

    const hubblepup = this.hubblepupTuple[listIndex];
    return {
      hubblepup,
      indexByName: {
        serializableId: this.getSerializableId(hubblepup, listIndex),
        listIndex,
      },
    };
  }
}
