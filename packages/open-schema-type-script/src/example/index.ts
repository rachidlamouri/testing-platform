import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import { ROOT_DATUM_INSTANCE_LOCATOR } from '../collectionLocator';
import { UnknownDatumInstanceConfigurationTuple } from '../datumInstanceConfiguration';
import { run } from '../representation-engine/run';

const builderConfigurationCollection = [
  {
    buildCollection: (): UnknownDatumInstanceConfigurationTuple => [
      {
        instanceIdentifier: 'instance-1',
        datumInstance: 'hello',
      },
    ],
    inputCollectionLocatorCollection: [ROOT_DATUM_INSTANCE_LOCATOR],
  },
  {
    buildCollection: (): UnknownDatumInstanceConfigurationTuple => [
      {
        instanceIdentifier: 'instance-1/instance-2',
        datumInstance: 2,
      },
      {
        instanceIdentifier: 'instance-1/instance-3',
        datumInstance: 3,
      },
    ],
    inputCollectionLocatorCollection: ['instance-1'],
  },
] as const satisfies UnknownBuilderConfigurationTuple;

run({
  builderConfigurationCollection,
});
