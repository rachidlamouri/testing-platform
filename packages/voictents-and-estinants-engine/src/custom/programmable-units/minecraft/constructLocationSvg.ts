import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  SVG_DOCUMENT_GEPP,
  SvgDocumentVoictent,
} from '../graph-visualization/svgDocument';
import { MAP_METADATA_GEPP, MapMetadataVoictent } from './mapMetadata';

const RADIUS = 5;

export const constructLocationSvg = buildEstinant({
  name: 'constructLocationSvg',
})
  .fromGrition<MapMetadataVoictent>({
    gepp: MAP_METADATA_GEPP,
  })
  .toGrition<SvgDocumentVoictent>({
    gepp: SVG_DOCUMENT_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((mapMetadata) => {
    const circleList = mapMetadata.locationList.flatMap((location) => {
      return [
        `<circle cx="${location.east}" cy="${location.south}" r="${RADIUS}" stroke="#333" stroke-width=".2" fill="green"/>`,
        `<text x="${location.east + 1.5 * RADIUS}" y="${location.south}">${
          location.name
        }</text>`,
      ];
    });

    const lineList = mapMetadata.edgeList.map((edge) => {
      return `<line x1="${edge[0].east}" y1="${edge[0].south}" x2="${edge[1].east}" y2="${edge[1].south}" stroke="#333" stroke-width="2" />`;
    });

    const svgDocument = [
      '  <svg width="100%" height="100%">',
      [...lineList, ...circleList].map((line) => `    ${line}`),
      '  </svg>',
    ].join('\n');

    return svgDocument;
  })
  .assemble();
