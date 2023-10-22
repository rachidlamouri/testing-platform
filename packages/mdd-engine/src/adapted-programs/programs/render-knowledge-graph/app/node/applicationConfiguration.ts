import { StandardInMemoryStreamMetatype } from '../../../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';

type ApplicationConfigurationInput = {
  inputTypeScriptFilePath: string;
  outputHtmlFileName: string;
};

/**
 * The information needed to render a React application with esbuild
 */
export class ApplicationConfiguration implements ApplicationConfigurationInput {
  inputTypeScriptFilePath: string;

  outputHtmlFileName: string;

  constructor(input: ApplicationConfigurationInput) {
    this.inputTypeScriptFilePath = input.inputTypeScriptFilePath;
    this.outputHtmlFileName = input.outputHtmlFileName;
  }
}

export const APPLICATION_CONFIGURATION_COLLECTION_ID =
  'application-configuration';

type ApplicationConfigurationCollectionId =
  typeof APPLICATION_CONFIGURATION_COLLECTION_ID;

export type ApplicationConfigurationStreamMetatype =
  StandardInMemoryStreamMetatype<
    ApplicationConfigurationCollectionId,
    ApplicationConfiguration
  >;
