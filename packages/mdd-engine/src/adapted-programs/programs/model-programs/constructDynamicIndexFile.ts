import * as recast from 'recast';
import Case from 'case';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  OUTPUT_FILE_COLLECTION_ID,
  OutputFileStreamMetatype,
} from '../../programmable-units/output-file/outputFile';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  PROGRAM_MODEL_COLLECTION_ID,
  ProgramModelStreamMetatype,
} from '../../programmable-units/engine-program-model/program/programModel';
import { GeneratedIndex, ProgramMetadata } from './app/generatedDataTypes';
import {
  IdentifierConfiguration,
  treeifyDatum,
} from '../render-knowledge-graph/treeifyDatum';
import {
  APP_RENDERER_DELAYER_COLLECTION_ID,
  AppRendererDelayerInstance,
  AppRendererDelayerStreamMetatype,
} from '../render-knowledge-graph/appRendererDelayer';

/**
 * Generates a barrel file for every file created by decodeAndRecastSvgDocument for the
 * knowledge graph app to import
 */
export const constructDynamicIndexFile = buildProgrammedTransform({
  name: 'constructDynamicIndexFile',
})
  .fromCollection2<ProgramModelStreamMetatype>({
    collectionId: PROGRAM_MODEL_COLLECTION_ID,
  })
  .toItem2<OutputFileStreamMetatype>({
    collectionId: OUTPUT_FILE_COLLECTION_ID,
  })
  .toItem2<AppRendererDelayerStreamMetatype>({
    collectionId: APP_RENDERER_DELAYER_COLLECTION_ID,
  })
  .onTransform((programModelCollection) => {
    type ModifiedProgramMetadata = SpreadN<
      [
        Omit<ProgramMetadata, 'Component'>,
        { Component: IdentifierConfiguration },
      ]
    >;

    type ModifiedGeneratedIndex = SpreadN<
      [
        Omit<GeneratedIndex, 'programList'>,
        { programList: ModifiedProgramMetadata[] },
      ]
    >;

    const programList = programModelCollection.list
      .map<ModifiedProgramMetadata>((programModel) => {
        const { programName } = programModel.skeleton.programLocator;

        return {
          programName,
          description: programModel.skeleton.description,
          Component: new IdentifierConfiguration(Case.pascal(programName)),
        };
      })
      .sort((metadataA, metadataB) => {
        if (metadataA.programName < metadataB.programName) {
          return -1;
        }

        return 1;
      });

    const generatedIndex: ModifiedGeneratedIndex = {
      programList,
    };

    const importStatementList = programModelCollection.list.map(
      (programModel) => {
        const { programName } = programModel.skeleton.programLocator;
        return `import { Main as ${Case.pascal(
          programName,
        )} } from './${Case.kebab(programName)}';`;
      },
    );

    const importStatementText = importStatementList.join('\n');

    const dynamicIndexAstNode = treeifyDatum(generatedIndex);

    const dynamicIndexCode = recast.print(dynamicIndexAstNode).code;

    const programText = `
      ${importStatementText}
      import { GeneratedIndex } from '../generatedDataTypes';

      export default ${dynamicIndexCode} satisfies GeneratedIndex
    `;

    return {
      [OUTPUT_FILE_COLLECTION_ID]: {
        filePath:
          'packages/mdd-engine/src/adapted-programs/programs/model-programs/app/generated/index.tsx',
        text: programText,
      },
      [APP_RENDERER_DELAYER_COLLECTION_ID]: new AppRendererDelayerInstance({
        programmedTransformName: 'constructDynamicIndexFile',
      }),
    };
  })
  .assemble();
