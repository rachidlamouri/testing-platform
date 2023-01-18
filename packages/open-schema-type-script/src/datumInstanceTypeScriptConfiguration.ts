import { UnknownCollectionLocator } from './collectionLocator';
import { UnknownDatumInstance } from './datumInstance';
import { DatumInstanceConfiguration } from './datumInstanceConfiguration';
import { ConstrainObject } from './utilityTypes/constrainObject';

export type UnknownDatumInstanceTypeScriptConfiguration = {
  datumInstanceIdentifier: UnknownCollectionLocator;
  typeSemanticsIdentifier: UnknownCollectionLocator;
  datumInstance: UnknownDatumInstance;
};

export type DatumInstanceTypeScriptConfiguration<
  TUnknownDatumInstanceTypeScriptConfiguration extends UnknownDatumInstanceTypeScriptConfiguration,
> = ConstrainObject<
  { ConstraintObject: UnknownDatumInstanceTypeScriptConfiguration },
  { ConstrainedObject: TUnknownDatumInstanceTypeScriptConfiguration }
>;

export type DatumInstanceConfigurationFromTypeScriptConfiguration<
  T extends UnknownDatumInstanceTypeScriptConfiguration,
> = DatumInstanceConfiguration<{
  instanceIdentifier: T['datumInstanceIdentifier'];
  datumInstance: T['datumInstance'];
  predicateIdentifiers: [T['typeSemanticsIdentifier']];
}>;
