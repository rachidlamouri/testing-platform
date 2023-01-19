import { buildBuilderConfiguration } from '../buildBuilderConfiguration';
import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import { ROOT_DATUM_INSTANCE_LOCATOR } from '../collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  RootDatumInstanceTypeScriptConfiguration,
} from '../datumInstanceTypeScriptConfiguration';
import { run } from '../representation-engine/run';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';

type Instance1TypeScriptConfiguration = DatumInstanceTypeScriptConfiguration<{
  datumInstanceIdentifier: 'instance-1';
  datumInstance: string;
  typeSemanticsIdentifier: TypeScriptSemanticsIdentifier.string;
}>;

type Instance2TypeScriptConfiguration = DatumInstanceTypeScriptConfiguration<{
  datumInstanceIdentifier: 'instance-1/instance-2';
  datumInstance: number;
  typeSemanticsIdentifier: TypeScriptSemanticsIdentifier.number;
}>;

type Instance3TypeScriptConfiguration = DatumInstanceTypeScriptConfiguration<{
  datumInstanceIdentifier: 'instance-1/instance-3';
  datumInstance: number;
  typeSemanticsIdentifier: TypeScriptSemanticsIdentifier.number;
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
        predicateIdentifiers: [TypeScriptSemanticsIdentifier.string],
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
        predicateIdentifiers: [TypeScriptSemanticsIdentifier.number],
      },
      {
        instanceIdentifier: 'instance-1/instance-3',
        datumInstance: 3,
        predicateIdentifiers: [TypeScriptSemanticsIdentifier.number],
      },
    ],
    inputCollectionLocatorCollection: ['instance-1'],
  }),
] as const satisfies UnknownBuilderConfigurationTuple;

run({
  builderConfigurationCollection,
});
