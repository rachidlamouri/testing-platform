import { UnknownTargetPath } from '../types/targetPath';
import { UnknownNormalizedTargetReference } from '../types/targetReference';
import { UnknownTargetTypeId } from '../types/typedTarget';

export type TargetReferencesByInstancePath = Map<
  UnknownTargetPath,
  UnknownNormalizedTargetReference
>;

export type TargetReferencesByInstancePathByNormalizedPath = Map<
  UnknownTargetPath,
  TargetReferencesByInstancePath
>;

export type TargetReferencesByInstancePathByNormalizedPathByTargetTypeId = Map<
  UnknownTargetTypeId,
  TargetReferencesByInstancePathByNormalizedPath
>;

export class TargetReferenceMap {
  private targetReferencesByInstancePathByNormalizedPathByTargetTypeId: TargetReferencesByInstancePathByNormalizedPathByTargetTypeId =
    new Map();

  setTargetReference(targetReference: UnknownNormalizedTargetReference): void {
    const targetReferencesByInstancePathByNormalizedPath: TargetReferencesByInstancePathByNormalizedPath =
      this.targetReferencesByInstancePathByNormalizedPathByTargetTypeId.get(
        targetReference.typeId,
      ) ?? (new Map() as TargetReferencesByInstancePathByNormalizedPath);

    const targetReferencesByInstancePath: TargetReferencesByInstancePath =
      targetReferencesByInstancePathByNormalizedPath.get(
        targetReference.normalizedPath,
      ) ?? (new Map() as TargetReferencesByInstancePath);

    targetReferencesByInstancePath.set(
      targetReference.instancePath,
      targetReference,
    );
    targetReferencesByInstancePathByNormalizedPath.set(
      targetReference.normalizedPath,
      targetReferencesByInstancePath,
    );
    this.targetReferencesByInstancePathByNormalizedPathByTargetTypeId.set(
      targetReference.typeId,
      targetReferencesByInstancePathByNormalizedPath,
    );
  }

  getTargetReferenceListByTypeIdAndNormalizedPath({
    typeId,
    normalizedPath,
  }: Omit<
    UnknownNormalizedTargetReference,
    'instance' | 'instancePath'
  >): UnknownNormalizedTargetReference[] {
    const targetReferencesByInstancePathByNormalizedPath: TargetReferencesByInstancePathByNormalizedPath =
      this.targetReferencesByInstancePathByNormalizedPathByTargetTypeId.get(
        typeId,
      ) ?? (new Map() as TargetReferencesByInstancePathByNormalizedPath);

    const targetReferencesByInstancePath: TargetReferencesByInstancePath =
      targetReferencesByInstancePathByNormalizedPath.get(normalizedPath) ??
      (new Map() as TargetReferencesByInstancePath);

    const list: UnknownNormalizedTargetReference[] = [
      ...targetReferencesByInstancePath.values(),
    ];
    return list;
  }
}
