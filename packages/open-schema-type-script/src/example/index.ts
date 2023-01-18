import { buildBuilderConfiguration } from '../buildBuilderConfiguration';
import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import { ROOT_DATUM_INSTANCE_LOCATOR } from '../collectionLocator';
import { RootDatumInstanceConfiguration } from '../datumInstanceConfiguration';
import {
  DatumInstanceConfigurationFromTypeScriptConfiguration,
  DatumInstanceTypeScriptConfiguration,
} from '../datumInstanceTypeScriptConfiguration';
import { run } from '../representation-engine/run';
import { TypeSemanticsIdentifier } from './typeSemanticsIdentifier';

type Instance1TypeScriptConfiguration = DatumInstanceTypeScriptConfiguration<{
  datumInstanceIdentifier: 'instance-1';
  datumInstance: string;
  typeSemanticsIdentifier: 'TypeScript:string';
}>;

type Instance1Configuration =
  DatumInstanceConfigurationFromTypeScriptConfiguration<Instance1TypeScriptConfiguration>;

type Instance2TypeScriptConfiguration = DatumInstanceTypeScriptConfiguration<{
  datumInstanceIdentifier: 'instance-1/instance-2';
  datumInstance: number;
  typeSemanticsIdentifier: 'TypeScript:number';
}>;

type Instance3TypeScriptConfiguration = DatumInstanceTypeScriptConfiguration<{
  datumInstanceIdentifier: 'instance-1/instance-3';
  datumInstance: number;
  typeSemanticsIdentifier: 'TypeScript:number';
}>;

type Instance2Configuration =
  DatumInstanceConfigurationFromTypeScriptConfiguration<Instance2TypeScriptConfiguration>;

type Instance3Configuration =
  DatumInstanceConfigurationFromTypeScriptConfiguration<Instance3TypeScriptConfiguration>;

const builderConfigurationCollection = [
  buildBuilderConfiguration<{
    InputDatumInstanceConfigurationCollection: [RootDatumInstanceConfiguration];
    OutputDatumInstanceConfigurationCollection: [Instance1Configuration];
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
