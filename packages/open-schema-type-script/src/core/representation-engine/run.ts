import fs from 'fs';
import posix from 'path';
import { UnknownBuilderConfigurationTuple } from '../builderConfiguration';
import { UnknownCollectionLocator } from '../collectionLocator';
import { UnknownDatumInstanceConfiguration } from '../datumInstanceConfiguration';
import {
  getDatumInstanceConfiguration,
  ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION,
} from '../../type-script/datumInstanceTypeScriptConfiguration';
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

type DatumConfigurationsByIdentifier = Map<
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
}) => {
  // eslint-disable-next-line no-console
  console.log('Starting Representation');

  fs.rmSync(DEBUG_DIR_PATH, { recursive: true, force: true });
  fs.mkdirSync(LOOP_PATH, { recursive: true });
  fs.mkdirSync(CACHE_PATH, { recursive: true });

  const datumInstanceConfigurationEmitter =
    new DatumInstanceConfigurationEmitter(onDatumInstanceConfiguration);

  let loopCount = 0;
  let currentDatumInstanceLocatorCollection: CustomSet<UnknownCollectionLocator> =
    new CustomSet();
  let nextDatumInstanceLocatorCollection: CustomSet<UnknownCollectionLocator> =
    new CustomSet([
      ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION.datumInstanceIdentifier,
    ]);

  const configurationMap: DatumConfigurationsByIdentifier = new Map([
    [
      ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION.datumInstanceIdentifier,
      getDatumInstanceConfiguration(
        ROOT_DATUM_INSTANCE_TYPE_SCRIPT_CONFIGURATION,
      ),
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

        const readyConfigurations = mutableBuilderConfigurationCollection
          .asArray()
          .filter((builderConfiguration) => {
            return builderConfiguration.isReady();
          });

        return readyConfigurations;
      });

    const outputDatumConfigurationTupleCollection = configurationsToBuild.map(
      ({ builderConfiguration }) => {
        const inputCollection = builderConfiguration.inputPredicateCollection
          .map((normalizedPredicateCollection) => ({
            normalizedPredicateCollection,
            inputConfiguration: configurationMap.get(
              normalizedPredicateCollection.instanceIdentifier,
            ) as UnknownDatumInstanceConfiguration,
          }))
          .map(({ inputConfiguration }) => {
            return inputConfiguration;
          });

        return builderConfiguration.buildCollection(...inputCollection);
      },
    );

    const outputDatumConfigurationTuple =
      outputDatumConfigurationTupleCollection.flat();

    outputDatumConfigurationTuple.forEach(
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      (datumInstanceConfiguration) => {
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

        nextDatumInstanceLocatorCollection.add(
          datumInstanceConfiguration.instanceIdentifier,
        );

        configurationMap.set(
          datumInstanceConfiguration.instanceIdentifier,
          datumInstanceConfiguration,
        );

        datumInstanceConfigurationEmitter.emitDatum(datumInstanceConfiguration);

        const builders =
          mutableBuilderConfigurationCollectionsByInputLocator.get(
            datumInstanceConfiguration.instanceIdentifier,
          );

        builders.forEach((builder) => {
          builder.updateInputStatus(datumInstanceConfiguration);
        });
      },
    );

    fs.writeFileSync(
      posix.join(LOOP_PATH, `loop-${loopCount}.txt`),
      [
        `Loop: ${loopCount}`,
        '',
        'Current Collection:',
        ...currentDatumInstanceLocatorCollection
          .asArray()
          .map((x) => (x === '' ? '""' : x))
          .map((x) => `    ${x}`),
        '',
        'Output Data:',
        ...outputDatumConfigurationTuple.flatMap((outputDatumConfiguration) => {
          return [
            `    ${outputDatumConfiguration.instanceIdentifier}`,
            '    ----------------------------------------------------------------------------------------------------',
          ];
        }),
        '',
        'Next Collection:',
        ...nextDatumInstanceLocatorCollection.asArray().map((x) => `    ${x}`),
      ].join('\n'),
    );

    loopCount += 1;
  }

  const numberOfDataBuilt =
    [...configurationMap].reduce((sum) => sum + 1, 0) - 1;

  // eslint-disable-next-line no-console
  console.log(`Built ${numberOfDataBuilt} instances`);
};
