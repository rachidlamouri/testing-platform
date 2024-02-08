import React, { useState } from 'react';
import { useSelection } from './contexts/selectionContext';
import { ProgramMetadata } from './generatedDataTypes';
import { THEME } from './theme';

type NavigationButtonProps = {
  programMetadata: ProgramMetadata;
};

/**
 * These buttons are used to change the program model that is displayed in the
 * app
 */
export const NavigationButton: React.FunctionComponent<
  NavigationButtonProps
> = ({ programMetadata }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { programName } = programMetadata;
  const { selectedProgramName, onSelectProgram } = useSelection();

  const isSelected = selectedProgramName === programName;

  let backgroundColor: string;
  let color: string;
  if (isHovered) {
    color = THEME.colors.edgelord;
    backgroundColor = THEME.navigation.hovered;
  } else if (isSelected) {
    color = THEME.colors.staleGunpowder;
    backgroundColor = THEME.navigation.selected;
  } else {
    color = THEME.colors.edgelord;
    backgroundColor = undefined;
  }

  return (
    <button
      style={{
        textAlign: 'left',
        color,
        backgroundColor,
      }}
      key={programName}
      onClick={(): void => {
        onSelectProgram(programName);
      }}
      onMouseEnter={(): void => {
        setIsHovered(true);
      }}
      onMouseLeave={(): void => {
        setIsHovered(false);
      }}
    >
      {programName}
    </button>
  );
};
