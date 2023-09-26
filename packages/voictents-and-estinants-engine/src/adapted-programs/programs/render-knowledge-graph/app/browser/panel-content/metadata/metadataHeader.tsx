import React from 'react';
import { Metadata } from '../../dynamicComponentTypes';
import { CopyFileSystemPathButton } from '../../copyFileSystemPathButton';
import { Stack, StackSpacer } from '../../stack';

type MetadataHeaderProps = {
  metadata: Metadata | null;
};

export const MetadataHeader: React.FunctionComponent<MetadataHeaderProps> = ({
  metadata,
}) => {
  const title = metadata?.title ?? 'No Selection';

  return (
    <Stack>
      <h3 style={{ margin: 0 }}>{title}</h3>
      {metadata !== null && (
        <>
          <StackSpacer />
          <CopyFileSystemPathButton fileSystemPath={metadata.fileSystemPath} />
        </>
      )}
    </Stack>
  );
};
