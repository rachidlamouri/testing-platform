import React from 'react';
import { MetadataField as MetadataFieldObject } from '../../dynamicComponentTypes';
import { Stack, StackGap } from '../../stack';

type MetadataFieldProps = {
  field: MetadataFieldObject;
};

export const MetadataField: React.FunctionComponent<MetadataFieldProps> = ({
  field,
}) => {
  return (
    <Stack
      gap={StackGap.Small}
      style={{
        flexDirection: 'column',
      }}
    >
      <h5 style={{ margin: 0 }}>
        <b>{field.label}</b>
      </h5>
      <p style={{ margin: 0 }}>{field.value}</p>
    </Stack>
  );
};
