import * as uuid from 'uuid';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type BoundaryConfiguration = {
  instanceId: string;
  directoryPath: string;
};

export type BoundaryConfigurationGrition = Grition<BoundaryConfiguration>;

export type BoundaryConfigurationOdeshin =
  OdeshinFromGrition<BoundaryConfigurationGrition>;

export const BOUNDARY_CONFIGURATION_GEPP = 'boundary-configuration';

export type BoundaryConfigurationGepp = typeof BOUNDARY_CONFIGURATION_GEPP;

export type BoundaryConfigurationVoictent = Voictent<
  BoundaryConfigurationGepp,
  BoundaryConfigurationOdeshin
>;

export const createBoundaryConfigurationTuple = (
  boundaryDirectoryPathList: string[],
): BoundaryConfigurationVoictent['hubblepupTuple'] => {
  return boundaryDirectoryPathList.map((directoryPath) => {
    return {
      zorn: directoryPath,
      grition: {
        instanceId: uuid.v4(),
        directoryPath,
      },
    };
  });
};
