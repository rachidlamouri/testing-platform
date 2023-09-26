import React, { useEffect } from 'react';
import { GeneratedMetadataProvider } from './generatedMetadataContext';
import { SelectedIdProvider } from './selectedIdContext';
import { ActiveContent } from './wrappers/activeContent';
import { Layout } from './layout';
import { LayersSection } from './panel-content/layers/layersSection';
import { SectionSeparator } from './left-panel/sectionSeparator';
import { FileMetadataSection } from './panel-content/metadata/fileMetadataSection';

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
              <LayersSection />
              <SectionSeparator />
              <FileMetadataSection />
            </>
          }
          mainContent={<ActiveContent />}
        />
      </SelectedIdProvider>
    </GeneratedMetadataProvider>
  );
};
