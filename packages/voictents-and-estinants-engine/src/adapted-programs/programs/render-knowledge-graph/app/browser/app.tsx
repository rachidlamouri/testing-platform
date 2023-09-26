import React, { useEffect } from 'react';
import { GeneratedMetadataProvider } from './generatedMetadataContext';
import { SelectedIdProvider } from './selectedIdContext';
import { ActiveContent } from './wrappers/activeContent';
import { Layout } from './layout';
import { LayersSection } from './panel-content/layers/layersSection';
import { SectionSeparator } from './left-panel/sectionSeparator';
import { FileMetadataSection } from './panel-content/metadata/fileMetadataSection';
import { BoundaryMetadataSection } from './panel-content/metadata/boundaryMetadataSection';
import { StackSpacer } from './stack';
import { LegendSection } from './panel-content/legendSection';

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
              <BoundaryMetadataSection />
              <SectionSeparator />
              <FileMetadataSection />
              <SectionSeparator />
              <StackSpacer />
              <LegendSection />
            </>
          }
          mainContent={<ActiveContent />}
        />
      </SelectedIdProvider>
    </GeneratedMetadataProvider>
  );
};
