import { buildBuilderConfiguration } from '../buildBuilderConfiguration';
import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import { ROOT_DATUM_INSTANCE_LOCATOR } from '../collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  RootDatumInstanceTypeScriptConfiguration,
} from '../datumInstanceTypeScriptConfiguration';
import { run } from '../representation-engine/run';
import { TypeSemanticsIdentifier } from './typeSemanticsIdentifier';

type Instance1TypeScriptConfiguration = DatumInstanceTypeScriptConfiguration<{
  datumInstanceIdentifier: 'instance-1';
  datumInstance: string;
  typeSemanticsIdentifier: TypeSemanticsIdentifier.string;
}>;

type Instance2TypeScriptConfiguration = DatumInstanceTypeScriptConfiguration<{
  datumInstanceIdentifier: 'instance-1/instance-2';
  datumInstance: number;
  typeSemanticsIdentifier: TypeSemanticsIdentifier.number;
}>;

type Instance3TypeScriptConfiguration = DatumInstanceTypeScriptConfiguration<{
  datumInstanceIdentifier: 'instance-1/instance-3';
  datumInstance: number;
  typeSemanticsIdentifier: TypeSemanticsIdentifier.number;
}>;

const builderConfigurationCollection = [
  buildBuilderConfiguration<{
    InputCollection: [RootDatumInstanceTypeScriptConfiguration];
    OutputCollection: [Instance1TypeScriptConfiguration];
  }>({
    buildCollection: () => [
      {
        instanceIdentifier: 'instance-1',
        datumInstance: 'hello',
        predicateIdentifiers: [TypeSemanticsIdentifier.string],
      },
    ],
    inputCollectionLocatorCollection: [ROOT_DATUM_INSTANCE_LOCATOR],
  }),
  buildBuilderConfiguration<{
    InputCollection: [Instance1TypeScriptConfiguration];
    OutputCollection: [
      Instance2TypeScriptConfiguration,
      Instance3TypeScriptConfiguration,
    ];
  }>({
    buildCollection: () => [
      {
        instanceIdentifier: 'instance-1/instance-2',
        datumInstance: 2,
        predicateIdentifiers: [TypeSemanticsIdentifier.number],
      },
      {
        instanceIdentifier: 'instance-1/instance-3',
        datumInstance: 3,
        predicateIdentifiers: [TypeSemanticsIdentifier.number],
      },
    ],
    inputCollectionLocatorCollection: ['instance-1'],
  }),
] as const satisfies UnknownBuilderConfigurationTuple;

run({
  builderConfigurationCollection,
});
