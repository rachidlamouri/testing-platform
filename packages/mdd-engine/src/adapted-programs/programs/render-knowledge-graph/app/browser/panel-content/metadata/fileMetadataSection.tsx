import React from 'react';
import { useSelectedIdContext } from '../../selectedIdContext';
import { useGeneratedMetadata } from '../../generatedMetadataContext';
import { PanelSection } from '../../left-panel/panelSection';
import { SectionTitle } from '../../left-panel/sectionTitle';
import { MetadataDisplay } from './metadataDisplay';

/**
 * The content component for the metadata of the currently selected file node.
 * It is rendered in the left panel.
 */
export const FileMetadataSection: React.FunctionComponent = () => {
  const { metadataById } = useGeneratedMetadata();
  const { selectedId } = useSelectedIdContext();
  const selectedMetadata = metadataById?.[selectedId] ?? null;

  return (
    <PanelSection
      title={<SectionTitle>File Metadata</SectionTitle>}
      isInitiallyVisible={true}
    >
      <MetadataDisplay metadata={selectedMetadata} />
    </PanelSection>
  );
};
