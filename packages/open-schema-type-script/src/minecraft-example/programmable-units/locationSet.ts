// import { Grition } from '../../custom-adapter/grition';
// import { Odeshin } from '../../custom-adapter/odeshin';
// import { Plifal } from '../../custom-adapter/plifal';
// import { buildOnamaHamletive } from '../../type-script-adapter/hamletive/onama';
// import { File } from '../../utilities/file/file';
// import { FileExtensionSuffixIdentifier } from '../../utilities/file/fileExtensionSuffixIdentifier';
// import { TsvFileBPlifal, TSV_FILE_B_GEPP } from './tsvFileB';

// type InputCoordinates = {
//   x: number;
//   y: unknown;
//   z: number;
// };

// type Location = {
//   name: string;
//   inputCoordinates: InputCoordinates;
//   namedInputCoordinates: {
//     east: number;
//     south: number;
//   };
//   normalizedDirectionCoordinates: {
//     east: number;
//     north: number;
//   };
//   normalizedCoordinates: {
//     east: number;
//     north: number;
//   };
//   canvasCoordinates: {
//     left: number;
//     top: number;
//   };
//   scaledCanvasCoordinates: {
//     left: number;
//     top: number;
//   };
// };
// const parseCoordinate = (text: string): number => {
//   const coordinate = Number.parseInt(text, 10);

//   if (Number.isNaN(coordinate)) {
//     throw Error(`Unparseable coordinate "${text}"`);
//   }

//   return coordinate;
// };

// export type LocationSet = Grition<
//   File<
//     FileExtensionSuffixIdentifier.TabSeparatedValues,
//     {
//       locationTuple: Location[];
//       canvasSize: {
//         width: number;
//         height: number;
//       };
//       scaledCanvasSize: {
//         width: number;
//         height: number;
//       };
//     }
//   >
// >;

// export type LocationSetIdentifier = `location-set:${string}`;

// export type LocationSetOdeshin = Odeshin<LocationSetIdentifier, LocationSet>;

// export const LOCATION_SET_GEPP = Symbol('location-set');

// export type LocationSetGepp = typeof LOCATION_SET_GEPP;

// export type LocationSetPlifal = Plifal<[LocationSetGepp], LocationSetOdeshin>;

// export type LocationSetPlifalTuple = readonly LocationSetPlifal[];

// export const locationSetEstinant = buildOnamaHamletive<
//   TsvFileBPlifal,
//   LocationSetPlifal
// >({
//   inputGepp: TSV_FILE_B_GEPP,
//   ankel: function createLocationSet(input: TsvFileBPlifal) {
//     const locationTuple =
//       input.hubblepup.grition.additionalMetadata.parsedContents.map<Location>(
//         (row) => {
//           const x = parseCoordinate(row.X);
//           const z = parseCoordinate(row.Z);
//           const east = x;
//           const south = z;
//           const north = -south;

//           const location: Location = {
//             name: row.Location,
//             inputCoordinates: {
//               x,
//               y: row.Y,
//               z,
//             },
//             namedInputCoordinates: {
//               east,
//               south,
//             },
//             normalizedDirectionCoordinates: {
//               east,
//               north,
//             },
//             normalizedCoordinates: {
//               east: NaN,
//               north: NaN,
//             },
//             canvasCoordinates: {
//               left: NaN,
//               top: NaN,
//             },
//             scaledCanvasCoordinates: {
//               left: NaN,
//               top: NaN,
//             },
//           };

//           return location;
//         },
//       );

//     const allEast = locationTuple.map(
//       (location) => location.normalizedDirectionCoordinates.east,
//     );
//     const allNorth = locationTuple.map(
//       (location) => location.normalizedDirectionCoordinates.north,
//     );

//     const minEast = Math.min(...allEast);
//     const maxEast = Math.max(...allEast);
//     const minNorth = Math.min(...allNorth);
//     const maxNorth = Math.max(...allNorth);

//     const eastWestRange = Math.abs(maxEast - minEast);
//     const northSouthRange = Math.abs(maxNorth - minNorth);

//     console.log(minEast, maxEast, eastWestRange);
//     console.log(minNorth, maxNorth, northSouthRange);

//     const scale = 0.5;

//     locationTuple.forEach((location) => {
//       // eslint-disable-next-line no-param-reassign
//       location.normalizedCoordinates = {
//         east: location.normalizedDirectionCoordinates.east - minEast,
//         north: location.normalizedDirectionCoordinates.north - minNorth,
//       };

//       // eslint-disable-next-line no-param-reassign
//       location.canvasCoordinates = {
//         left: location.normalizedCoordinates.east,
//         top: northSouthRange - location.normalizedCoordinates.north,
//       };

//       // eslint-disable-next-line no-param-reassign
//       location.scaledCanvasCoordinates = {
//         left: location.canvasCoordinates.left * scale,
//         top: location.canvasCoordinates.top * scale,
//       };
//     });

//     const canvasSize = {
//       width: eastWestRange,
//       height: northSouthRange,
//     };

//     const scaledCanvasSize = {
//       width: canvasSize.width * scale,
//       height: canvasSize.height * scale,
//     };

//     const output: LocationSetPlifal = {
//       geppTuple: [LOCATION_SET_GEPP],
//       hubblepup: {
//         identifier: `location-set:${input.hubblepup.grition.filePath}`,
//         grition: {
//           ...input.hubblepup.grition,
//           additionalMetadata: {
//             locationTuple,
//             canvasSize,
//             scaledCanvasSize,
//           },
//         },
//       },
//     };

//     return output;
//   },
// });

import { Grition } from '../../custom-adapter/grition';
import { Odeshin } from '../../custom-adapter/odeshin';
import { Plifal } from '../../custom-adapter/plifal';
import { buildOnamaHamletive } from '../../type-script-adapter/hamletive/onama';
import { File } from '../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../utilities/file/fileExtensionSuffixIdentifier';
import { TsvFileBPlifal, TSV_FILE_B_GEPP } from './tsvFileB';

type InputCoordinates = {
  x: number;
  y: unknown;
  z: number;
};

type Location = {
  name: string;
  inputCoordinates: InputCoordinates;
  namedInputCoordinates: {
    east: number;
    south: number;
  };
  adjustedCoordinates: {
    east: number;
    south: number;
  };
  // scaledCanvasCoordinates: {
  //   left: number;
  //   top: number;
  // };
};
const parseCoordinate = (text: string): number => {
  const coordinate = Number.parseInt(text, 10);

  console.log(text)

  if (Number.isNaN(coordinate)) {
    throw Error(`Unparseable coordinate "${text}"`);
  }

  return coordinate;
};

type LocationSet = {
  locationTuple: Location[];
  // canvasSize: {
  //   width: number;
  //   height: number;
  // };
  // scaledCanvasSize: {
  //   width: number;
  //   height: number;
  // };
};

export type LocationSetGrition = Grition<LocationSet>;

export type LocationSetIdentifier = `location-set:${string}`;

export type LocationSetOdeshin = Odeshin<
  LocationSetIdentifier,
  LocationSetGrition
>;

export const LOCATION_SET_GEPP = Symbol('location-set');

export type LocationSetGepp = typeof LOCATION_SET_GEPP;

export type LocationSetPlifal = Plifal<[LocationSetGepp], LocationSetOdeshin>;

export type LocationSetPlifalTuple = readonly LocationSetPlifal[];

export const locationSetEstinant = buildOnamaHamletive<
  TsvFileBPlifal,
  LocationSetPlifal
>({
  inputGepp: TSV_FILE_B_GEPP,
  ankel: function createLocationSet(input: TsvFileBPlifal) {
    const locationTuple =
      input.hubblepup.grition.additionalMetadata.parsedContents.map<Location>(
        (row) => {
          const x = parseCoordinate(row.X);
          const z = parseCoordinate(row.Z);
          const east = x;
          const south = z;
          // const north = -south;

          const location: Location = {
            name: row.Location,
            inputCoordinates: {
              x,
              y: row.Y,
              z,
            },
            namedInputCoordinates: {
              east,
              south,
            },
            adjustedCoordinates: {
              east: NaN,
              south: NaN,
            },
            // normalizedDirectionCoordinates: {
            //   east,
            //   north,
            // },
            // normalizedCoordinates: {
            //   east: NaN,
            //   north: NaN,
            // },
            // canvasCoordinates: {
            //   left: NaN,
            //   top: NaN,
            // },
            // scaledCanvasCoordinates: {
            //   left: NaN,
            //   top: NaN,
            // },
          };

          return location;
        },
      );

    const allEast = locationTuple.map(
      (location) => location.namedInputCoordinates.east,
    );
    const allSouth = locationTuple.map(
      (location) => location.namedInputCoordinates.south,
    );

    const minEast = Math.min(...allEast);
    const maxEast = Math.max(...allEast);
    const minSouth = Math.min(...allSouth);
    const maxSouth = Math.max(...allSouth);

    const eastWestRange = Math.abs(maxEast - minEast);
    const southNorthRange = Math.abs(maxSouth - minSouth);

    console.log('East', minEast, maxEast, eastWestRange);
    console.log('South', minSouth, maxSouth, southNorthRange);

    const scale = 0.5;

    const buffer = 100;

    locationTuple.forEach((location) => {
      // eslint-disable-next-line no-param-reassign
      location.adjustedCoordinates = {
        east: location.namedInputCoordinates.east - minEast + buffer,
        south: location.namedInputCoordinates.south - minSouth + buffer,
      };

      // eslint-disable-next-line no-param-reassign
      // location.normalizedCoordinates = {
      //   east: location.normalizedDirectionCoordinates.east - minEast,
      //   north: location.normalizedDirectionCoordinates.north - minSouth,
      // };

      // // eslint-disable-next-line no-param-reassign
      // location.canvasCoordinates = {
      //   left: location.normalizedCoordinates.east,
      //   top: southNorthRange - location.normalizedCoordinates.north,
      // };

      // // eslint-disable-next-line no-param-reassign
      // location.scaledCanvasCoordinates = {
      //   left: location.canvasCoordinates.left * scale,
      //   top: location.canvasCoordinates.top * scale,
      // };
    });

    const allAdjustedEast = locationTuple.map(
      (location) => location.adjustedCoordinates.east,
    );
    const allAdjustedSouth = locationTuple.map(
      (location) => location.adjustedCoordinates.south,
    );

    console.log(
      'Adj East',
      Math.min(...allAdjustedEast),
      Math.max(...allAdjustedEast),
    );
    console.log(
      'Adj South',
      Math.min(...allAdjustedSouth),
      Math.max(...allAdjustedSouth),
    );

    // const canvasSize = {
    //   width: eastWestRange,
    //   height: southNorthRange,
    // };

    // const scaledCanvasSize = {
    //   width: canvasSize.width * scale,
    //   height: canvasSize.height * scale,
    // };

    const output: LocationSetPlifal = {
      geppTuple: [LOCATION_SET_GEPP],
      hubblepup: {
        identifier: `location-set:${input.hubblepup.grition.filePath}`,
        grition: {
          locationTuple,
        },
      },
    };

    return output;
  },
});
