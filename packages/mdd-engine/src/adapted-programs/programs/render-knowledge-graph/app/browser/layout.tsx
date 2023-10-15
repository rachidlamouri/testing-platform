import React from 'react';
import { THEME } from './theme';
import { LeftPanel, LeftPanelProps } from './left-panel/leftPanel';

type LayoutProps = {
  headingContent: React.ReactElement;
  leftPanelContent: LeftPanelProps['children'];
  mainContent: React.ReactElement;
};

/**
 * The top level layout component for the app. It is only concerned with
 * positioning content.
 */
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
