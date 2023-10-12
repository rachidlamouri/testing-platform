import { StreamTypeName } from '../../core/types/lanbe/lanbe';
import { RuntimeStatistics } from '../../core/engine/digikikify';

/**
 * Converts a RuntimeStatistics object into a comprehensive visual ascii
 * document
 */
export const serializeRuntimeStatistics = (
  statistics: RuntimeStatistics,
): string => {
  const TRIGGER_CHARACTER = 'X';
  const IDLE_CHARACTER = '-';

  const lineList: string[] = [];

  lineList.push('Collections:');
  lineList.push('');

  statistics.collectionList
    .map((configuration) => {
      let collectionIndex = configuration.collectionTickSeries.findIndex(
        (value) => value === 1,
      );
      collectionIndex = collectionIndex === -1 ? Infinity : collectionIndex;

      let collectionItemIndex =
        configuration.collectionItemTickSeries.findIndex(
          (value) => value === 1,
        );
      collectionItemIndex =
        collectionItemIndex === -1 ? Infinity : collectionItemIndex;

      const sortValue = Math.min(collectionIndex, collectionItemIndex);

      return {
        configuration,
        sortValue,
      };
    })
    .sort((a, b) => a.sortValue - b.sortValue)
    .forEach(({ configuration: c }) => {
      const serializedCollectionItemSeries = c.collectionItemTickSeries.map(
        (value) => (value === 1 ? TRIGGER_CHARACTER : IDLE_CHARACTER),
      );
      const serializedCollectionSeries = c.collectionTickSeries.map((value) =>
        value === 1 ? TRIGGER_CHARACTER : IDLE_CHARACTER,
      );

      lineList.push(`    ${c.collectionId}`);
      lineList.push(`      I: |${serializedCollectionItemSeries.join('')}|`);
      lineList.push(`      C: |${serializedCollectionSeries.join('')}|`);
      lineList.push('');
    });

  lineList.push('Transforms:');
  lineList.push('');

  statistics.programmedTransformList
    .map((configuration, index) => {
      let sortValue = configuration.relativeExecutionCountTickSeries.findIndex(
        (value) => value > 0,
      );
      sortValue = sortValue === -1 ? Infinity : sortValue;

      return {
        configuration,
        sortValue,
        index,
      };
    })
    .sort((a, b) => a.sortValue - b.sortValue)
    .forEach(({ configuration, index }) => {
      const name =
        configuration.mutableTransformState.programmedTransform.name ??
        `${index}`;

      lineList.push(`  ${name}`);

      configuration.connectionList.forEach((connection) => {
        const connectionType =
          connection.stream.typeName === StreamTypeName.CollectionStream
            ? 'C'
            : 'I';
        const serializedSeries = connection.tickSeries.map((value) =>
          value === 1 ? TRIGGER_CHARACTER : IDLE_CHARACTER,
        );

        lineList.push(`    ${connection.collectionId}`);
        lineList.push(
          `      ${connectionType}: |${serializedSeries.join('')}|`,
        );
      });

      const executionCountList =
        configuration.relativeExecutionCountTickSeries.map((value) => {
          if (value === 0) {
            return IDLE_CHARACTER;
          }

          if (value < 10) {
            return value;
          }

          return 'n';
        });

      lineList.push(`         |${executionCountList.map(() => '_').join('')}|`);
      lineList.push(`      E: |${executionCountList.join('')}|`);

      lineList.push('');
    });

  const text = lineList.join('\n');

  return text;
};
