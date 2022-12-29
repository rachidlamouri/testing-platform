import fs from 'fs';
import { stringify } from 'querystring';
import {
  TargetConfigurationName,
  targetConfigurations as targetConfigList,
  ruleConfigurations as ruleConfigList,
} from '../configuration';
import {
  DerivedReferenceBuilder,
  DerivedReferenceSetBuilder,
  ReferenceBuilder,
  TargetInstance,
  TargetReference,
} from '../types';
import {
  ConstraintEngine,
  ReferencesByInstancePath,
  ReferencesByInstancePathByNormalizedPath,
  ReferencesByInstancePathByNormalizedPathByTargetName,
  UnknownRuleConfiguration,
  UnknownTargetConfiguration,
  UnknownTargetName,
  UnknownTargetPath,
  UnknownTargetReference,
} from './types';
import { buildTargets, ReferenceResult } from './buildNormalizedTargetReferences';
import { applyRules } from './applyRules';

const engine: ConstraintEngine = ({
  targetConfigurations,
  ruleConfigurations,
}) => {
  const debugInfo: any[] = [];

  let loopCount = 0;
  let currentPath: string | null = '';
  let previousReferencesByInstancePathByNormalizedPathByTargetName: ReferencesByInstancePathByNormalizedPathByTargetName =
    new Map();
  let referencesByInstancePathByNormalizedPathByTargetName: ReferencesByInstancePathByNormalizedPathByTargetName =
    new Map();

  while (currentPath !== null) {
    const builderResults = buildTargets(
      targetConfigurations,
      previousReferencesByInstancePathByNormalizedPathByTargetName,
      currentPath,
    );
    const referenceResults = builderResults.filter(
      (r): r is ReferenceResult => !(r instanceof Error),
    );

    referenceResults.forEach((referenceResult) => {
      const referencesByInstancePathByNormalizedPath: ReferencesByInstancePathByNormalizedPath =
        referencesByInstancePathByNormalizedPathByTargetName.get(
          referenceResult.reference.instance.name,
        ) ?? new Map();
      const referencesByInstancePath: ReferencesByInstancePath =
        referencesByInstancePathByNormalizedPath.get(
          referenceResult.normalizedPath,
        ) ?? new Map();

      referencesByInstancePath.set(
        referenceResult.reference.path,
        referenceResult.reference,
      );
      referencesByInstancePathByNormalizedPath.set(
        referenceResult.normalizedPath,
        referencesByInstancePath,
      );
      referencesByInstancePathByNormalizedPathByTargetName.set(
        referenceResult.reference.instance.name,
        referencesByInstancePathByNormalizedPath,
      );
    });

    const ruleResults = applyRules(referenceResults, ruleConfigurations);

    currentPath = referenceResults[0]?.normalizedPath ?? null;

    debugInfo.push({
      loopCount,
      currentPath,
      builderResults,
      ruleResults,
    });
    loopCount += 1;

    previousReferencesByInstancePathByNormalizedPathByTargetName =
      referencesByInstancePathByNormalizedPathByTargetName;
    referencesByInstancePathByNormalizedPathByTargetName = new Map();
  }

  fs.writeFileSync('debug', JSON.stringify(debugInfo, null, 2));
};

engine({
  targetConfigurations:
    targetConfigList as readonly UnknownTargetConfiguration[],
  ruleConfigurations: ruleConfigList as readonly UnknownRuleConfiguration[],
});
