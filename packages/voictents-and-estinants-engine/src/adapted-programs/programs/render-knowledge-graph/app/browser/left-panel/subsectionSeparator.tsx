import React, { FunctionComponent } from 'react';
import { THEME } from '../theme';

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
