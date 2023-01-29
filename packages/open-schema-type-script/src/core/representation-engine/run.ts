import fs from 'fs';
import posix from 'path';
import {
  UnknownBuilderConfiguration,
  UnknownBuilderConfigurationTuple,
} from '../builderConfiguration';
import { UnknownCollectionLocator } from '../collectionLocator';
import { UnknownDatumInstanceConfiguration } from '../datumInstanceConfiguration';
import { CustomSet } from '../../utilities/customSet';
import { DatumHandler } from '../../utilities/datumEmitter';
import { DatumInstanceConfigurationEmitter } from './datumInstanceConfigurationEmitter';
import { MutableBuilderConfiguration } from './mutableBuilderConfiguration';
import { MutableBuilderConfigurationCollectionsByInputLocator } from './mutableBuilderConfigurationCollectionsByInputLocator';

export type RepresentationEngineInput = {
  builderConfigurationCollection: UnknownBuilderConfigurationTuple;
  onDatumInstanceConfiguration: DatumHandler<UnknownDatumInstanceConfiguration>;
  onFinish: () => void;
};

export type RepresentationEngine = (input: RepresentationEngineInput) => void;

type DatumInstanceConfigurationsByIdentifier = Map<
  UnknownCollectionLocator,
  UnknownDatumInstanceConfiguration
>;

const DEBUG_DIR_PATH = './debug/' as const;
const LOOP_PATH = posix.join(DEBUG_DIR_PATH, 'loop');
const CACHE_PATH = posix.join(DEBUG_DIR_PATH, 'cache');

const getCacheFilePath = (
  datumInstanceConfiguration: UnknownDatumInstanceConfiguration,
): string => {
  const typeName =
    datumInstanceConfiguration.predicateIdentifiers[0] ?? 'MISSING_TYPE';

  const fileName = datumInstanceConfiguration.instanceIdentifier.replaceAll(
    '/',
    '__',
  );

  return `./${posix.join(CACHE_PATH, typeName, `${fileName}.json`)}`;
};

export const run: RepresentationEngine = ({
  builderConfigurationCollection,
  onDatumInstanceConfiguration,
  onFinish,
}) => {
  // eslint-disable-next-line no-console
  console.log('Starting Representation');

  fs.rmSync(DEBUG_DIR_PATH, { recursive: true, force: true });
  fs.mkdirSync(LOOP_PATH, { recursive: true });
  fs.mkdirSync(CACHE_PATH, { recursive: true });

  const datumInstanceConfigurationEmitter =
    new DatumInstanceConfigurationEmitter(onDatumInstanceConfiguration);

  const initialBuilderConfigurations = builderConfigurationCollection.filter(
    (builderConfiguration) =>
      builderConfiguration.inputPredicateLocatorTuple.length === 0,
  );

  const derivedBuilderConfigurations = builderConfigurationCollection.filter(
    (builderConfiguration) =>
      builderConfiguration.inputPredicateLocatorTuple.length > 0,
  );

  const derivedMutableBuilderConfigurationCollection =
    derivedBuilderConfigurations.map((builderConfiguration) => {
      return new MutableBuilderConfiguration(builderConfiguration);
    });

  const mutableBuilderConfigurationCollectionsByInputLocator =
    new MutableBuilderConfigurationCollectionsByInputLocator();

  mutableBuilderConfigurationCollectionsByInputLocator.indexMutableBuilderConfigurationCollection(
    derivedMutableBuilderConfigurationCollection,
  );

  const createdDatumInstanceConfigurationMap: DatumInstanceConfigurationsByIdentifier =
    new Map();

  // TODO: naming stuff is hard
  // TODO: this data structure kind of obfuscates the relationship between a retriggerable builder and its input; can we fix that?
  type RuntimeElement = {
    builderConfiguration: UnknownBuilderConfiguration;
    inputInstanceIdentifier: UnknownCollectionLocator | null;
  };

  let loopCount = 0;
  let currentBuildersToRun: CustomSet<RuntimeElement> = new CustomSet();
  let nextBuildersToRun: CustomSet<RuntimeElement> = new CustomSet(
    initialBuilderConfigurations.map((builderConfiguration) => ({
      builderConfiguration,
      inputInstanceIdentifier: null,
    })),
  );

  while (nextBuildersToRun.size > 0) {
    currentBuildersToRun = nextBuildersToRun;
    nextBuildersToRun = new CustomSet();

    const outputDatumConfigurationTupleCollection = currentBuildersToRun
      .asArray()
      .map(({ builderConfiguration, inputInstanceIdentifier }) => {
        const inputIdentifierTuple =
          inputInstanceIdentifier !== null
            ? [inputInstanceIdentifier]
            : builderConfiguration.inputPredicateLocatorTuple.map(
                (x) => x.instanceIdentifier,
              );

        const inputCollection = inputIdentifierTuple.map(
          (inputIdentifier): UnknownDatumInstanceConfiguration => {
            return createdDatumInstanceConfigurationMap.get(
              inputIdentifier,
            ) as UnknownDatumInstanceConfiguration;
          },
        );

        return builderConfiguration.buildCollection(...inputCollection);
      });

    const outputDatumConfigurationTuple =
      outputDatumConfigurationTupleCollection.flat();

    outputDatumConfigurationTuple.forEach(
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      (datumInstanceConfiguration) => {
        // debug
        // eslint-disable-next-line no-console
        console.log(
          `  Built: ${datumInstanceConfiguration.instanceIdentifier}`,
        );
        const filePath = getCacheFilePath(datumInstanceConfiguration);
        fs.mkdirSync(posix.dirname(filePath), { recursive: true });
        fs.writeFileSync(
          filePath,
          JSON.stringify(datumInstanceConfiguration, null, 2),
        );

        // cache
        createdDatumInstanceConfigurationMap.set(
          datumInstanceConfiguration.instanceIdentifier,
          datumInstanceConfiguration,
        );

        // emit
        datumInstanceConfigurationEmitter.emitDatum(datumInstanceConfiguration);
      },
    );

    const datumAndBuilderPairs = outputDatumConfigurationTuple.flatMap(
      (datumInstanceConfiguration) => {
        // TODO: naming things is hard
        const mutableBuilderConfigurationCollectionA = [
          datumInstanceConfiguration.instanceIdentifier,
          ...datumInstanceConfiguration.aliases,
        ].flatMap((locator) => {
          const mutableBuilderConfigurationCollectionB =
            mutableBuilderConfigurationCollectionsByInputLocator
              .get(locator)
              .asArray();

          return mutableBuilderConfigurationCollectionB;
        });

        return mutableBuilderConfigurationCollectionA.map(
          (mutableBuilderConfiguration) => ({
            datumInstanceConfiguration,
            mutableBuilderConfiguration,
          }),
        );
      },
    );

    const retriggerable = datumAndBuilderPairs.filter(
      ({ mutableBuilderConfiguration }) =>
        mutableBuilderConfiguration.isRetriggerable,
    );

    const nonRetriggerable = datumAndBuilderPairs.filter(
      ({ mutableBuilderConfiguration }) =>
        !mutableBuilderConfiguration.isRetriggerable,
    );

    nextBuildersToRun = new CustomSet<RuntimeElement>();
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    retriggerable.forEach(
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      ({ mutableBuilderConfiguration, datumInstanceConfiguration }) => {
        if (
          mutableBuilderConfiguration.triggeredIdentifierSet.has(
            datumInstanceConfiguration.instanceIdentifier,
          )
        ) {
          // A retriggerable builder must only trigger on a datum instance once
          return;
        }

        // TODO: encapsulate this in the mutable builder configuration
        mutableBuilderConfiguration.triggeredIdentifierSet.add(
          datumInstanceConfiguration.instanceIdentifier,
        );

        nextBuildersToRun.add({
          builderConfiguration:
            mutableBuilderConfiguration.builderConfiguration,
          inputInstanceIdentifier:
            datumInstanceConfiguration.instanceIdentifier,
        });
      },
    );

    nonRetriggerable.forEach((datumAndBuilderPair) => {
      datumAndBuilderPair.mutableBuilderConfiguration.updateInputStatus(
        datumAndBuilderPair.datumInstanceConfiguration,
      );
    });

    const readyNonRetriggerable = nonRetriggerable.filter(
      (datumAndBuilderPair) =>
        datumAndBuilderPair.mutableBuilderConfiguration.isReady(),
    );

    const uniqueReadyNonRetriggerableBuilders =
      new CustomSet<UnknownBuilderConfiguration>(
        readyNonRetriggerable.map(
          (x) => x.mutableBuilderConfiguration.builderConfiguration,
        ),
      );

    uniqueReadyNonRetriggerableBuilders
      .asArray()
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      .forEach((builderConfiguration) => {
        nextBuildersToRun.add({
          builderConfiguration,
          inputInstanceIdentifier: null,
        });
      });

    fs.writeFileSync(
      posix.join(LOOP_PATH, `loop-${loopCount}.txt`),
      [
        `Loop: ${loopCount}`,
        '',
        'Output Data:',
        ...outputDatumConfigurationTuple.flatMap((outputDatumConfiguration) => {
          return [
            `    ${outputDatumConfiguration.instanceIdentifier}`,
            '    ----------------------------------------------------------------------------------------------------',
          ];
        }),
        '',
      ].join('\n'),
    );

    loopCount += 1;
  }

  // eslint-disable-next-line no-console
  console.log(`Built ${createdDatumInstanceConfigurationMap.size} instances`);

  onFinish();
};
