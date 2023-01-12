import { UnknownTargetPath } from '../types/targetPath';
import {
  UnknownTargetReference,
  UnknownTargetReferenceSet,
} from '../types/targetReference';
import { UnknownTargetTypeId } from '../types/typedTarget';
import { CustomMap } from '../utils/customMap';
import { CustomSet } from '../utils/customSet';

export type TargetReferenceSetsByTargetPath = Map<
  UnknownTargetPath,
  UnknownTargetReferenceSet
>;

export type TargetReferenceSetsByTargetPathByTargetTypeId = Map<
  UnknownTargetTypeId,
  TargetReferenceSetsByTargetPath
>;

export class TargetReferenceMap extends CustomMap<TargetReferenceSetsByTargetPathByTargetTypeId> {
  setTargetReference(targetReference: UnknownTargetReference): void {
    const targetReferenceSetsByTargetPath: TargetReferenceSetsByTargetPath =
      this.get(targetReference.typeId) ??
      (new Map() as TargetReferenceSetsByTargetPath);

    const targetReferenceSet: UnknownTargetReferenceSet =
      targetReferenceSetsByTargetPath.get(targetReference.path) ??
      new CustomSet();

    targetReferenceSet.add(targetReference);
    targetReferenceSetsByTargetPath.set(
      targetReference.path,
      targetReferenceSet,
    );
    this.set(targetReference.typeId, targetReferenceSetsByTargetPath);
  }

  getTargetReferenceSetByTargetTypeIdAndTargetPath({
    targetTypeId,
    targetPath,
  }: {
    targetTypeId: UnknownTargetTypeId;
    targetPath: UnknownTargetPath;
  }): UnknownTargetReferenceSet {
    const targetReferenceSetsByTargetPath: TargetReferenceSetsByTargetPath =
      this.get(targetTypeId) ?? (new Map() as TargetReferenceSetsByTargetPath);

    const targetReferenceSet: UnknownTargetReferenceSet =
      targetReferenceSetsByTargetPath.get(targetPath) ?? new CustomSet();

    return targetReferenceSet;
  }
}
