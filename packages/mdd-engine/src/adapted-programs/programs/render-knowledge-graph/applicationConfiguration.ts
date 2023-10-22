import { ApplicationConfiguration } from './app/node/applicationConfiguration';

/**
 * The knowledge graph application configuration
 */
export const applicationConfiguration = new ApplicationConfiguration({
  inputTypeScriptFilePath:
    'packages/mdd-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/index.tsx',
  outputHtmlFileName: 'rendered-knowledge-graph',
});
