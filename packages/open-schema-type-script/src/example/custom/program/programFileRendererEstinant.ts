import {
  buildWortinatorHamletive,
  Haqueler,
} from '../../../type-script-adapter/hamletive/wortinator';
import { fileUtilities } from '../../core/debugger/fileUtilities';
import {
  ProgramFileCPlifal,
  ProgramNode,
  PROGRAM_FILE_C_GEPP,
} from './programFileC';

type InputOptionTuple = [ProgramFileCPlifal];

const renderProgram: Haqueler<InputOptionTuple> = (input) => {
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
    .map((node, index) => `state "${node.name}" as S${index}`)
    .join('\n');

  const renderedRelationshipList = relationships
    .map(({ from, to }) => `${getStateId(from)}-->${getStateId(to)}`)
    .join('\n');

  const mermaid = `
    stateDiagram-v2
    state "~~~" as SUnknown
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
  buildWortinatorHamletive<InputOptionTuple>({
    inputGepp: PROGRAM_FILE_C_GEPP,
    haquel: renderProgram,
  });
