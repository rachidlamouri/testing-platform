import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { SINGLETON_ID } from '../../../package-agnostic-utilities/data-structure/id';
import { File } from '../../programmable-units/file/file';

type ProjectNodeVersionModelInput = {
  nodeVersionManagerRunCommands: File;
  projectVersion: string;
  latestLongTermSupportVersion: string;
};

/**
 * The information needed to compare this project's node version to the latest
 * long term support node version
 */
export class ProjectNodeVersionModel implements ProjectNodeVersionModelInput {
  id = SINGLETON_ID;

  nodeVersionManagerRunCommands: File;

  projectVersion: string;

  latestLongTermSupportVersion: string;

  constructor(input: ProjectNodeVersionModelInput) {
    this.nodeVersionManagerRunCommands = input.nodeVersionManagerRunCommands;
    this.projectVersion = input.projectVersion;
    this.latestLongTermSupportVersion = input.latestLongTermSupportVersion;
  }
}

export const PROJECT_NODE_VERSION_MODEL_COLLECTION_ID =
  'project-node-version-model';

type ProjectNodeVersionModelCollectionId =
  typeof PROJECT_NODE_VERSION_MODEL_COLLECTION_ID;

export type ProjectNodeVersionModelStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProjectNodeVersionModelCollectionId,
    ProjectNodeVersionModel
  >;
