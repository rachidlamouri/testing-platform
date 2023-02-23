import fs from 'fs';
import { Zorn } from '../../core/zorn';
import { Grition } from '../../custom-adapter/grition';
import { Odeshin } from '../../custom-adapter/odeshin';
import { Plifal } from '../../custom-adapter/plifal';
import {
  HtmlFileAPlifal,
  HTML_FILE_A_GEPP,
} from '../../example/custom/file/htmlFileA';
import { buildCortmumHamletive } from '../../type-script-adapter/hamletive/cortmum';
import { File } from '../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../utilities/file/fileExtensionSuffixIdentifier';
import { LocationSetPlifal, LOCATION_SET_GEPP } from './locationSet';

export type OutputHtmlFile = Grition<
  File<
    FileExtensionSuffixIdentifier.TabSeparatedValues,
    { parsedContents: Record<string, string>[] }
  >
>;

export type OutputHtmlFileIdentifier = `output-html-file:${string}`;

export type OutputHtmlFileOdeshin = Odeshin<
  OutputHtmlFileIdentifier,
  OutputHtmlFile
>;

export const OUTPUT_HTML_FILE_GEPP = Symbol('output-html-file');

export type OutputHtmlFileBGepp = typeof OUTPUT_HTML_FILE_GEPP;

export type OutputHtmlFilePlifal = Plifal<
  [OutputHtmlFileBGepp],
  OutputHtmlFileOdeshin
>;

export type OutputHtmlFileBPlifalTuple = readonly OutputHtmlFilePlifal[];

type InputPlifalTuple = [HtmlFileAPlifal, LocationSetPlifal];
type OutputPlifalTuple = [];

export const outputHtmlFileEstinant = buildCortmumHamletive<
  InputPlifalTuple,
  OutputPlifalTuple,
  Zorn
>({
  inputGeppTuple: [HTML_FILE_A_GEPP, LOCATION_SET_GEPP],
  croard: () => 'same-id',
  tropoig: (htmlFileInput, locationSetInput) => {
    const fileContents = fs.readFileSync(
      htmlFileInput.hubblepup.grition.filePath,
      'utf8',
    );

    const outputContents = fileContents.replace(
      '// TODO: REPLACE ME',
      `const inputJson = \`${JSON.stringify(
        locationSetInput.hubblepup.grition,
        null,
        2,
      )}\``,
    );

    fs.writeFileSync(
      'packages/open-schema-type-script/src/minecraft-example/output.html',
      outputContents,
    );

    return [];
  },
});
