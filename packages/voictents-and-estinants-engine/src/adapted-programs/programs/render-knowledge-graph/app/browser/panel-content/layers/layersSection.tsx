import React, { useEffect } from 'react';
import { useGeneratedMetadata } from '../../generatedMetadataContext';
import { PanelSection } from '../../left-panel/panelSection';
import { SectionTitle, SubsectionTitle } from '../../left-panel/sectionTitle';
import { useSelectedIdContext } from '../../selectedIdContext';
import { Stack } from '../../stack';
import { PartitionNavigationButton } from './partitionNavigationButton';

export const LayersSection: React.FunctionComponent = () => {
  const { generatedIndex } = useGeneratedMetadata();

  const navigationList = generatedIndex?.navigationList ?? [];
  const { onSelectBoundaryId } = useSelectedIdContext();

  useEffect(() => {
    if (generatedIndex !== null) {
      onSelectBoundaryId(
        generatedIndex.navigationList[0].partitionList[0].boundaryId,
      );
    }
  }, [generatedIndex]);

  return (
    <PanelSection
      title={<SectionTitle>Layers</SectionTitle>}
      isInitiallyVisible={true}
    >
      {navigationList.map((layer, layerIndex) => {
        return (
          <PanelSection
            key={layer.label}
            title={<SubsectionTitle>{layer.label}</SubsectionTitle>}
            isInitiallyVisible={layerIndex === 0}
          >
            <Stack
              style={{
                flexDirection: 'column',
                alignItems: 'left',
              }}
            >
              {layer.partitionList.map((partition) => {
                return (
                  <PartitionNavigationButton
                    key={partition.label}
                    partition={partition}
                  />
                );
              })}
            </Stack>
          </PanelSection>
        );
      })}
    </PanelSection>
  );
};
