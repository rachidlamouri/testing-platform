import fs from 'fs';
import { UnknownAppliedRuleResult } from '../types/rule';
import { UnknownRuleConfiguration } from '../types/ruleConfiguration';
import { ROOT_TARGET_PATH, UnkownTargetPathSet } from '../types/targetPath';
import { UnknownTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { applyRules } from './applyRules';
import {
  buildTargetReferencesForPath,
  TargetReferenceConfigurationError,
} from './referenceBuilders/buildTargetReferencesForPath';
import { TargetReferenceMap } from './targetReferenceMap';
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

  const allRuleResults: UnknownAppliedRuleResult[] = [];
  const allTargetReferenceConfigurationErrors: TargetReferenceConfigurationError[] =
    [];

  const ruleConfigurationMap = new RuleConfigurationMap();
  ruleConfigurations.forEach((ruleConfiguration) => {
    ruleConfigurationMap.setRuleConfiguration(ruleConfiguration);
  });

  let loopCount = 0;
  let currentTargetPaths: UnkownTargetPathSet = new Set();
  let nextTargetPaths: UnkownTargetPathSet = new Set([ROOT_TARGET_PATH]);
  let currentTargetReferenceMap: TargetReferenceMap = new TargetReferenceMap();
  let nextTargetReferenceMap: TargetReferenceMap = new TargetReferenceMap();

  while (nextTargetPaths.size !== 0) {
    currentTargetPaths = nextTargetPaths;
    currentTargetReferenceMap = nextTargetReferenceMap;

    const referenceBuilderResult = buildTargetReferencesForPath({
      targetReferenceConfigurations,
      targetReferenceMap: currentTargetReferenceMap,
      currentTargetPaths,
    });

    allTargetReferenceConfigurationErrors.push(
      ...referenceBuilderResult.errors,
    );

    nextTargetReferenceMap = new TargetReferenceMap();
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    referenceBuilderResult.references.forEach((targetReference) => {
      nextTargetReferenceMap.setTargetReference(targetReference);
    });

    const nextRuleResults = applyRules({
      ruleConfigurationMap,
      targetReferences: referenceBuilderResult.references,
    });

    allRuleResults.push(...nextRuleResults);

    nextTargetPaths = new Set(
      referenceBuilderResult.references.map((reference) => reference.path),
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
