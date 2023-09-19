import React, { useEffect, useState } from 'react';
import { useGeneratedMetadata } from '../generatedMetadataContext';
import { LeftPanelEdge } from './leftPanelEdge';
import { Navigation } from './navigation';
import { MetadataDisplay } from './metadataDisplay';
import { useSelectedIdContext } from '../selectedIdContext';

export type LeftPanelProps = {
  selectedIndex: number;
  onIndexSelected: (index: number) => void;
};

const MIN_WIDTH = 100;
const MAX_WIDTH = 800;

export const LeftPanel: React.FunctionComponent<LeftPanelProps> = ({
  selectedIndex,
  onIndexSelected,
}) => {
  const { componentMetadataList } = useGeneratedMetadata();
  const { onSelectBoundaryId } = useSelectedIdContext();
  const [panelWidth, setPanelWidth] = useState(400);

  useEffect(() => {
    if (componentMetadataList !== null) {
      onSelectBoundaryId(componentMetadataList[0].boundaryId);
    }
  }, [componentMetadataList]);

  if (componentMetadataList === null) {
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
        <Navigation
          selectedIndex={selectedIndex}
          onIndexSelected={(index, boundaryId): void => {
            onIndexSelected(index);
            onSelectBoundaryId(boundaryId);
          }}
          panelWidth={panelWidth}
        />
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
