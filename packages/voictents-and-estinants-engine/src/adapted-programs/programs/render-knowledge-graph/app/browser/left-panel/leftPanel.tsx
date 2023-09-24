import React, { useState } from 'react';
import { LeftPanelEdge } from './leftPanelEdge';
import { EDGE_WIDTH } from './constants';

const MIN_WIDTH = 100;
const MAX_WIDTH = 800;

export type LeftPanelProps = React.PropsWithChildren;

export const LeftPanel: React.FunctionComponent<LeftPanelProps> = ({
  children,
}) => {
  const [panelWidth, setPanelWidth] = useState(400);

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
          width: panelWidth - EDGE_WIDTH,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
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
