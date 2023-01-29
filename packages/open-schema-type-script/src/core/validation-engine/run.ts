import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import { UnknownDatumInstanceConfiguration } from '../datumInstanceConfiguration';
import {
  UnknownDatumSemanticsConfiguration,
  UnknownDatumSemanticsConfigurationTuple,
} from '../datumSemanticsConfiguration';
import { representationEngine } from '../representation-engine';
import { DatumHandler } from '../../utilities/datumEmitter';

export type ValidationEngineInput = {
  builderConfigurationCollection: UnknownBuilderConfigurationTuple;
  semanticsConfigurationCollection: UnknownDatumSemanticsConfigurationTuple;
};

export const run = ({
  builderConfigurationCollection,
  semanticsConfigurationCollection,
}: ValidationEngineInput): void => {
  // eslint-disable-next-line no-console
  console.log('Starting Validation');

  const semanticsByDatumLocator = new Map<
    string,
    Set<UnknownDatumSemanticsConfiguration>
  >();

  semanticsConfigurationCollection.forEach((semanticsConfiguration) => {
    const semanticsSet =
      semanticsByDatumLocator.get(semanticsConfiguration.collectionLocator) ??
      new Set();

    semanticsSet.add(semanticsConfiguration);
    semanticsByDatumLocator.set(
      semanticsConfiguration.collectionLocator,
      semanticsSet,
    );
  });

  const onDatumInstanceConfiguration: DatumHandler<
    UnknownDatumInstanceConfiguration
  > = (datumInstanceConfiguration) => {
    const locators = [
      datumInstanceConfiguration.instanceIdentifier,
      ...datumInstanceConfiguration.aliases,
    ];

    const semanticsSet = new Set<UnknownDatumSemanticsConfiguration>();
    locators.forEach((locator) => {
      const nextSet = semanticsByDatumLocator.get(locator) ?? new Set();

      [...nextSet].forEach((nextSemantics) => {
        semanticsSet.add(nextSemantics);
      });
    });

    [...semanticsSet].forEach((semanticsConfiguraton) => {
      const result = semanticsConfiguraton.processDatum(
        datumInstanceConfiguration.datumInstance,
      );

      const { instanceIdentifier } = datumInstanceConfiguration;
      const { semanticsIdentifier } = semanticsConfiguraton;

      if (result) {
        // eslint-disable-next-line no-console
        console.log(
          `    Datum instance "${instanceIdentifier}" matches semantics "${semanticsIdentifier}"!`,
        );
      } else {
        // eslint-disable-next-line no-console
        console.log(
          `    Datum instance "${instanceIdentifier}" does not match semantics "${semanticsIdentifier}"!`,
        );
      }
    });
  };

  representationEngine.run({
    builderConfigurationCollection,
    onDatumInstanceConfiguration,
    onFinish: () => {
      // eslint-disable-next-line no-console
      console.log('All Done!');
    },
  });
};
