import React, { FunctionComponent, useEffect } from 'react';
import { useGeneratedMetadata } from '../generatedMetadataContext';
import { useSelectedIdContext } from '../selectedIdContext';

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
              return (
                <button
                  key={`partition/${partitionIndex}/${partition.label}`}
                  style={{
                    backgroundColor:
                      partition.boundaryId === selectedBoundaryId
                        ? '5e97ff'
                        : undefined,
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
