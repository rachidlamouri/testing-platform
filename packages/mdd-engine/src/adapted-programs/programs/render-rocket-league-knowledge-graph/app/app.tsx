import React, { useEffect } from 'react';
import { Layout } from '../../render-knowledge-graph/app/browser/layout';

export const App: React.FC = () => {
  useEffect(() => {
    document.body.style.fontFamily = 'Helvetica';
  });

  return (
    <Layout
      headingContent={
        <h1
          style={{
            fontSize: '28px',
            margin: '0px',
          }}
        >
          Rocket League
        </h1>
      }
      leftPanelContent={<div></div>}
      mainContent={<div></div>}
    />
  );
};
