import React from 'react';
import { MetadataDisplay } from './metadata/metadataDisplay';
import { PanelSection } from '../left-panel/panelSection';
import { SectionTitle } from '../left-panel/sectionTitle';

export const FileMetadataSection: React.FunctionComponent = () => {
  return (
    <PanelSection
      title={<SectionTitle>File Metadata</SectionTitle>}
      isInitiallyVisible={true}
    >
      <MetadataDisplay />
    </PanelSection>
  );
};
