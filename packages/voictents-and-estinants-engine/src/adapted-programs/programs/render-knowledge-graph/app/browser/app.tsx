import React, { useEffect } from 'react';
import { GeneratedMetadataProvider } from './generatedMetadataContext';
import { SelectedIdProvider } from './selectedIdContext';
import { ActiveContent } from './wrappers/activeContent';
import { Layout } from './layout';
import { Navigation } from './left-panel/navigation';
import { MetadataDisplay } from './left-panel/metadataDisplay';

export const App: React.FC = () => {
  useEffect(() => {
    document.body.style.fontFamily = 'Helvetica';
  });

  return (
    <GeneratedMetadataProvider>
      <SelectedIdProvider>
        <Layout
          headingContent={
            <h1
              style={{
                fontSize: '28px',
                margin: '0px',
              }}
            >
              Knowledge Graph
            </h1>
          }
          leftPanelContent={
            <>
              <Navigation />
              <hr style={{ width: '95%' }} />
              <MetadataDisplay />
            </>
          }
          mainContent={<ActiveContent />}
        />
      </SelectedIdProvider>
    </GeneratedMetadataProvider>
  );
};
