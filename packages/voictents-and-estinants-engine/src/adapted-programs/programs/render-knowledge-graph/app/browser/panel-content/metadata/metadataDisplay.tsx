import React, { FunctionComponent } from 'react';
import { Metadata } from '../../dynamicComponentTypes';
import { MetadataField } from './metadataField';
import { Stack, StackGap } from '../../stack';
import { MetadataHeader } from './metadataHeader';

export type MetadataDisplayProps = {
  metadata: Metadata | null;
};

export const MetadataDisplay: FunctionComponent<MetadataDisplayProps> = ({
  metadata,
}) => {
  const fieldList = metadata?.fieldList ?? [];

  return (
    <Stack
      style={{
        flexDirection: 'column',
      }}
      gap={StackGap.Large}
    >
      <MetadataHeader metadata={metadata} />
      {fieldList.map((field) => {
        return <MetadataField key={field.label} field={field} />;
      })}
    </Stack>
  );
};