import React from 'react';
import { useSelectedIdContext } from '../../selectedIdContext';
import { useGeneratedMetadata } from '../../generatedMetadataContext';
import { PanelSection } from '../../left-panel/panelSection';
import { SectionTitle, SubsectionTitle } from '../../left-panel/sectionTitle';
import { MetadataDisplay } from './metadataDisplay';
import { SubsectionSeparator } from '../../left-panel/subsectionSeparator';

/**
 * The content component for the selected boundary, common boundary root, and
 * selected related boundary (if there is one) found in the left panel
 */
export const BoundaryMetadataSection: React.FunctionComponent = () => {
  const { metadataById } = useGeneratedMetadata();
  const { selectedBoundaryId, secondaryBoundaryId } = useSelectedIdContext();

  const primaryBoundaryMetadata = metadataById?.[selectedBoundaryId] ?? null;
  const secondaryBoundaryMetadata =
    secondaryBoundaryId !== selectedBoundaryId
      ? metadataById?.[secondaryBoundaryId] ?? null
      : null;

  // TODO: indexing this with a hardcoded key is a terrible idea. Store this object elsewhere
  const commonBoundaryRootMetadata =
    metadataById['common-boundary-root'] ?? null;

  return (
    <PanelSection
      title={<SectionTitle>Boundary Metadata</SectionTitle>}
      isInitiallyVisible={true}
    >
      <PanelSection
        title={<SubsectionTitle>Selected Partition</SubsectionTitle>}
        isInitiallyVisible={true}
      >
        <MetadataDisplay metadata={primaryBoundaryMetadata} />
      </PanelSection>
      <SubsectionSeparator />
      <PanelSection
        title={<SubsectionTitle>Related Partition</SubsectionTitle>}
        isInitiallyVisible={false}
      >
        <MetadataDisplay metadata={secondaryBoundaryMetadata} />
      </PanelSection>
      <SubsectionSeparator />
      <PanelSection
        title={<SubsectionTitle>Common Boundary Root</SubsectionTitle>}
        isInitiallyVisible={false}
      >
        <MetadataDisplay metadata={commonBoundaryRootMetadata} />
      </PanelSection>
    </PanelSection>
  );
};
