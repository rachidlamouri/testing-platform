import React, { FunctionComponent } from 'react';
import { THEME } from '../theme';

export const SectionSeparator: FunctionComponent = () => {
  const padding = '8px';

  return (
    <hr
      style={{
        paddingLeft: padding,
        paddingRight: padding,
        borderWidth: '1px',
        borderColor: THEME.colors.edgelord,
        margin: 0,
      }}
    />
  );
};
