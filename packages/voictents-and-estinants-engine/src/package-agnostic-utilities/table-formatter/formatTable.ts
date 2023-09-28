import { ForegroundColor, applyColor } from '../color/colorList';

type NormalizedCell = {
  text: string;
  color?: ForegroundColor;
};
type Cell = string | NormalizedCell;

type Row = Cell[];
type NormalizedRow = NormalizedCell[];

type Table = Row[];
type NormalizedTable = NormalizedRow[];

export const formatTable = (table: Table): string => {
  const normalizedTable: NormalizedTable = table.map<NormalizedRow>((row) => {
    return row.map<NormalizedCell>((cell) => {
      if (typeof cell === 'string') {
        return {
          text: cell,
        };
      }

      return cell;
    });
  });

  const [headerRow, ...bodyRowList] = normalizedTable;

  const columnWidthList: number[] = Array.from({
    length: headerRow.length,
  }).map(() => -Infinity);

  normalizedTable.forEach((row) => {
    row.forEach((cell, columnIndex) => {
      columnWidthList[columnIndex] = Math.max(
        columnWidthList[columnIndex],
        ...cell.text.split('\n').map((line) => line.length),
      );
    });
  });

  const headerLineRow: NormalizedRow = headerRow.map<NormalizedCell>(
    (_, columnIndex) => {
      const columnWidth = columnWidthList[columnIndex];
      return {
        text: ''.padEnd(columnWidth, '-'),
      };
    },
  );

  const tableWithHeaderLine: NormalizedTable = [
    headerRow,
    headerLineRow,
    ...bodyRowList,
  ];

  const rowListList = tableWithHeaderLine.map((row) => {
    const rowTextList = row.map((cell, columnIndex) => {
      const columnWidth = columnWidthList[columnIndex];
      const paddedText = cell.text.padEnd(columnWidth, ' ');
      const formattedCell =
        cell.color !== undefined
          ? applyColor(paddedText, cell.color)
          : paddedText;
      return formattedCell;
    });

    return rowTextList.join(' | ');
  });

  const tableText = rowListList.join('\n');
  return tableText;
};
