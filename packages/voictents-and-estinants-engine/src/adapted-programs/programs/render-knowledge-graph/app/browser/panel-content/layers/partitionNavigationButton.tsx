import React, { useState } from 'react';
import { NavigationPartition } from '../../dynamicComponentTypes';
import { useSelectedIdContext } from '../../selectedIdContext';
import { THEME } from '../../theme';

export type PartitionNavigationButtonProps = {
  partition: NavigationPartition;
};

export const PartitionNavigationButton: React.FunctionComponent<
  PartitionNavigationButtonProps
> = ({ partition }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { selectedBoundaryId, onSelectBoundaryId } = useSelectedIdContext();
  const isSelected = partition.boundaryId === selectedBoundaryId;

  let backgroundColor: string | undefined;
  let color: string;
  if (isHovered) {
    color = THEME.colors.edgelord;
    backgroundColor = THEME.colors.lightBlurple;
  } else if (isSelected) {
    color = THEME.partition.selectedForeground;
    backgroundColor = THEME.boundary.selected;
  } else {
    color = THEME.colors.edgelord;
    backgroundColor = undefined;
  }

  return (
    <button
      key={partition.label}
      style={{
        backgroundColor,
        color,
        outline: 'none',
        cursor: 'pointer',
        textAlign: 'left',
      }}
      onClick={(): void => {
        onSelectBoundaryId(partition.boundaryId);
      }}
      onMouseEnter={(): void => {
        setIsHovered(true);
      }}
      onMouseLeave={(): void => {
        setIsHovered(false);
      }}
    >
      {partition.label}
    </button>
  );
};
