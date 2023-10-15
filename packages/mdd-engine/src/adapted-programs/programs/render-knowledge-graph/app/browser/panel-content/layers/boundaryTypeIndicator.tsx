import React from 'react';
import { BoundaryTypeName } from '../../../../boundary/boundaryTypeName';
import { THEME } from '../../theme';

type IndicatorConfiguration = {
  text: string;
  color: string;
};

const indicatorConfigurationByTypeName: Record<
  Exclude<BoundaryTypeName, BoundaryTypeName.Unspecified>,
  IndicatorConfiguration
> = {
  [BoundaryTypeName.AdaptedProgram]: {
    text: 'AP',
    color: THEME.colors.grass,
  },
  [BoundaryTypeName.Engine]: {
    text: 'E',
    color: THEME.colors.tomahto,
  },
  [BoundaryTypeName.ProgrammableUnit]: {
    text: 'PU',
    color: THEME.colors.plum,
  },
  [BoundaryTypeName.TestProgram]: {
    text: 'TP',
    color: THEME.colors.edgelord,
  },
  [BoundaryTypeName.Utility]: {
    text: 'U',
    color: THEME.colors.gymboreeBlue,
  },
};

type BoundaryTypeIndicatorProps = {
  typeName: BoundaryTypeName;
};

/**
 * A one to two letter annotation on a partition button that indicates the type
 * of the boundary of the corresponding partition.
 */
export const BoundaryTypeIndicator: React.FunctionComponent<
  BoundaryTypeIndicatorProps
> = ({ typeName }) => {
  if (typeName === BoundaryTypeName.Unspecified) {
    return null;
  }

  const { text, color } = indicatorConfigurationByTypeName[typeName];

  return (
    <p
      style={{
        fontSize: '12px',
        color,
        margin: '0px',
      }}
    >
      {text}
    </p>
  );
};
