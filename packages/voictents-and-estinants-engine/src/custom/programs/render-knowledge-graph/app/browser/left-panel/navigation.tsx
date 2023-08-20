import React, { FunctionComponent } from 'react';
import { useGeneratedMetadata } from '../useGeneratedMetadata';

export type NavigationProps = {
  panelWidth: number;
  selectedIndex: number;
  onIndexSelected: (index: number) => void;
};

export const Navigation: FunctionComponent<NavigationProps> = ({
  panelWidth,
  selectedIndex,
  onIndexSelected,
}) => {
  const { componentMetadataList } = useGeneratedMetadata();

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
      {(componentMetadataList ?? []).map(({ label }, index) => {
        return (
          <button
            key={label}
            style={{
              backgroundColor: index === selectedIndex ? '5e97ff' : undefined,
              marginBottom: '8px',
              outline: 'none',
              cursor: 'pointer',
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
