import React, { useCallback } from 'react';
import svgPanZoom from 'svg-pan-zoom';
import { useGeneratedData } from './contexts/generatedDataContext';
import { useSelection } from './contexts/selectionContext';

/**
 * The main section of the program model app. It loads the svg for the selected
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

  const { programList } = useGeneratedData();
  const { selectedProgramName } = useSelection();

  if (selectedProgramName === null) {
    return null;
  }

  const programMetadata = programList.find(
    (metadata) => metadata.programName === selectedProgramName,
  );

  if (programMetadata === undefined) {
    throw Error('whoopsies');
  }

  const { Component } = programMetadata;

  return <Component ref={svgReference} />;
};
