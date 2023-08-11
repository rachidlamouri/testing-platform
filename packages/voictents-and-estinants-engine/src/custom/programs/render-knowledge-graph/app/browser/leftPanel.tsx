import React from 'react';
import { useGeneratedMetadata } from './useGeneratedMetadata';

export type LeftPanelProps = {
  selectedIndex: number;
  onIndexSelected: (index: number) => void;
};

export const LeftPanel: React.FunctionComponent<LeftPanelProps> = ({
  selectedIndex,
  onIndexSelected,
}) => {
  const { componentMetadataList } = useGeneratedMetadata();

  if (componentMetadataList === null) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid black',
        padding: '8px',
        margin: '0px',
      }}
    >
      {componentMetadataList.map(({ label }, index) => {
        return (
          <button
            key={label}
            style={{
              backgroundColor: index === selectedIndex ? '5e97ff' : undefined,
              marginBottom: '8px',
              outline: 'none',
            }}
            onClick={(): void => {
              onIndexSelected(index);
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
