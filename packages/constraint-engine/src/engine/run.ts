import fs from 'fs';
import { UnknownAppliedRuleResult } from '../types/rule';
import { UnknownRuleConfigurationTuple } from '../types/ruleConfiguration';
import { ROOT_TARGET_PATH, UnkownTargetPathSet } from '../types/targetPath';
import { UnknownTargetReferenceConfigurationTuple } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { applyRules } from './applyRules';
import {
  buildTargetReferencesForPath,
  TargetReferenceConfigurationError,
} from './referenceBuilders/buildTargetReferencesForPath';
import { TargetReferenceMap } from './targetReferenceMap';
import { RuleConfigurationMap } from './ruleConfigurationMap';
import { CustomSet } from '../utils/customSet';

export type ConstraintEngineRunnerInput = {
  targetReferenceConfigurationTuple: UnknownTargetReferenceConfigurationTuple;
  ruleConfigurationTuple: UnknownRuleConfigurationTuple;
};

export type ConstraintEngineRunner = (
  input: ConstraintEngineRunnerInput,
) => void;

const { log } = console;

export const run: ConstraintEngineRunner = ({
  targetReferenceConfigurationTuple,
  ruleConfigurationTuple,
}): void => {
  const debugInfo: Record<string, unknown>[] = [];

  const allRuleResults: UnknownAppliedRuleResult[] = [];
  const allTargetReferenceConfigurationErrors: TargetReferenceConfigurationError[] =
    [];

  const ruleConfigurationMap = new RuleConfigurationMap();
  ruleConfigurationTuple.forEach((ruleConfiguration) => {
    ruleConfigurationMap.setRuleConfiguration(ruleConfiguration);
  });

  let loopCount = 0;
  let currentTargetPaths: UnkownTargetPathSet = new CustomSet();
  let nextTargetPaths: UnkownTargetPathSet = new CustomSet([ROOT_TARGET_PATH]);
  let currentTargetReferenceMap: TargetReferenceMap = new TargetReferenceMap();
  let nextTargetReferenceMap: TargetReferenceMap = new TargetReferenceMap();

  while (nextTargetPaths.size !== 0) {
    currentTargetPaths = nextTargetPaths;
    currentTargetReferenceMap = nextTargetReferenceMap;

    const referenceBuilderResult = buildTargetReferencesForPath({
      targetReferenceConfigurationTuple,
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

    nextTargetPaths = new CustomSet(
      referenceBuilderResult.references.map((reference) => reference.path),
    );

    debugInfo.push({
      loopCount,
      currentTargetPaths: currentTargetPaths.toArray(),
      nextTargetPaths: nextTargetPaths.toArray(),
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
