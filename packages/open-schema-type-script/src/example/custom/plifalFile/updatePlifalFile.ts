import fs from 'fs';
import { buildWortinatorHamletive } from '../../../type-script-adapter/hamletive/wortinator';
import { FileName } from '../../../utilities/file/file';
import {
  IdentifierCollection,
  PlifalFileBPlifal,
  PLIFAL_FILE_B_GEPP,
} from './plifalFileB';

type IdentifierNameCollection = {
  [Key in keyof IdentifierCollection as `${Key}Name`]: string;
};

type CodeGetterCollection = {
  [Key in keyof IdentifierCollection]: (
    fileName: FileName,
    collection: IdentifierNameCollection,
  ) => string;
};

const codeGetters: CodeGetterCollection = {
  baseType: (f, c) => {
    return `export type ${c.baseTypeName} = {}`;
  },
  gritionType: (f, c) => {
    return `export type ${c.gritionTypeName} = Grition<${c.baseTypeName}>`;
  },
  geppConstant: (f, c) => {
    return `export const ${c.geppConstantName} = Symbol(${f.kebabCase})`;
  },
  geppType: (f, c) => {
    return `export type ${c.geppTypeName} = typeof ${c.geppConstantName}`;
  },
  identifierType: (f, c) => {
    return `export type ${c.identifierTypeName} = \`${f.kebabCase}:\${string}\``;
  },
  odeshinType: (f, c) => {
    return `export type ${c.odeshinTypeName} = Odeshin<${c.identifierTypeName}, ${c.gritionTypeName}>`;
  },
  plifalType: (f, c) => {
    return `export type ${c.plifalTypeName} = Plifal<[${c.geppTypeName}], ${c.odeshinTypeName}>`;
  },
};

export const updatePlifalFile = buildWortinatorHamletive<PlifalFileBPlifal>({
  inputGepp: PLIFAL_FILE_B_GEPP,
  haquel: (input) => {
    const { filePath, inMemoryFileName } = input.hubblepup.grition;
    const { identifierCollection } = input.hubblepup.grition.additionalMetadata;

    const identifierNameCollection: IdentifierNameCollection = {
      baseTypeName: identifierCollection.baseType.name,
      gritionTypeName: identifierCollection.gritionType.name,
      geppConstantName: identifierCollection.geppConstant.name,
      geppTypeName: identifierCollection.geppType.name,
      identifierTypeName: identifierCollection.identifierType.name,
      odeshinTypeName: identifierCollection.odeshinType.name,
      plifalTypeName: identifierCollection.plifalType.name,
    };

    const prependedCodeList = Object.entries(identifierCollection)
      .filter(([, identifier]) => {
        return !identifier.has;
      })
      .map(([key]) => {
        fs.readFileSync(filePath);

        const code = codeGetters[key as keyof CodeGetterCollection](
          inMemoryFileName,
          identifierNameCollection,
        );

        return code;
      });

    if (prependedCodeList.length === 0) {
      return;
    }

    const prependedCode = prependedCodeList.join('\n');
    const currentContents = fs.readFileSync(filePath, 'utf8');
    const outputFileContents = `${prependedCode}\n${currentContents}`;
    fs.writeFileSync(filePath, outputFileContents);

    // eslint-disable-next-line no-console
    console.log(`Wrote ${prependedCodeList.length} lines to ${filePath}`);
  },
});
