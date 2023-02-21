import {
  buildWortinatorHamletive,
  Haqueler,
} from '../../../type-script-adapter/hamletive/wortinator';
import { fileUtilities } from '../../core/debugger/fileUtilities';
import {
  ProgramNode,
  ProgramFileC2Plifal,
  ProgramNodeTypeName,
  PROGRAM_FILE_C2_GEPP,
} from './programFileC2';

type InputPlifal = ProgramFileC2Plifal;

const renderProgram: Haqueler<InputPlifal> = (input) => {
  const { programName, programNodeSet, relationships } =
    input.hubblepup.grition.additionalMetadata;

  type RenderData = {
    node: ProgramNode;
    stateId: string;
  };

  const renderDataByNode = new Map<ProgramNode, RenderData>();
  [...programNodeSet].forEach((node, index) => {
    const stateId = `S${index}`;

    renderDataByNode.set(node, { node, stateId });
  });

  const getStateId = (node: ProgramNode): string =>
    renderDataByNode.get(node)?.stateId ?? 'SUnknown';

  const stateDeclarationList = [...programNodeSet]
    .map((node, index) => {
      if (node.typeName === ProgramNodeTypeName.Estinant) {
        return `S${index}>${node.name}]`;
      }
      return `S${index}[${node.name}]`;
    })
    .join('\n');

  const renderedRelationshipList = relationships
    .map(({ from, to }) => {
      return `${getStateId(from)}-->${getStateId(to)}`;
    })
    .join('\n');

  const mermaid = `
    flowchart LR
    SUnknown[UNKNOWN]
    ${stateDeclarationList}

    ${renderedRelationshipList}
`;

  const markdown = `# ${programName}

\`\`\`mermaid
${mermaid}
\`\`\`
  `;

  const fileName = `${programName}.md`;
  const filePath = fileUtilities.getOutputFilePath(
    'rendered-program',
    fileName,
  );
  fileUtilities.writeFile(filePath, markdown);
};

export const programFileRendererEstinant =
  buildWortinatorHamletive<InputPlifal>({
    inputGepp: PROGRAM_FILE_C2_GEPP,
    haquel: renderProgram,
  });
