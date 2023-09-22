import React, { useState } from 'react';
import { useGeneratedMetadata } from '../generatedMetadataContext';
import { LeftPanelEdge } from './leftPanelEdge';
import { Navigation } from './navigation';
import { MetadataDisplay } from './metadataDisplay';

const MIN_WIDTH = 100;
const MAX_WIDTH = 800;

export const LeftPanel: React.FunctionComponent = () => {
  const { generatedIndex } = useGeneratedMetadata();
  const [panelWidth, setPanelWidth] = useState(400);

  if (generatedIndex === null) {
    return null;
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navigation panelWidth={panelWidth} />
        <hr style={{ width: '95%' }} />
        <MetadataDisplay panelWidth={panelWidth} />
      </div>
      <LeftPanelEdge
        onSizeChange={(delta): void => {
          let nextWidth = panelWidth + delta;
          nextWidth = Math.max(MIN_WIDTH, nextWidth);
          nextWidth = Math.min(nextWidth, MAX_WIDTH);

          setPanelWidth(nextWidth);
        }}
      />
    </div>
  );
};
