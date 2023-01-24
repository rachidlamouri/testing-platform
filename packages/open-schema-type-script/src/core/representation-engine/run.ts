import fs from 'fs';
import posix from 'path';
import {
  UnknownBuilderConfiguration,
  UnknownBuilderConfigurationTuple,
} from '../builderConfiguration';
import { UnknownCollectionLocator } from '../collectionLocator';
import { UnknownDatumInstance } from '../datumInstance';
import { UnknownDatumInstanceConfiguration } from '../datumInstanceConfiguration';
import { CustomSet } from '../../utilities/customSet';
import { DatumHandler } from '../../utilities/datumEmitter';
import { DatumInstanceConfigurationEmitter } from './datumInstanceConfigurationEmitter';
import { MutableBuilderConfiguration } from './mutableBuilderConfiguration';
import { MutableBuilderConfigurationCollectionsByInputLocator } from './mutableBuilderConfigurationCollectionsByInputLocator';

export type RepresentationEngineInput = {
  builderConfigurationCollection: UnknownBuilderConfigurationTuple;
  onDatumInstanceConfiguration: DatumHandler<UnknownDatumInstanceConfiguration>;
};

export type RepresentationEngine = (input: RepresentationEngineInput) => void;

type DatumInstancesByIdentifier = Map<
  UnknownCollectionLocator,
  UnknownDatumInstance
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
      builderConfiguration.inputCollectionLocatorCollection.length === 0,
  );

  const derivedBuilderConfigurations = builderConfigurationCollection.filter(
    (builderConfiguration) =>
      builderConfiguration.inputCollectionLocatorCollection.length > 0,
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

  const createdInstancesMap: DatumInstancesByIdentifier = new Map();

  let loopCount = 0;
  let currentBuildersToRun: CustomSet<UnknownBuilderConfiguration> =
    new CustomSet();
  let nextBuildersToRun: CustomSet<UnknownBuilderConfiguration> = new CustomSet(
    initialBuilderConfigurations,
  );

  while (nextBuildersToRun.size > 0) {
    currentBuildersToRun = nextBuildersToRun;
    nextBuildersToRun = new CustomSet();

    const outputDatumConfigurationTupleCollection = currentBuildersToRun
      .asArray()
      .map((builderConfiguration) => {
        const inputCollection =
          builderConfiguration.inputCollectionLocatorCollection.map(
            (inputLocator): UnknownDatumInstanceConfiguration => {
              return {
                instanceIdentifier: inputLocator,
                datumInstance: createdInstancesMap.get(inputLocator),
                // TODO: figure out what to do with these predicate identifiers
                predicateIdentifiers: [],
              };
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
        createdInstancesMap.set(
          datumInstanceConfiguration.instanceIdentifier,
          datumInstanceConfiguration.datumInstance,
        );

        // emit
        datumInstanceConfigurationEmitter.emitDatum(datumInstanceConfiguration);
      },
    );

    const datumAndBuilderPairs = outputDatumConfigurationTuple.flatMap(
      (datumInstanceConfiguration) => {
        const mutableBuilderConfigurationCollection =
          mutableBuilderConfigurationCollectionsByInputLocator.get(
            datumInstanceConfiguration.instanceIdentifier,
          );

        return mutableBuilderConfigurationCollection
          .asArray()
          .map((mutableBuilderConfiguration) => ({
            datumInstanceConfiguration,
            mutableBuilderConfiguration,
          }));
      },
    );

    const uniqueMutableBuilderConfigurations =
      new CustomSet<MutableBuilderConfiguration>();
    datumAndBuilderPairs.forEach(
      ({ datumInstanceConfiguration, mutableBuilderConfiguration }) => {
        // eslint-disable-next-line no-param-reassign
        mutableBuilderConfiguration.updateInputStatus(
          datumInstanceConfiguration,
        );

        uniqueMutableBuilderConfigurations.add(mutableBuilderConfiguration);
      },
    );

    const readyMutableBuilderConfigurations = uniqueMutableBuilderConfigurations
      .asArray()
      .filter((mutableBuilderConfiguration) => {
        return mutableBuilderConfiguration.isReady();
      });

    const readyBuilderConfigurations =
      new CustomSet<UnknownBuilderConfiguration>();
    readyMutableBuilderConfigurations.forEach((mutableBuilderConfiguration) => {
      readyBuilderConfigurations.add(
        mutableBuilderConfiguration.builderConfiguration,
      );
    });

    nextBuildersToRun = readyBuilderConfigurations;

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
  console.log(`Built ${createdInstancesMap.size} instances`);
};
