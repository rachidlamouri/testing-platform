import React, { useEffect } from 'react';
import { Layout } from '../../render-knowledge-graph/app/browser/layout';

/**
 * The Program Modeler React application
 */
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
          Program Models
        </h1>
      }
      leftPanelContent={'Left Panel'}
      mainContent={<>Main Content</>}
    />
  );
};
