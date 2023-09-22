import React, { FunctionComponent, useEffect } from 'react';
import { useGeneratedMetadata } from '../generatedMetadataContext';
import { useSelectedIdContext } from '../selectedIdContext';
import { THEME } from '../theme';

export type NavigationProps = {
  panelWidth: number;
};

export const Navigation: FunctionComponent<NavigationProps> = ({
  panelWidth,
}) => {
  const { generatedIndex } = useGeneratedMetadata();

  const { selectedBoundaryId, onSelectBoundaryId } = useSelectedIdContext();

  useEffect(() => {
    if (generatedIndex !== null) {
      onSelectBoundaryId(
        generatedIndex.navigationList[0].partitionList[0].boundaryId,
      );
    }
  }, [generatedIndex]);

  if (generatedIndex === null) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
        margin: '0px',
        height: '100%',
        width: panelWidth,
      }}
    >
      {(generatedIndex.navigationList ?? []).map((layer, layerIndex) => {
        return (
          <div
            key={layerIndex}
            style={{
              marginBottom: '4px',
            }}
          >
            <h2
              key={`layer/${layerIndex}/${layer.label}`}
              style={{
                margin: 0,
                marginBottom: '4px',
                fontSize: '20px',
              }}
            >
              {layer.label}
            </h2>
            {layer.partitionList.map((partition, partitionIndex) => {
              const isSelected = partition.boundaryId === selectedBoundaryId;

              return (
                <button
                  key={`partition/${partitionIndex}/${partition.label}`}
                  style={{
                    backgroundColor: isSelected
                      ? THEME.boundary.selected
                      : undefined,
                    color: isSelected
                      ? THEME.partition.selectedForeground
                      : THEME.colors.edgelord,
                    marginBottom: '8px',
                    outline: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                  onClick={(): void => {
                    onSelectBoundaryId(partition.boundaryId);
                  }}
                >
                  {partition.label}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
