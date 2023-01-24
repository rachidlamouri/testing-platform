import { UnknownCollectionLocator } from '../collectionLocator';
import { CustomMap } from '../../utilities/customMap';
import {
  MutableBuilderConfiguration,
  MutableBuilderConfigurationTuple,
} from './mutableBuilderConfiguration';
import { MutableBuilderConfigurationCollection } from './mutableBuilderConfigurationCollection';

export class MutableBuilderConfigurationCollectionsByInputLocator extends CustomMap<{
  Key: UnknownCollectionLocator;
  InputValue: MutableBuilderConfiguration;
  StoredValue: MutableBuilderConfigurationCollection;
}> {
  constructor() {
    super({
      createDefaultStoredValue: () =>
        new MutableBuilderConfigurationCollection(),
      mutateStoredValue: ({ inputValue, storedValue }) => {
        storedValue.add(inputValue);
      },
    });
  }

  private indexMutableBuilderConfiguration(
    mutableBuilderConfiguration: MutableBuilderConfiguration,
  ): void {
    mutableBuilderConfiguration.builderConfiguration.inputPredicateCollection.forEach(
      (inputCollectionLocator) => {
        this.setInputValue(inputCollectionLocator, mutableBuilderConfiguration);
      },
    );
  }

  indexMutableBuilderConfigurationCollection(
    mutableBuilderConfigurationCollection: MutableBuilderConfigurationTuple,
  ): void {
    mutableBuilderConfigurationCollection.forEach(
      (mutableBuilderConfiguration) => {
        this.indexMutableBuilderConfiguration(mutableBuilderConfiguration);
      },
    );
  }
}
