import fs from 'fs';
import { Grition } from '../../custom-adapter/grition';
import { Odeshin } from '../../custom-adapter/odeshin';
import { Plifal } from '../../custom-adapter/plifal';
import {
  TsvFileAPlifal,
  TSV_FILE_A_GEPP,
} from '../../example/custom/file/tsvFileA';
import { buildOnamaHamletive } from '../../type-script-adapter/hamletive/onama';
import { File } from '../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../utilities/file/fileExtensionSuffixIdentifier';

export type TsvFileB = Grition<
  File<
    FileExtensionSuffixIdentifier.TabSeparatedValues,
    { parsedContents: Record<string, string>[] }
  >
>;

export type TsvFileBIdentifier = `tsv-file-b:${string}`;

export type TsvFileBOdeshin = Odeshin<TsvFileBIdentifier, TsvFileB>;

export const TSV_FILE_B_GEPP = Symbol('tsv-file-b');

export type TsvFileBGepp = typeof TSV_FILE_B_GEPP;

export type TsvFileBPlifal = Plifal<[TsvFileBGepp], TsvFileBOdeshin>;

export type TsvFileBPlifalTuple = readonly TsvFileBPlifal[];

export const tsvFileBEstinant = buildOnamaHamletive<
  TsvFileAPlifal,
  TsvFileBPlifal
>({
  inputGepp: TSV_FILE_A_GEPP,
  ankel: (input: TsvFileAPlifal): TsvFileBPlifal => {
    const fileContents = fs.readFileSync(
      input.hubblepup.grition.filePath,
      'utf8',
    );

    const lines = fileContents.split('\r\n');
    const rowTuple = lines.map((line) => line.split('\t'));
    const [headingTuple, ...bodyRowTuple] = rowTuple;

    const headingsByColumnIndex: Record<number, string> = {};
    headingTuple.forEach((heading, columnIndex) => {
      headingsByColumnIndex[columnIndex] = heading;
    });

    const rowObjectTuple = bodyRowTuple.map((cellTuple) => {
      const rowObject: Record<string, string> = {};

      cellTuple.forEach((cell, columnIndex) => {
        const heading =
          headingsByColumnIndex[columnIndex]?.trim() || 'MISSING_HEADING';

        rowObject[heading] = cell;
      });

      return rowObject;
    });

    const output: TsvFileBPlifal = {
      geppTuple: [TSV_FILE_B_GEPP],
      hubblepup: {
        identifier: `tsv-file-b:${input.hubblepup.grition.filePath}`,
        grition: {
          ...input.hubblepup.grition,
          additionalMetadata: {
            parsedContents: rowObjectTuple,
          },
        },
      },
    };

    return output;
  },
});
