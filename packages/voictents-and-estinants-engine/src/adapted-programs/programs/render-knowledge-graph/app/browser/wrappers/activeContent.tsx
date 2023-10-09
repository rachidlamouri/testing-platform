import React, { useCallback } from 'react';
import svgPanZoom from 'svg-pan-zoom';
import { useGeneratedMetadata } from '../generatedMetadataContext';
import { useSelectedIdContext } from '../selectedIdContext';

/**
 * The main section of the knowledge graph. It loads the svg for the selected
 * partition. It also wraps the svg with svg-pan-zoom to enable panning and
 * zooming.
 */
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
