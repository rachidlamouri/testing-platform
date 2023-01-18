import { buildBuilderConfiguration } from '../buildBuilderConfiguration';
import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import {
  RootDatumInstanceLocator,
  ROOT_DATUM_INSTANCE_LOCATOR,
} from '../collectionLocator';
import { RootDatumInstance } from '../datumInstance';
import { run } from '../representation-engine/run';

const builderConfigurationCollection = [
  buildBuilderConfiguration<{
    InputDatumInstanceConfigurationCollection: [
      {
        instanceIdentifier: RootDatumInstanceLocator;
        datumInstance: RootDatumInstance;
      },
    ];
    OutputDatumInstanceConfigurationCollection: [
      { instanceIdentifier: 'instance-1'; datumInstance: string },
    ];
  }>({
    buildCollection: () => [
      {
        instanceIdentifier: 'instance-1',
        datumInstance: 'hello',
      },
    ],
    inputCollectionLocatorCollection: [ROOT_DATUM_INSTANCE_LOCATOR],
  }),
  buildBuilderConfiguration<{
    InputDatumInstanceConfigurationCollection: [
      { instanceIdentifier: 'instance-1'; datumInstance: string },
    ];
    OutputDatumInstanceConfigurationCollection: [
      {
        instanceIdentifier: 'instance-1/instance-2';
        datumInstance: number;
      },
      {
        instanceIdentifier: 'instance-1/instance-3';
        datumInstance: number;
      },
    ];
  }>({
    buildCollection: () => [
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
  }),
] as const satisfies UnknownBuilderConfigurationTuple;

run({
  builderConfigurationCollection,
});
