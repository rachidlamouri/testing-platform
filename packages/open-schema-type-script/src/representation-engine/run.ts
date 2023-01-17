import fs from 'fs';
import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import {
  ROOT_DATUM_INSTANCE_LOCATOR,
  UnknownCollectionLocator,
} from '../collectionLocator';
import { ROOT_DATUM_INSTANCE, UnknownDatumInstance } from '../datumInstance';
import { UnknownDatumInstanceConfiguration } from '../datumInstanceConfiguration';

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
    new Set([ROOT_DATUM_INSTANCE_LOCATOR]);

  const instanceMap: DatumInstancesByIdentifier = new Map([
    [ROOT_DATUM_INSTANCE_LOCATOR, ROOT_DATUM_INSTANCE],
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
