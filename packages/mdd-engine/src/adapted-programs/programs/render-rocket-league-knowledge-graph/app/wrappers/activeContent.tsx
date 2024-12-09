import React, { useCallback } from 'react';
import svgPanZoom from 'svg-pan-zoom';
import { Main } from '../generated/graph';

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

  return <Main ref={svgReference} />;
};
