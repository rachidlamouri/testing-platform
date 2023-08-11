import React, { useCallback, useState } from 'react';
import svgPanZoom from 'svg-pan-zoom';
import { useGeneratedMetadata } from './useGeneratedMetadata';
import { LeftPanel } from './leftPanel';

export const App: React.FC = () => {
  const svgReference = useCallback((svg: SVGSVGElement) => {
    if (svg !== null) {
      svgPanZoom(svg, {
        minZoom: 0.3,
        maxZoom: 15,
        zoomScaleSensitivity: 0.2,
      });
    }
  }, []);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { componentMetadataList } = useGeneratedMetadata();

  if (componentMetadataList === null) {
    return null;
  }

  const { Component } = componentMetadataList[selectedIndex];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '400px auto',
      }}
    >
      <LeftPanel
        selectedIndex={selectedIndex}
        onIndexSelected={setSelectedIndex}
      />
      <div>
        <Component ref={svgReference} />
      </div>
    </div>
  );
};
