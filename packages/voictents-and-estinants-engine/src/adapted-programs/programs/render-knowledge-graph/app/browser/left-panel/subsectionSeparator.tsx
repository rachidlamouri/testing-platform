import React, { FunctionComponent } from 'react';
import { THEME } from '../theme';

/**
 * Style component for the standard separator between subsections
 */
export const SubsectionSeparator: FunctionComponent = () => {
  const padding = '16px';

  return (
    <hr
      style={{
        paddingLeft: padding,
        paddingRight: padding,
        borderWidth: '.5px',
        borderColor: THEME.colors.staleGunpowder,
        margin: 0,
      }}
    />
  );
};
