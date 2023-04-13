import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  TSV_FILE_GEPP,
  TsvFile,
  TsvFileVoictent,
} from '../type-script-file/tsvFile';
import {
  Edge,
  Location,
  MAP_METADATA_GEPP,
  MapMetadataVoictent,
} from './mapMetadata';
import { SUBWAY_MAP_ZORN } from './zorn';

export const parseTsvFile = buildEstinant({
  name: 'parseTsvFile',
})
  .fromOdeshinVoictent<TsvFileVoictent>({
    gepp: TSV_FILE_GEPP,
  })
  .toHubblepup<MapMetadataVoictent>({
    gepp: MAP_METADATA_GEPP,
  })
  .onPinbe((tsvFileList) => {
    const locationFile = tsvFileList.find(
      (file) =>
        file.filePath ===
        'packages/voictents-and-estinants-engine/src/custom/programmable-units/minecraft/locations.tsv',
    ) as TsvFile;

    const edgeFile = tsvFileList.find(
      (file) =>
        file.filePath ===
        'packages/voictents-and-estinants-engine/src/custom/programmable-units/minecraft/edges.tsv',
    ) as TsvFile;

    const locationContents = fs.readFileSync(locationFile.filePath, 'utf8');
    const edgeContents = fs.readFileSync(edgeFile.filePath, 'utf8');

    const locationLineList = locationContents
      .split('\r\n')
      .map((line) => line.split('\t'));

    const edgeLineList = edgeContents
      .split('\r\n')
      .map((line) => line.split('\t'));

    // skip the headers
    const locationRowList = locationLineList.slice(1);
    const edgeRowList = edgeLineList.slice(1);

    const locationList = locationRowList.map<Location>((row) => {
      const id = parseInt(row[0], 10);
      const name = row[1];
      const east = parseInt(row[2], 10);
      const south = parseInt(row[4], 10);

      return {
        id,
        name,
        east,
        south,
      };
    });

    const locationById = new Map<number, Location>(
      locationList.map((location) => [location.id, location]),
    );

    const edgeList = edgeRowList.map<Edge>((row) => {
      const firstId = parseInt(row[0], 10);
      const secondId = parseInt(row[1], 10);

      const firstLocation = locationById.get(firstId) as Location;
      const secondLocation = locationById.get(secondId) as Location;

      return [firstLocation, secondLocation];
    });

    return {
      zorn: SUBWAY_MAP_ZORN,
      grition: {
        locationList,
        edgeList,
      },
    };
  })
  .assemble();
