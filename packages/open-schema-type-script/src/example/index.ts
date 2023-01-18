import { buildBuilderConfiguration } from '../buildBuilderConfiguration';
import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import { ROOT_DATUM_INSTANCE_LOCATOR } from '../collectionLocator';
import {
  DatumInstanceConfiguration,
  RootDatumInstanceConfiguration,
} from '../datumInstanceConfiguration';
import { run } from '../representation-engine/run';

type Instance1Configuration = DatumInstanceConfiguration<{
  instanceIdentifier: 'instance-1';
  datumInstance: string;
}>;

type Instance2Configuration = DatumInstanceConfiguration<{
  instanceIdentifier: 'instance-1/instance-2';
  datumInstance: number;
}>;

type Instance3Configuration = DatumInstanceConfiguration<{
  instanceIdentifier: 'instance-1/instance-3';
  datumInstance: number;
}>;

const builderConfigurationCollection = [
  buildBuilderConfiguration<{
    InputDatumInstanceConfigurationCollection: [RootDatumInstanceConfiguration];
    OutputDatumInstanceConfigurationCollection: [Instance1Configuration];
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
    InputDatumInstanceConfigurationCollection: [Instance1Configuration];
    OutputDatumInstanceConfigurationCollection: [
      Instance2Configuration,
      Instance3Configuration,
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
