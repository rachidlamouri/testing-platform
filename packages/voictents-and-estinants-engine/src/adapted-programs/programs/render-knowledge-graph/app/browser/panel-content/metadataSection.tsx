import React from 'react';
import { MetadataDisplay } from '../left-panel/metadataDisplay';
import { PanelSection } from '../left-panel/panelSection';
import { SectionTitle } from '../left-panel/sectionTitle';

export const MetadataSection: React.FunctionComponent = () => {
  return (
    <PanelSection
      title={<SectionTitle>Metadata</SectionTitle>}
      isInitiallyVisible={true}
    >
      <MetadataDisplay />
    </PanelSection>
  );
};
