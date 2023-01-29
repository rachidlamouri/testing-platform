import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import { UnknownDatumInstanceConfiguration } from '../datumInstanceConfiguration';
import {
  UnknownDatumSemanticsConfiguration,
  UnknownDatumSemanticsConfigurationTuple,
} from '../datumSemanticsConfiguration';
import { representationEngine } from '../representation-engine';
import { DatumHandler } from '../../utilities/datumEmitter';
import { IdentifiableDatumSemanticsProcessorResult } from '../identifiableDatumSemanticsProcessorResult';
import { UnknownCollectionLocator } from '../collectionLocator';
import { Merge } from '../../utilities/types/merge/merge';

export type ValidationEngineInput = {
  builderConfigurationCollection: UnknownBuilderConfigurationTuple;
  semanticsConfigurationCollection: UnknownDatumSemanticsConfigurationTuple;
};

export const run = ({
  builderConfigurationCollection,
  semanticsConfigurationCollection,
}: ValidationEngineInput): void => {
  const validationCache = new Map<
    string,
    Merge<
      { instanceIdentifier: UnknownCollectionLocator },
      IdentifiableDatumSemanticsProcessorResult<{
        semanticsIdentifier: UnknownCollectionLocator;
        value: boolean;
      }>
    >
  >();

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

      validationCache.set(instanceIdentifier, {
        instanceIdentifier,
        semanticsIdentifier,
        value: result,
      });
    });
  };

  representationEngine.run({
    builderConfigurationCollection,
    onDatumInstanceConfiguration,
    onFinish: () => {
      /* eslint-disable no-console */
      console.log();
      console.log();
      [...validationCache.values()]
        .filter((x) => {
          return !x.value;
        })
        .forEach((x, index) => {
          console.log(`Failure ${index}`);
          console.log(`    D Id: ${x.instanceIdentifier}`);
          console.log(`    S Id: ${x.semanticsIdentifier}`);
          console.log();
          /* eslint-enable no-console */
        });

      // const isValid = [...validationCache.values()].every((x) => x.value);
      // const exitCode = isValid ? 0 : 1;
      // process.exit(exitCode);
    },
  });
};
