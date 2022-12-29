import { UnknownTargetPath } from '../types/targetPath';
import { UnknownNormalizedTargetReference } from '../types/targetReference';
import { UnknownTargetTypeId } from '../types/typedTarget';

export type InformationByInstancePath<TInformation> = Map<
  UnknownTargetPath,
  TInformation
>;

export type InformationByInstancePathByNormalizedPath<TInformation> = Map<
  UnknownTargetPath,
  InformationByInstancePath<TInformation>
>;

export type InformationByInstancePathByNormalizedPathByTargetTypeId<
  TInformation,
> = Map<
  UnknownTargetTypeId,
  InformationByInstancePathByNormalizedPath<TInformation>
>;

export type TargetInformationMapInformationSetterInput<TInformation> = {
  targetReference: UnknownNormalizedTargetReference;
  information: TInformation;
};

export class TargetInformationMap<TInformation> {
  private informationByInstancePathByNormalizedPathByTargetTypeId: InformationByInstancePathByNormalizedPathByTargetTypeId<TInformation> =
    new Map();

  setInformation({
    targetReference,
    information,
  }: TargetInformationMapInformationSetterInput<TInformation>): void {
    const informationByInstancePathByNormalizedPath: InformationByInstancePathByNormalizedPath<TInformation> =
      this.informationByInstancePathByNormalizedPathByTargetTypeId.get(
        targetReference.typeId,
      ) ??
      (new Map() as InformationByInstancePathByNormalizedPath<TInformation>);

    const informationByInstancePath: InformationByInstancePath<TInformation> =
      informationByInstancePathByNormalizedPath.get(
        targetReference.normalizedPath,
      ) ?? (new Map() as InformationByInstancePath<TInformation>);

    informationByInstancePath.set(targetReference.instancePath, information);
    informationByInstancePathByNormalizedPath.set(
      targetReference.normalizedPath,
      informationByInstancePath,
    );
    this.informationByInstancePathByNormalizedPathByTargetTypeId.set(
      targetReference.typeId,
      informationByInstancePathByNormalizedPath,
    );
  }

  getInformationListByTypeIdAndNormalizedPath({
    typeId,
    normalizedPath,
  }: Pick<
    UnknownNormalizedTargetReference,
    'typeId' | 'normalizedPath'
  >): TInformation[] {
    const informationByInstancePathByNormalizedPath: InformationByInstancePathByNormalizedPath<TInformation> =
      this.informationByInstancePathByNormalizedPathByTargetTypeId.get(
        typeId,
      ) ??
      (new Map() as InformationByInstancePathByNormalizedPath<TInformation>);

    const informationByInstancePath: InformationByInstancePath<TInformation> =
      informationByInstancePathByNormalizedPath.get(normalizedPath) ??
      (new Map() as InformationByInstancePath<TInformation>);

    const list: TInformation[] = [...informationByInstancePath.values()];
    return list;
  }

  // getInformation({
  //   typeId,
  //   instancePath,
  //   normalizedPath,
  // }: Omit<UnknownNormalizedTargetReference, 'instance'>): TInformation | null {
  //   const informationByInstancePathByNormalizedPath: InformationByInstancePathByNormalizedPath<TInformation> =
  //     this.informationByInstancePathByNormalizedPathByTargetTypeId.get(
  //       typeId,
  //     ) ??
  //     (new Map() as InformationByInstancePathByNormalizedPath<TInformation>);

  //   const informationByInstancePath: InformationByInstancePath<TInformation> =
  //     informationByInstancePathByNormalizedPath.get(normalizedPath) ??
  //     (new Map() as InformationByInstancePath<TInformation>);

  //   const information: TInformation | null =
  //     informationByInstancePath.get(instancePath) ?? null;

  //   return information;
  // }
}
