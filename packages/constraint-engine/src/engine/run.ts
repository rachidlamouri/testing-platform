import fs from 'fs';
import { UnknownNormalizedAppliedRuleResult } from '../types/rule';
import { UnknownRuleConfiguration } from '../types/ruleConfiguration';
import { ROOT_TARGET_PATH, UnkownTargetPathSet } from '../types/targetPath';
import { UnknownTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { applyRules } from './applyRules';
import {
  buildNormalizedTargetReferencesForPath,
  TargetReferenceConfigurationError,
} from './referenceBuilders/buildTargetReferencesForPath';
import { NormalizedTargetReferenceMap } from './targetReferenceMap';
import { RuleConfigurationMap } from './ruleConfigurationMap';

export type ConstraintEngineRunnerInput = {
  targetReferenceConfigurations: readonly UnknownTargetReferenceConfiguration[];
  ruleConfigurations: readonly UnknownRuleConfiguration[];
};

export type ConstraintEngineRunner = (
  input: ConstraintEngineRunnerInput,
) => void;

const { log } = console;

export const run: ConstraintEngineRunner = ({
  targetReferenceConfigurations,
  ruleConfigurations,
}): void => {
  const debugInfo: Record<string, unknown>[] = [];

  const allRuleResults: UnknownNormalizedAppliedRuleResult[] = [];
  const allTargetReferenceConfigurationErrors: TargetReferenceConfigurationError[] =
    [];

  const ruleConfigurationMap = new RuleConfigurationMap();
  ruleConfigurations.forEach((ruleConfiguration) => {
    ruleConfigurationMap.setRuleConfiguration(ruleConfiguration);
  });

  let loopCount = 0;
  let currentTargetPaths: UnkownTargetPathSet = new Set();
  let nextTargetPaths: UnkownTargetPathSet = new Set([ROOT_TARGET_PATH]);
  let currentNormalizedTargetReferenceMap: NormalizedTargetReferenceMap =
    new NormalizedTargetReferenceMap();
  let nextNormalizedTargetReferenceMap: NormalizedTargetReferenceMap =
    new NormalizedTargetReferenceMap();

  while (nextTargetPaths.size !== 0) {
    currentTargetPaths = nextTargetPaths;
    currentNormalizedTargetReferenceMap = nextNormalizedTargetReferenceMap;

    const referenceBuilderResult = buildNormalizedTargetReferencesForPath({
      targetReferenceConfigurations,
      normalizedTargetReferenceMap: currentNormalizedTargetReferenceMap,
      currentTargetPaths,
    });

    allTargetReferenceConfigurationErrors.push(
      ...referenceBuilderResult.errors,
    );

    nextNormalizedTargetReferenceMap = new NormalizedTargetReferenceMap();
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    referenceBuilderResult.references.forEach((targetReference) => {
      nextNormalizedTargetReferenceMap.setNormalizedReference(targetReference);
    });

    const nextRuleResults = applyRules({
      ruleConfigurationMap,
      targetReferences: referenceBuilderResult.references,
    });

    allRuleResults.push(...nextRuleResults);

    nextTargetPaths = new Set(
      referenceBuilderResult.references.map((r) => r.normalizedPath),
    );

    debugInfo.push({
      loopCount,
      currentTargetPaths,
      nextTargetPaths,
      referenceBuilderResult,
      nextRuleResults,
    });

    loopCount += 1;
  }

  fs.writeFileSync('debug', JSON.stringify(debugInfo, null, 2));

  const isEverythingValid =
    allTargetReferenceConfigurationErrors.length === 0 &&
    allRuleResults.every((result) => result.isTargetValid);

  allTargetReferenceConfigurationErrors.forEach((error, index) => {
    log(`Target Configuration Error ${index}`);
    log(JSON.stringify(error, null, 2));
    log();
  });

  allRuleResults
    .filter((result) => !result.isTargetValid)
    .forEach((result, index) => {
      log(`Rule Failure ${index}`);
      log(JSON.stringify(result, null, 2));
      log();
    });

  if (isEverythingValid) {
    log(`All ${allRuleResults.length} checks passed`);
  }

  const exitCode = isEverythingValid ? 0 : 1;
  process.exit(exitCode);
};
