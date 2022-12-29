import { UnknownNormalizedAppliedRuleResult } from '../types/rule';
import { UnknownTargetPath } from '../types/targetPath';
import { UnknownTargetTypeId } from '../types/typedTarget';

export type NormalizedAppliedRuleResultsByInstancePath = Map<
  UnknownTargetPath,
  UnknownNormalizedAppliedRuleResult
>;

export type NormalizedAppliedRuleResultsByInstancePathByNormalizedPath = Map<
  UnknownTargetPath,
  NormalizedAppliedRuleResultsByInstancePath
>;

export type NormalizedAppliedRuleResultsByInstancePathByNormalizedPathByTargetTypeId =
  Map<
    UnknownTargetTypeId,
    NormalizedAppliedRuleResultsByInstancePathByNormalizedPath
  >;

export class NormalizedAppliedRuleResultMap {
  private normalizedAppliedRuleResultsByInstancePathByNormalizedPathByTargetTypeId: NormalizedAppliedRuleResultsByInstancePathByNormalizedPathByTargetTypeId =
    new Map();

  setNormalizedAppliedRuleResult(
    appliedRuleResult: UnknownNormalizedAppliedRuleResult,
  ): void {
    const normalizedAppliedRuleResultsByInstancePathByNormalizedPath: NormalizedAppliedRuleResultsByInstancePathByNormalizedPath =
      this.normalizedAppliedRuleResultsByInstancePathByNormalizedPathByTargetTypeId.get(
        appliedRuleResult.targetTypeId,
      ) ??
      (new Map() as NormalizedAppliedRuleResultsByInstancePathByNormalizedPath);

    const normalizedAppliedRuleResultsByInstancePath: NormalizedAppliedRuleResultsByInstancePath =
      normalizedAppliedRuleResultsByInstancePathByNormalizedPath.get(
        appliedRuleResult.normalizedTargetPath,
      ) ?? (new Map() as NormalizedAppliedRuleResultsByInstancePath);

    normalizedAppliedRuleResultsByInstancePath.set(
      appliedRuleResult.targetInstancePath,
      appliedRuleResult,
    );
    normalizedAppliedRuleResultsByInstancePathByNormalizedPath.set(
      appliedRuleResult.normalizedTargetPath,
      normalizedAppliedRuleResultsByInstancePath,
    );
    this.normalizedAppliedRuleResultsByInstancePathByNormalizedPathByTargetTypeId.set(
      appliedRuleResult.targetTypeId,
      normalizedAppliedRuleResultsByInstancePathByNormalizedPath,
    );
  }

  // getNormalizedTargetReferenceListByTypeIdAndNormalizedPath({
  //   typeId,
  //   normalizedPath,
  // }: Omit<
  //   UnknownNormalizedTargetReference,
  //   'instance' | 'instancePath'
  // >): UnknownNormalizedTargetReference[] {
  //   const normalizedAppliedRuleResultsByInstancePathByNormalizedPath: NormalizedAppliedRuleResultsByInstancePathByNormalizedPath =
  //     this.normalizedAppliedRuleResultsByInstancePathByNormalizedPathByTargetTypeId.get(
  //       typeId,
  //     ) ??
  //     (new Map() as NormalizedAppliedRuleResultsByInstancePathByNormalizedPath);

  //   const normalizedAppliedRuleResultsByInstancePath: NormalizedAppliedRuleResultsByInstancePath =
  //     normalizedAppliedRuleResultsByInstancePathByNormalizedPath.get(
  //       normalizedPath,
  //     ) ?? (new Map() as NormalizedAppliedRuleResultsByInstancePath);

  //   const list: UnknownNormalizedTargetReference[] = [
  //     ...normalizedAppliedRuleResultsByInstancePath.values(),
  //   ];
  //   return list;
  // }
}
