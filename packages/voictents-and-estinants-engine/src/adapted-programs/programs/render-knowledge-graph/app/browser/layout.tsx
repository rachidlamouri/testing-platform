import React from 'react';
import { THEME } from './theme';
import { LeftPanel } from './left-panel/leftPanel';

export type LayoutProps = {
  headingContent: React.ReactElement;
  leftPanelContent: React.ReactElement;
  mainContent: React.ReactElement;
};

export const Layout: React.FunctionComponent<LayoutProps> = ({
  headingContent,
  leftPanelContent,
  mainContent,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          borderBottom: `2px solid ${THEME.colors.edgelord}`,
          padding: '8px',
        }}
      >
        {headingContent}
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        <LeftPanel>{leftPanelContent}</LeftPanel>
        <div
          style={{
            flexGrow: '1',
            height: '100%',
          }}
        >
          {mainContent}
        </div>
      </div>
    </div>
  );
};
