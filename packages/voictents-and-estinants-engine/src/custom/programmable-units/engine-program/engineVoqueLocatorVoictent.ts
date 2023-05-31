import { AbstractAsymmetricInMemoryVoictent2 } from '../in-memory-cache/abstractInMemoryVoictent2';
import { ZornableIndexByName } from '../in-memory-cache/zornable';
import {
  ENGINE_VOQUE_LOCATOR_GEPP,
  EmittedEngineVoqueLocator,
  EngineVoqueLocatorVoque,
  ReceivedEngineVoqueLocator,
} from './engineVoqueLocator';

export class EngineVoqueLocatorVoictent extends AbstractAsymmetricInMemoryVoictent2<
  EngineVoqueLocatorVoque,
  EngineVoqueLocatorVoque
> {
  // TODO: make a class or something that is a set instead of just an array
  private zornSet = new Set<string>();

  constructor() {
    super({
      gepp: ENGINE_VOQUE_LOCATOR_GEPP,
      initialHubblepupTuple: [],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private getZorn(hubblepup: ReceivedEngineVoqueLocator): string {
    return `${hubblepup.filePath}:${hubblepup.identifierName}`;
  }

  addHubblepup(hubblepup: ReceivedEngineVoqueLocator): void {
    const zorn = this.getZorn(hubblepup);

    if (this.zornSet.has(zorn)) {
      return;
    }

    this.zornSet.add(zorn);
    super.addHubblepup(hubblepup);
  }

  // eslint-disable-next-line class-methods-use-this
  protected transformHubblepup(
    hubblepup: ReceivedEngineVoqueLocator,
  ): EmittedEngineVoqueLocator {
    return {
      zorn: this.getZorn(hubblepup),
      ...hubblepup,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  protected getIndexByName(
    hubblepup: EmittedEngineVoqueLocator,
  ): ZornableIndexByName {
    return {
      serializableId: hubblepup.zorn,
      zorn: hubblepup.zorn,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  protected onTransformedHubblepup(): void {
    // no op
  }
}
