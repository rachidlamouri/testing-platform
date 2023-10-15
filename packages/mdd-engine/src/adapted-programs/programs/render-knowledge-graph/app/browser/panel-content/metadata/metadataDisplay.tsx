import React, { FunctionComponent } from 'react';
import { Metadata } from '../../dynamicComponentTypes';
import { MetadataFieldDisplay } from './metadataFieldDisplay';
import { Stack, StackGap } from '../../stack';
import { MetadataHeader } from './metadataHeader';

type MetadataDisplayProps = {
  metadata: Metadata | null;
};

/**
 * A standard presentation component for metadata. That is, information composed
 * of multiple label / value fields.
 */
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
        return <MetadataFieldDisplay key={field.label} field={field} />;
      })}
    </Stack>
  );
};
