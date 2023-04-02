import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';

export enum CustomGraphElementTypName {
  Root = 'Root',
  Boundary = 'Boundary',
  BoundarySegment = 'BoundarySegment',
  SegmentProxy = 'SegmentProxy',
  Module = 'Module',
}

// export type CustomRootElement = {
//   typeName: CustomGraphElementTypName.Root;
// };

// export type CustomBoundaryElement = {
//   typeName: CustomGraphElementTypName.Boundary;
//   elementPath: string;
// };

// export type CustomBoundarySegmentElement = {
//   typeName: CustomGraphElementTypName.BoundarySegment;
//   directoryPath: string;
// };

// export type CustomSegmentProxyElement = {
//   typeName: CustomGraphElementTypName.SegmentProxy;
// };

// export type CustomFileElement = {
//   typeName: CustomGraphElementTypName.File;
//   filePath: string;
//   fileName: string;
// };

export type CustomGraphElement = {
  typeName: CustomGraphElementTypName;
  metadata: any;
};

export type CustomGraphElementGrition = Grition<CustomGraphElement>;

export type CustomGraphElementOdeshin =
  OdeshinFromGrition<CustomGraphElementGrition>;

export const CUSTOM_GRAPH_ELEMENT_GEPP = 'custom-graph-element';

export type CustomGraphElementGepp = typeof CUSTOM_GRAPH_ELEMENT_GEPP;

export type CustomGraphElementVoictent = Voictent<
  CustomGraphElementGepp,
  CustomGraphElementOdeshin
>;
