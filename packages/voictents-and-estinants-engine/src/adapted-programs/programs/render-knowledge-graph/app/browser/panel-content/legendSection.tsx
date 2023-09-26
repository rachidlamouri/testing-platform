import React from 'react';
import { PanelSection } from '../left-panel/panelSection';
import { SectionTitle } from '../left-panel/sectionTitle';
import { Stack } from '../stack';
import { MetadataField } from './metadata/metadataField';

export const LegendSection: React.FunctionComponent = () => {
  return (
    <PanelSection
      title={<SectionTitle>Legend</SectionTitle>}
      isInitiallyVisible={false}
    >
      <Stack
        style={{
          flexDirection: 'column',
        }}
      >
        <MetadataField
          field={{
            label: 'Repository Directory Shorthand',
            value: '~r',
          }}
        />
        <MetadataField
          field={{
            label: 'Common Boundary Root Directory Shorthand',
            value: '~c',
          }}
        />
        <MetadataField
          field={{
            label: 'Boundary Directory Shorthand',
            value: '~b',
          }}
        />
      </Stack>
    </PanelSection>
  );
};
