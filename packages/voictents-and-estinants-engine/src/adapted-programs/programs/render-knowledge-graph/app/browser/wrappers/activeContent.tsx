import React, { useCallback } from 'react';
import svgPanZoom from 'svg-pan-zoom';
import { useGeneratedMetadata } from '../generatedMetadataContext';
import { useSelectedIdContext } from '../selectedIdContext';

export const ActiveContent: React.FunctionComponent = () => {
  const svgReference = useCallback((svg: SVGSVGElement) => {
    if (svg !== null) {
      svgPanZoom(svg, {
        minZoom: 0.3,
        maxZoom: 15,
        zoomScaleSensitivity: 0.2,
      });
    }
  }, []);
  const { generatedIndex } = useGeneratedMetadata();
  const { selectedBoundaryId } = useSelectedIdContext();

  if (generatedIndex === null || selectedBoundaryId === null) {
    return null;
  }

  const { Component } =
    generatedIndex.partitionByBoundaryId.get(selectedBoundaryId);

  if (!Component) {
    return null;
  }

  return <Component ref={svgReference} />;
};
