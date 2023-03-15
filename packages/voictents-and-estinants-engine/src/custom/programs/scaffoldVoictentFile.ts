import fs from 'fs';
import { digikikify } from '../../core/digikikify';
import { buildDefaultHandler } from '../debugger/quirmDebugger';
import { getFileMetadata } from '../programmable-units/file/getFileMetadata';

const [filePath] = process.argv.slice(2);

if (filePath === undefined) {
  throw Error('filePath is required');
}

if (!fs.existsSync(filePath)) {
  throw Error(`"${filePath}" does not exist`);
}

type ScaffoldConfiguration = {
  filePath: string;
};

const partsToPascal = (x: string[]): string => {
  return x
    .map((word) => {
      return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    })
    .join('');
};

const partsToScreamingSnake = (x: string[]): string => {
  return x
    .map((word) => {
      return word.toUpperCase();
    })
    .join('_');
};

const partsToKebab = (x: string[]): string => {
  return x.join('-');
};

digikikify({
  initialQuirmTuple: [
    {
      gepp: 'scaffold-configuration',
      hubblepup: { filePath },
    },
  ],
  estinantTuple: [
    {
      leftAppreffinge: {
        gepp: 'scaffold-configuration',
      },
      rightAppreffingeTuple: [],
      tropoig: (input): [] => {
        const config = input as ScaffoldConfiguration;

        const metadata = getFileMetadata(config.filePath);

        const pascalCaseName = partsToPascal(metadata.inMemoryFileNameParts);
        const kebabCaseName = partsToKebab(metadata.inMemoryFileNameParts);
        const screamingSnakeCaseName = partsToScreamingSnake(
          metadata.inMemoryFileNameParts,
        );

        const currentContents = fs.readFileSync(filePath, 'utf8');

        const customTypeName = pascalCaseName;
        const gritionTypeName = `${customTypeName}Grition`;
        const odeshinTypeName = `${customTypeName}Odeshin`;
        const geppCodeName = `${screamingSnakeCaseName}_GEPP`;
        const geppLiteral = kebabCaseName;
        const geppTypeName = `${customTypeName}Gepp`;
        const voictentTypeName = `${customTypeName}Voictent`;

        const prependedContent = [
          `export type ${customTypeName} = unknown`,
          '',
          `export type ${gritionTypeName} = Grition<${customTypeName}>`,
          '',
          `export type ${odeshinTypeName} = OdeshinFromGrition<${gritionTypeName}>`,
          '',
          `export const ${geppCodeName} = '${geppLiteral}'`,
          '',
          `export type ${geppTypeName} = typeof ${geppCodeName}`,
          '',
          `export type ${voictentTypeName} = Voictent<${geppTypeName}, ${odeshinTypeName}>`,
          '',
        ].join('\n');

        const outputContents = `${prependedContent}${currentContents}`;

        fs.writeFileSync(filePath, outputContents);

        return [];
      },
    },
  ],
  onHubblepupAddedToVoictents: buildDefaultHandler('scaffoldVoictentFile'),
});
