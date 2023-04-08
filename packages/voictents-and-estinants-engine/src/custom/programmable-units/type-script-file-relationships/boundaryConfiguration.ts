// import * as uuid from 'uuid';
// import { Grition } from '../../adapter/grition';
// import { OdeshinFromGrition } from '../../adapter/odeshin';
// import { Voictent } from '../../adapter/voictent';

// export type InternalBoundaryConfiguration = {
//   isInternal: true;
//   instanceId: string;
//   directoryPath: string;
// };

// export type ExternalBoundaryConfiguration = {
//   isInternal: false;
//   instanceId: string;
// };

// export type BoundaryConfiguration =
//   | InternalBoundaryConfiguration
//   | ExternalBoundaryConfiguration;

// export type BoundaryConfigurationGrition = Grition<BoundaryConfiguration>;

// export type BoundaryConfigurationOdeshin =
//   OdeshinFromGrition<BoundaryConfigurationGrition>;

// export const BOUNDARY_CONFIGURATION_GEPP = 'boundary-configuration';

// export type BoundaryConfigurationGepp = typeof BOUNDARY_CONFIGURATION_GEPP;

// export type BoundaryConfigurationVoictent = Voictent<
//   BoundaryConfigurationGepp,
//   BoundaryConfigurationOdeshin
// >;

// export const createInternalBoundaryConfigurationTuple = (
//   boundaryDirectoryPathList: string[],
// ): BoundaryConfigurationOdeshin[] => {
//   return boundaryDirectoryPathList.map((directoryPath) => {
//     return {
//       zorn: directoryPath,
//       grition: {
//         isInternal: true,
//         instanceId: uuid.v4(),
//         directoryPath,
//       },
//     };
//   });
// };

// export const createExternalBoundaryConfiguration =
//   (): BoundaryConfigurationOdeshin => {
//     const instanceId = uuid.v4();

//     return {
//       zorn: instanceId,
//       grition: {
//         isInternal: false,
//         instanceId: uuid.v4(),
//       },
//     };
//   };
