import React, { useEffect } from 'react';
import { Layout } from '../../render-knowledge-graph/app/browser/layout';
import { ActiveContent } from './wrappers/activeContent';
import { THEME } from './theme';
import { DataDisplay } from './dataDisplay';

export const App: React.FC = () => {
  useEffect(() => {
    document.body.style.backgroundColor = THEME.page.background;
  });

  return (
    <Layout
      headingContent={
        <h1
          style={{
            fontSize: '28px',
            margin: '0px',
            color: THEME.page.text,
          }}
        >
          Rocket League Skills
        </h1>
      }
      leftPanelContent={<DataDisplay />}
      mainContent={<ActiveContent />}
    />
  );
};
