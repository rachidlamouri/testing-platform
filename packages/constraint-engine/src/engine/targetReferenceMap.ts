import { UnknownTargetPath } from '../types/targetPath';
import { UnknownNormalizedTargetReference } from '../types/targetReference';
import { UnknownTargetTypeId } from '../types/typedTarget';

export type NormalizedTargetReferencesByInstancePath = Map<
  UnknownTargetPath,
  UnknownNormalizedTargetReference
>;

export type NormalizedTargetReferencesByInstancePathByNormalizedPath = Map<
  UnknownTargetPath,
  NormalizedTargetReferencesByInstancePath
>;

export type NormalizedTargetReferencesByInstancePathByNormalizedPathByTargetTypeId =
  Map<
    UnknownTargetTypeId,
    NormalizedTargetReferencesByInstancePathByNormalizedPath
  >;

export class NormalizedTargetReferenceMap {
  private normalizedTargetReferencesByInstancePathByNormalizedPathByTargetTypeId: NormalizedTargetReferencesByInstancePathByNormalizedPathByTargetTypeId =
    new Map();

  setNormalizedReference(
    targetReference: UnknownNormalizedTargetReference,
  ): void {
    const normalizedTargetReferencesByInstancePathByNormalizedPath: NormalizedTargetReferencesByInstancePathByNormalizedPath =
      this.normalizedTargetReferencesByInstancePathByNormalizedPathByTargetTypeId.get(
        targetReference.typeId,
      ) ??
      (new Map() as NormalizedTargetReferencesByInstancePathByNormalizedPath);

    const normalizedTargetReferencesByInstancePath: NormalizedTargetReferencesByInstancePath =
      normalizedTargetReferencesByInstancePathByNormalizedPath.get(
        targetReference.normalizedPath,
      ) ?? (new Map() as NormalizedTargetReferencesByInstancePath);

    normalizedTargetReferencesByInstancePath.set(
      targetReference.instancePath,
      targetReference,
    );
    normalizedTargetReferencesByInstancePathByNormalizedPath.set(
      targetReference.normalizedPath,
      normalizedTargetReferencesByInstancePath,
    );
    this.normalizedTargetReferencesByInstancePathByNormalizedPathByTargetTypeId.set(
      targetReference.typeId,
      normalizedTargetReferencesByInstancePathByNormalizedPath,
    );
  }

  getNormalizedTargetReferenceListByTypeIdAndNormalizedPath({
    typeId,
    normalizedPath,
  }: Omit<
    UnknownNormalizedTargetReference,
    'instance' | 'instancePath'
  >): UnknownNormalizedTargetReference[] {
    const normalizedTargetReferencesByInstancePathByNormalizedPath: NormalizedTargetReferencesByInstancePathByNormalizedPath =
      this.normalizedTargetReferencesByInstancePathByNormalizedPathByTargetTypeId.get(
        typeId,
      ) ??
      (new Map() as NormalizedTargetReferencesByInstancePathByNormalizedPath);

    const normalizedTargetReferencesByInstancePath: NormalizedTargetReferencesByInstancePath =
      normalizedTargetReferencesByInstancePathByNormalizedPath.get(
        normalizedPath,
      ) ?? (new Map() as NormalizedTargetReferencesByInstancePath);

    const list: UnknownNormalizedTargetReference[] = [
      ...normalizedTargetReferencesByInstancePath.values(),
    ];
    return list;
  }
}
