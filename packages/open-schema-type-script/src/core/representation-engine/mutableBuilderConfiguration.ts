import { CustomMap } from '../../utilities/customMap';
import { UnknownBuilderConfiguration } from '../builderConfiguration';
import { UnknownCollectionLocator } from '../collectionLocator';
import { UnknownDatumInstanceConfiguration } from '../datumInstanceConfiguration';

type MutableInputStatus = {
  locator: UnknownCollectionLocator;
  isReady: boolean;
};

export class MutableBuilderConfiguration {
  public mutableInputStatusesByLocator: CustomMap<{
    Key: UnknownCollectionLocator;
    InputValue: MutableInputStatus;
    StoredValue: MutableInputStatus;
  }>;

  constructor(
    public readonly builderConfiguration: UnknownBuilderConfiguration,
  ) {
    this.mutableInputStatusesByLocator = new CustomMap<{
      Key: UnknownCollectionLocator;
      InputValue: MutableInputStatus;
      StoredValue: MutableInputStatus;
    }>({
      mutateStoredValue: (): void => {},
      createDefaultStoredValue: (inputLocator): MutableInputStatus => {
        return {
          locator: inputLocator,
          isReady: false,
        };
      },
      initialKeys: builderConfiguration.inputCollectionLocatorCollection,
    });
  }

  updateInputStatus(
    inputConfiguration: UnknownDatumInstanceConfiguration,
  ): void {
    const mutableInputStatus = this.mutableInputStatusesByLocator.get(
      inputConfiguration.instanceIdentifier,
    );

    if (mutableInputStatus === undefined) {
      return;
    }

    mutableInputStatus.isReady = true;
  }

  isReady(): boolean {
    return this.mutableInputStatusesByLocator
      .asEntries()
      .every(([, mutableStatus]) => mutableStatus.isReady);
  }
}

export type MutableBuilderConfigurationTuple =
  readonly MutableBuilderConfiguration[];
