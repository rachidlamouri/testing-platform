import { LanbeTypeName } from '../core/engine-shell/voictent/lanbe';
import { RuntimeStatistics } from '../core/engine/digikikify';

export const serializeRuntimeStatistics = (
  statistics: RuntimeStatistics,
): string => {
  const TRIGGER_CHARACTER = 'X';
  const IDLE_CHARACTER = '-';

  const lineList: string[] = [];

  lineList.push('Collections:');
  lineList.push('');

  statistics.voictentList
    .map((configuration) => {
      let voictentIndex = configuration.voictentTickSeries.findIndex(
        (value) => value === 1,
      );
      voictentIndex = voictentIndex === -1 ? Infinity : voictentIndex;

      let voictentItemIndex = configuration.voictentItemTickSeries.findIndex(
        (value) => value === 1,
      );
      voictentItemIndex =
        voictentItemIndex === -1 ? Infinity : voictentItemIndex;

      const sortValue = Math.min(voictentIndex, voictentItemIndex);

      return {
        configuration,
        sortValue,
      };
    })
    .sort((a, b) => a.sortValue - b.sortValue)
    .forEach(({ configuration: c }) => {
      const serializedVoictentItemSeries = c.voictentItemTickSeries.map(
        (value) => (value === 1 ? TRIGGER_CHARACTER : IDLE_CHARACTER),
      );
      const serializedVoictentSeries = c.voictentTickSeries.map((value) =>
        value === 1 ? TRIGGER_CHARACTER : IDLE_CHARACTER,
      );

      lineList.push(`    ${c.gepp}`);
      lineList.push(`      I: |${serializedVoictentItemSeries.join('')}|`);
      lineList.push(`      C: |${serializedVoictentSeries.join('')}|`);
      lineList.push('');
    });

  lineList.push('Transforms:');
  lineList.push('');

  statistics.estinantList
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
      const name = configuration.platomity.estinant.name ?? `${index}`;

      lineList.push(`  ${name}`);

      configuration.connectionList.forEach((connection) => {
        const connectionType =
          connection.lanbe.typeName === LanbeTypeName.VoictentLanbe ? 'C' : 'I';
        const serializedSeries = connection.tickSeries.map((value) =>
          value === 1 ? TRIGGER_CHARACTER : IDLE_CHARACTER,
        );

        lineList.push(`    ${connection.gepp}`);
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
