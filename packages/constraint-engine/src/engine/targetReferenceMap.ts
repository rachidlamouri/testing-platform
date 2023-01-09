import { UnknownTargetPath } from '../types/targetPath';
import {
  UnknownTargetReference,
  UnknownTargetReferenceSet,
} from '../types/targetReference';
import { UnknownTargetTypeId } from '../types/typedTarget';
import { CustomSet } from '../utils/customSet';

export type TargetReferenceSetsByTargetPath = Map<
  UnknownTargetPath,
  UnknownTargetReferenceSet
>;

export type TargetReferenceSetsByTargetPathByTargetTypeId = Map<
  UnknownTargetTypeId,
  TargetReferenceSetsByTargetPath
>;

export class TargetReferenceMap {
  private targetReferenceSetsByTargetPathByTargetTypeId: TargetReferenceSetsByTargetPathByTargetTypeId =
    new Map();

  setTargetReference(targetReference: UnknownTargetReference): void {
    const targetReferenceSetsByTargetPath: TargetReferenceSetsByTargetPath =
      this.targetReferenceSetsByTargetPathByTargetTypeId.get(
        targetReference.typeId,
      ) ?? (new Map() as TargetReferenceSetsByTargetPath);

    const targetReferenceSet: UnknownTargetReferenceSet =
      targetReferenceSetsByTargetPath.get(targetReference.path) ??
      new CustomSet();

    targetReferenceSet.add(targetReference);
    targetReferenceSetsByTargetPath.set(
      targetReference.path,
      targetReferenceSet,
    );
    this.targetReferenceSetsByTargetPathByTargetTypeId.set(
      targetReference.typeId,
      targetReferenceSetsByTargetPath,
    );
  }

  getTargetReferenceSetByTargetTypeIdAndTargetPath({
    targetTypeId,
    targetPath,
  }: {
    targetTypeId: UnknownTargetTypeId;
    targetPath: UnknownTargetPath;
  }): UnknownTargetReferenceSet {
    const targetReferenceSetsByTargetPath: TargetReferenceSetsByTargetPath =
      this.targetReferenceSetsByTargetPathByTargetTypeId.get(targetTypeId) ??
      (new Map() as TargetReferenceSetsByTargetPath);

    const targetReferenceSet: UnknownTargetReferenceSet =
      targetReferenceSetsByTargetPath.get(targetPath) ?? new CustomSet();

    return targetReferenceSet;
  }
}
