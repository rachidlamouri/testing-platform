import { CustomMap } from '../../utilities/customMap';
import { UnknownBuilderConfiguration } from '../builderConfiguration';
import {
  UnknownCollectionLocator,
  UnknownCollectionLocatorTuple,
} from '../collectionLocator';
import {
  UnknownDatumInstanceConfiguration,
  UnknownNormalizedDatumInstancePredicateLocatorCollection,
} from '../datumInstanceConfiguration';

type MutableInputStatus = {
  locator: UnknownCollectionLocator;
  semantics: UnknownCollectionLocatorTuple;
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
    // TODO: update Custom map to allow for this pattern
    const tempMap = new Map<
      UnknownCollectionLocator,
      UnknownNormalizedDatumInstancePredicateLocatorCollection
    >();
    builderConfiguration.inputPredicateLocatorTuple.forEach(
      (predicateLocatorCollection) => {
        tempMap.set(
          predicateLocatorCollection.instanceIdentifier,
          predicateLocatorCollection,
        );
      },
    );

    this.mutableInputStatusesByLocator = new CustomMap<{
      Key: UnknownCollectionLocator;
      InputValue: MutableInputStatus;
      StoredValue: MutableInputStatus;
    }>({
      mutateStoredValue: (): void => {},
      createDefaultStoredValue: (inputLocator): MutableInputStatus => {
        return {
          locator: inputLocator,
          semantics: (
            tempMap.get(
              inputLocator,
            ) as UnknownNormalizedDatumInstancePredicateLocatorCollection
          ).predicateIdentifiers,
          isReady: false,
        };
      },
      initialKeys: builderConfiguration.inputPredicateLocatorTuple.map(
        (predicateLocatorCollection) =>
          predicateLocatorCollection.instanceIdentifier,
      ),
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

    const currentSemantics = new Set(inputConfiguration.predicateIdentifiers);

    mutableInputStatus.isReady = mutableInputStatus.semantics.every(
      (semanticsIdentifier) => currentSemantics.has(semanticsIdentifier),
    );
  }

  isReady(): boolean {
    return this.mutableInputStatusesByLocator
      .asEntries()
      .every(([, mutableStatus]) => mutableStatus.isReady);
  }
}

export type MutableBuilderConfigurationTuple =
  readonly MutableBuilderConfiguration[];
