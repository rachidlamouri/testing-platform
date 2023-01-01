import { UnknownNormalizedTargetReference } from '../../types/targetReference';
import { UnknownTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { NormalizedTargetReferenceMap } from '../normalizedTargetReferenceMap';
import { buildNormalizedTargetReferencesForConfiguration } from './buildNormalizedTargetReferencesForConfiguration';

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

export type NormalizedTargetReferencesBuilderInput = {
  targetReferenceConfigurations: readonly UnknownTargetReferenceConfiguration[];
  normalizedTargetReferenceMap: NormalizedTargetReferenceMap;
  currentNormalizedPath: string;
};

export type NormalizedTargetReferencesBuilderResult = {
  references: UnknownNormalizedTargetReference[];
  errors: TargetReferenceConfigurationError[];
};

export const buildNormalizedTargetReferencesForPath = ({
  targetReferenceConfigurations,
  normalizedTargetReferenceMap,
  currentNormalizedPath,
}: NormalizedTargetReferencesBuilderInput): NormalizedTargetReferencesBuilderResult => {
  const references: UnknownNormalizedTargetReference[] = [];
  const errors: TargetReferenceConfigurationError[] = [];

  const configurationsToBuild = targetReferenceConfigurations.filter(
    (configuration) =>
      configuration.normalizedInputTargetPath === currentNormalizedPath,
  );

  configurationsToBuild.forEach((targetReferenceConfiguration) => {
    try {
      const nextReferences = buildNormalizedTargetReferencesForConfiguration({
        targetReferenceConfiguration,
        normalizedTargetReferenceMap,
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
