import { UnknownNormalizedAppliedRuleResult } from '../types/rule';
import { UnknownRuleConfiguration } from '../types/ruleConfiguration';
import { ROOT_TARGET_PATH } from '../types/targetPath';
import { UnknownNormalizedTargetReference } from '../types/targetReference';
import { UnknownTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { applyRules } from './applyRules';
import { buildNormalizedTargetReferencesForPath } from './normalizedReferenceBuilders/buildNormalizedTargetReferencesForPath';
import { RuleConfigurationMap } from './ruleConfigurationMap';
import { TargetInformationMap } from './targetInformationMap';

export type ConstraintEngineRunnerInput = {
  targetReferenceConfigurations: UnknownTargetReferenceConfiguration[];
  ruleConfigurations: UnknownRuleConfiguration[];
};

export type ConstraintEngineRunner = (
  input: ConstraintEngineRunnerInput,
) => void;

export const run: ConstraintEngineRunner = ({
  targetReferenceConfigurations,
  ruleConfigurations,
}): UnknownNormalizedAppliedRuleResult[] => {
  const allRuleResults: UnknownNormalizedAppliedRuleResult[] = [];

  const ruleConfigurationMap = new RuleConfigurationMap();
  ruleConfigurations.forEach((ruleConfiguration) => {
    ruleConfigurationMap.setRuleConfiguration(ruleConfiguration);
  });

  let currentNormalizedPath: string | null = null;
  let nextNormalizedPath: string | null = ROOT_TARGET_PATH;
  let currentNormalizedTargetReferenceMap: TargetInformationMap<UnknownNormalizedTargetReference> =
    new TargetInformationMap();
  let nextNormalizedTargetReferenceMap: TargetInformationMap<UnknownNormalizedTargetReference> =
    new TargetInformationMap();

  while (nextNormalizedPath !== null) {
    currentNormalizedPath = nextNormalizedPath;
    currentNormalizedTargetReferenceMap = nextNormalizedTargetReferenceMap;

    const referenceBuilderResult = buildNormalizedTargetReferencesForPath({
      targetReferenceConfigurations,
      normalizedTargetReferenceMap: currentNormalizedTargetReferenceMap,
      currentNormalizedPath,
    });

    nextNormalizedTargetReferenceMap = new TargetInformationMap();
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    referenceBuilderResult.references.forEach((targetReference) => {
      nextNormalizedTargetReferenceMap.setInformation({
        targetReference,
        information: targetReference,
      });
    });

    const nextRuleResults = applyRules({
      ruleConfigurationMap,
      targetReferences: referenceBuilderResult.references,
    });

    allRuleResults.push(...nextRuleResults);

    // TODO: traverse all paths, and not just the first
    nextNormalizedPath =
      referenceBuilderResult.references[0]?.normalizedPath ?? null;
  }

  return allRuleResults;
};
