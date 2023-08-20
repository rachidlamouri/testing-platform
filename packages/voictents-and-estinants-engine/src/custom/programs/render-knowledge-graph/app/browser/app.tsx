import React, { useCallback, useEffect, useState } from 'react';
import svgPanZoom from 'svg-pan-zoom';
import { useGeneratedMetadata } from './generatedMetadataContext';
import { LeftPanel } from './left-panel/leftPanel';
import { SelectedIdProvider } from './selectedIdContext';

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

  useEffect(() => {
    document.body.style.fontFamily = 'Helvetica';
  });

  if (componentMetadataList === null) {
    return null;
  }

  const { Component } = componentMetadataList[selectedIndex];

  return (
    <SelectedIdProvider>
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        <LeftPanel
          selectedIndex={selectedIndex}
          onIndexSelected={setSelectedIndex}
        />
        <div
          style={{
            flexGrow: '1',
            height: '100%',
          }}
        >
          {/* TODO: move provider responsibility to knowledge graph concept components */}
          <Component ref={svgReference} />
        </div>
      </div>
    </SelectedIdProvider>
  );
};
