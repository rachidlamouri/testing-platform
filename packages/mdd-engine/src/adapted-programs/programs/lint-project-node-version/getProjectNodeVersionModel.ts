import fs from 'fs';
import { execSync } from 'child_process';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  FILE_COLLECTION_ID,
  FileStreamMetatype,
} from '../../programmable-units/file/file';
import {
  PROJECT_NODE_VERSION_MODEL_COLLECTION_ID,
  ProjectNodeVersionModel,
  ProjectNodeVersionModelStreamMetatype,
} from './projectNodeVersionModel';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';

const NODE_VERSION_MANAGER_RUN_COMMANDS_FILE_PATH = '.nvmrc';

/**
 * Retrieves the information needed to compare this project's node version to
 * the latest long term support node version
 *
 * @todo When we support transforms that generate date without an input, see if
 * we can use nvm to get the package version without having to find the nvmrc
 * file
 */
export const getProjectNodeVersionModel = buildProgrammedTransform({
  name: 'getProjectNodeVersionModel',
})
  .fromItem2<FileStreamMetatype>({
    collectionId: FILE_COLLECTION_ID,
  })
  .toItemTuple2<ProjectNodeVersionModelStreamMetatype>({
    collectionId: PROJECT_NODE_VERSION_MODEL_COLLECTION_ID,
  })
  .onTransform((file) => {
    if (
      file.filePath.serialized !== NODE_VERSION_MANAGER_RUN_COMMANDS_FILE_PATH
    ) {
      return [];
    }

    const packageVersion = fs
      .readFileSync(NODE_VERSION_MANAGER_RUN_COMMANDS_FILE_PATH, {
        encoding: 'utf-8',
      })
      .replace('\n', '');

    // TODO: nvm was flagged by the nonsense linter. Clean this up in a way that is easy to read and understand (yes I know that's a vague request)
    const NODE_VERSION_MANAGER_DIRECTORY_ENVIRONMENT_KEY = 'NVM_DIR';
    const nodeVersionManagerDirectory =
      process.env[NODE_VERSION_MANAGER_DIRECTORY_ENVIRONMENT_KEY];
    assertNotUndefined(nodeVersionManagerDirectory);

    const latestLongTermSupportVersion = execSync(
      `. ${nodeVersionManagerDirectory}/nvm.sh && nvm version-remote --lts`,
      {
        encoding: 'utf-8',
        env: process.env,
      },
    ).replace('\n', '');

    return [
      new ProjectNodeVersionModel({
        nodeVersionManagerRunCommands: file,
        projectVersion: packageVersion,
        latestLongTermSupportVersion,
      }),
    ];
  })
  .assemble();
