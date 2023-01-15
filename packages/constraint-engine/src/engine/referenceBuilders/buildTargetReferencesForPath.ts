import { UnkownTargetPathSet } from '../../types/targetPath';
import { UnknownTargetReference } from '../../types/targetReference';
import {
  UnknownTargetReferenceConfiguration,
  UnknownTargetReferenceConfigurationTuple,
} from '../../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { TargetReferenceMap } from '../targetReferenceMap';
import { buildTargetReferencesForConfiguration } from './buildTargetReferencesForConfiguration';

export class TargetReferenceConfigurationError extends Error {
  public readonly originalTrace: string[];

  constructor(
    public readonly configuration: UnknownTargetReferenceConfiguration,
    public readonly error: unknown,
  ) {
    super('Failed to build target reference(s)');
    this.originalTrace =
      error instanceof Error ? (error.stack ?? '').split('\n') : [];
  }
}

export type TargetReferencesBuilderInput = {
  targetReferenceConfigurationTuple: UnknownTargetReferenceConfigurationTuple;
  targetReferenceMap: TargetReferenceMap;
  currentTargetPaths: UnkownTargetPathSet;
};

export type TargetReferencesBuilderResult = {
  references: UnknownTargetReference[];
  errors: TargetReferenceConfigurationError[];
};

export const buildTargetReferencesForPath = ({
  targetReferenceConfigurationTuple,
  targetReferenceMap,
  currentTargetPaths,
}: TargetReferencesBuilderInput): TargetReferencesBuilderResult => {
  const references: UnknownTargetReference[] = [];
  const errors: TargetReferenceConfigurationError[] = [];

  const configurationsToBuild = targetReferenceConfigurationTuple.filter(
    (configuration) => currentTargetPaths.has(configuration.inputTargetPath),
  );

  configurationsToBuild.forEach((targetReferenceConfiguration) => {
    try {
      const nextReferences = buildTargetReferencesForConfiguration({
        targetReferenceConfiguration,
        targetReferenceMap,
      });

      references.push(...nextReferences);
    } catch (error: unknown) {
      errors.push(
        new TargetReferenceConfigurationError(
          targetReferenceConfiguration,
          error,
        ),
      );
    }
  });

  return {
    references,
    errors,
  };
};
