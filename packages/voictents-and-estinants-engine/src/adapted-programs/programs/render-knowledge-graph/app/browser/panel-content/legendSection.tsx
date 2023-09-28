import React from 'react';
import { PanelSection } from '../left-panel/panelSection';
import { SectionTitle, SubsectionTitle } from '../left-panel/sectionTitle';
import { MetadataField as MetadataFieldDisplay } from './metadata/metadataField';
import { BoundaryTypeName } from '../../../boundary/boundaryTypeName';
import { MetadataField } from '../dynamicComponentTypes';
import { SubsectionSeparator } from '../left-panel/subsectionSeparator';

const boundaryTypeIndicatorFieldByBoundaryType: Record<
  Exclude<BoundaryTypeName, BoundaryTypeName.Unspecified>,
  MetadataField
> = {
  [BoundaryTypeName.AdaptedProgram]: {
    label: 'Adapted Program Indicator',
    value: 'AP',
  },
  [BoundaryTypeName.Engine]: {
    label: 'Engine Indicator',
    value: 'E',
  },
  [BoundaryTypeName.ProgrammableUnit]: {
    label: 'Programmable Unit Indicator',
    value: 'PU',
  },
  [BoundaryTypeName.TestProgram]: {
    label: 'Test Program Indicator',
    value: 'TP',
  },
  [BoundaryTypeName.Utility]: {
    label: 'Utility Indicator',
    value: 'U',
  },
};

export const LegendSection: React.FunctionComponent = () => {
  return (
    <PanelSection
      title={<SectionTitle>Legend</SectionTitle>}
      isInitiallyVisible={false}
    >
      <PanelSection
        title={<SubsectionTitle>Boundary Indicators</SubsectionTitle>}
        isInitiallyVisible={false}
      >
        {...Object.values(boundaryTypeIndicatorFieldByBoundaryType).map(
          (field) => {
            return <MetadataFieldDisplay field={field} />;
          },
        )}
      </PanelSection>
      <SubsectionSeparator />
      <PanelSection
        title={<SubsectionTitle>Directory Shorthand</SubsectionTitle>}
        isInitiallyVisible={false}
      >
        <MetadataFieldDisplay
          field={{
            label: 'Repository Directory Shorthand',
            value: '~r',
          }}
        />
        <MetadataFieldDisplay
          field={{
            label: 'Common Boundary Root Directory Shorthand',
            value: '~c',
          }}
        />
        <MetadataFieldDisplay
          field={{
            label: 'Boundary Directory Shorthand',
            value: '~b',
          }}
        />
      </PanelSection>
    </PanelSection>
  );
};
