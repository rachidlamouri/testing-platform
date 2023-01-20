import fs from 'fs';
import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import { UnknownCollectionLocator } from '../collectionLocator';
import { UnknownDatumInstance } from '../datumInstance';
import { UnknownDatumInstanceConfiguration } from '../datumInstanceConfiguration';
import { ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION } from '../datumInstanceTypeScriptConfiguration';

export type RepresentationEngineInput = {
  builderConfigurationCollection: UnknownBuilderConfigurationTuple;
};

export type RepresentationEngine = (input: RepresentationEngineInput) => void;

type DatumInstancesByIdentifier = Map<
  UnknownCollectionLocator,
  UnknownDatumInstance
>;

export const run: RepresentationEngine = ({
  builderConfigurationCollection,
}) => {
  const debug: unknown[] = [];

  let loopCount = 0;
  let currentDatumInstanceLocatorCollection: Set<UnknownCollectionLocator> =
    new Set();
  let nextDatumInstanceLocatorCollection: Set<UnknownCollectionLocator> =
    new Set([
      ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION.datumInstanceIdentifier,
    ]);

  const instanceMap: DatumInstancesByIdentifier = new Map([
    [
      ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION.datumInstanceIdentifier,
      ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION.datumInstance,
    ],
  ]);

  while (nextDatumInstanceLocatorCollection.size > 0) {
    currentDatumInstanceLocatorCollection = nextDatumInstanceLocatorCollection;
    nextDatumInstanceLocatorCollection = new Set();

    const configurationsToBuild = builderConfigurationCollection.filter(
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      (builderConfiguration) => {
        return builderConfiguration.inputCollectionLocatorCollection.every(
          (inputLocator) => {
            return currentDatumInstanceLocatorCollection.has(inputLocator);
          },
        );
      },
    );

    const outputDatumConfigurationTupleCollection = configurationsToBuild.map(
      (builderConfiguration) => {
        const inputCollection =
          builderConfiguration.inputCollectionLocatorCollection.map(
            (inputLocator): UnknownDatumInstanceConfiguration => {
              return {
                instanceIdentifier: inputLocator,
                datumInstance: instanceMap.get(inputLocator),
                // TODO: figure out what to do with these predicate identifiers
                predicateIdentifiers: [],
              };
            },
          );

        return builderConfiguration.buildCollection(...inputCollection);
      },
    );

    const outputDatumConfigurationTuple =
      outputDatumConfigurationTupleCollection
        .flat()
        .map(
          (outputDatumConfiguration) =>
            [
              outputDatumConfiguration.instanceIdentifier,
              outputDatumConfiguration.datumInstance,
            ] as const,
        );

    outputDatumConfigurationTuple.forEach(
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      ([instanceIdentifier, datumInstance]) => {
        nextDatumInstanceLocatorCollection.add(instanceIdentifier);
        instanceMap.set(instanceIdentifier, datumInstance);
      },
    );

    debug.push({
      loopCount,
      currentDatumInstanceLocatorCollection: [
        ...currentDatumInstanceLocatorCollection,
      ],
      outputDatumConfigurationTuple,
      nextDatumInstanceLocatorCollection: [
        ...nextDatumInstanceLocatorCollection,
      ],
    });

    loopCount += 1;
  }

  const numberOfDataBuilt = [...instanceMap].reduce((sum) => sum + 1, 0) - 1;

  // eslint-disable-next-line no-console
  console.log(`Built ${numberOfDataBuilt} instances`);

  fs.writeFileSync('debug', JSON.stringify(debug, null, 2));
};