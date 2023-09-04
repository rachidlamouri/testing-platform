import React, { useCallback } from 'react';
import svgPanZoom from 'svg-pan-zoom';
import { useGeneratedMetadata } from '../generatedMetadataContext';

export const ActiveContent: React.FunctionComponent<{
  selectedIndex: number;
}> = ({ selectedIndex }) => {
  const svgReference = useCallback((svg: SVGSVGElement) => {
    if (svg !== null) {
      svgPanZoom(svg, {
        minZoom: 0.3,
        maxZoom: 15,
        zoomScaleSensitivity: 0.2,
      });
    }
  }, []);
  const { componentMetadataList } = useGeneratedMetadata();

  if (componentMetadataList === null) {
    return null;
  }

  const selectedComponentMetadata = (componentMetadataList ?? [])[
    selectedIndex
  ];

  const Component = selectedComponentMetadata?.Component;

  if (!Component) {
    return null;
  }

  return <Component ref={svgReference} />;
};
