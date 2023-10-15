import React from 'react';
import { Metadata } from '../../dynamicComponentTypes';
import { CopyFileSystemPathButton } from '../../copyFileSystemPathButton';
import { Stack, StackSpacer } from '../../stack';

type MetadataHeaderProps = {
  metadata: Metadata | null;
};

/**
 * The presentation component for the title of a metadata section.
 */
export const MetadataHeader: React.FunctionComponent<MetadataHeaderProps> = ({
  metadata,
}) => {
  const title = metadata?.title ?? 'No Selection';

  return (
    <Stack>
      <h4 style={{ margin: 0 }}>{title}</h4>
      {metadata !== null && (
        <>
          <StackSpacer />
          <CopyFileSystemPathButton fileSystemPath={metadata.fileSystemPath} />
        </>
      )}
    </Stack>
  );
};
