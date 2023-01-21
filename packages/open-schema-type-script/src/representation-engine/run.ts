import fs from 'fs';
import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import { UnknownCollectionLocator } from '../collectionLocator';
import { UnknownDatumInstance } from '../datumInstance';
import { UnknownDatumInstanceConfiguration } from '../datumInstanceConfiguration';
import { ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION } from '../datumInstanceTypeScriptConfiguration';
import { CustomSet } from '../utilities/customSet';
import { MutableBuilderConfiguration } from './mutableBuilderConfiguration';
import { MutableBuilderConfigurationCollectionsByInputLocator } from './mutableBuilderConfigurationCollectionsByInputLocator';

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
  let currentDatumInstanceLocatorCollection: CustomSet<UnknownCollectionLocator> =
    new CustomSet();
  let nextDatumInstanceLocatorCollection: CustomSet<UnknownCollectionLocator> =
    new CustomSet([
      ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION.datumInstanceIdentifier,
    ]);

  const instanceMap: DatumInstancesByIdentifier = new Map([
    [
      ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION.datumInstanceIdentifier,
      ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION.datumInstance,
    ],
  ]);

  const mutableBuilderConfigurationCollectionsByInputLocator =
    new MutableBuilderConfigurationCollectionsByInputLocator();

  const mutableBuilderConfigurationColection =
    builderConfigurationCollection.map((builderConfiguration) => {
      return new MutableBuilderConfiguration(builderConfiguration);
    });

  mutableBuilderConfigurationCollectionsByInputLocator.indexMutableBuilderConfigurationCollection(
    mutableBuilderConfigurationColection,
  );

  while (nextDatumInstanceLocatorCollection.size > 0) {
    currentDatumInstanceLocatorCollection = nextDatumInstanceLocatorCollection;
    nextDatumInstanceLocatorCollection = new CustomSet();

    const configurationsToBuild = currentDatumInstanceLocatorCollection
      .asArray()
      .flatMap((currentLocator) => {
        const mutableBuilderConfigurationCollection =
          mutableBuilderConfigurationCollectionsByInputLocator.get(
            currentLocator,
          );

        mutableBuilderConfigurationCollection.forEach(
          (mutableBuilderConfiguration) => {
            // eslint-disable-next-line no-param-reassign
            mutableBuilderConfiguration.builtInputCount += 1;
          },
        );

        const readyConfigurations = mutableBuilderConfigurationCollection
          .asArray()
          .filter((mutableBuilderConfiguration) => {
            return (
              mutableBuilderConfiguration.builtInputCount ===
              mutableBuilderConfiguration.builderConfiguration
                .inputCollectionLocatorCollection.length
            );
          });

        return readyConfigurations;
      });

    const outputDatumConfigurationTupleCollection = configurationsToBuild.map(
      ({ builderConfiguration }) => {
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
      currentDatumInstanceLocatorCollection:
        currentDatumInstanceLocatorCollection.asArray(),
      // mutableState: mutableBuilderConfigurationCollectionsByInputLocator
      //   .asEntries()
      //   .reduce((acc: Record<string, unknown>, [k, v]) => {
      //     acc[k] = v.asArray().map((d) => ({
      //       inputLocators:
      //         d.builderConfiguration.inputCollectionLocatorCollection,
      //       builtInputCount: d.builtInputCount,
      //     }));

      //     return acc;
      //   }, {}),
      outputDatumConfigurationTuple,
      nextDatumInstanceLocatorCollection:
        nextDatumInstanceLocatorCollection.asArray(),
    });

    loopCount += 1;
  }

  const numberOfDataBuilt = [...instanceMap].reduce((sum) => sum + 1, 0) - 1;

  // eslint-disable-next-line no-console
  console.log(`Built ${numberOfDataBuilt} instances`);

  fs.writeFileSync('debug', JSON.stringify(debug, null, 2));
};
