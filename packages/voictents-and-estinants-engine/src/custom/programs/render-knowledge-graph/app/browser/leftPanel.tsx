import React, { useState } from 'react';
import { useGeneratedMetadata } from './useGeneratedMetadata';
import { LeftPanelEdge } from './leftPanelEdge';

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
  const [panelWidth, setPanelWidth] = useState(400);

  if (componentMetadataList === null) {
    return null;
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '8px',
          margin: '0px',
          height: '100%',
          width: panelWidth,
        }}
      >
        {componentMetadataList.map(({ label }, index) => {
          return (
            <button
              key={label}
              style={{
                backgroundColor: index === selectedIndex ? '5e97ff' : undefined,
                marginBottom: '8px',
                outline: 'none',
                cursor: 'pointer',
              }}
              onClick={(): void => {
                onIndexSelected(index);
              }}
            >
              {label}
            </button>
          );
        })}
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
