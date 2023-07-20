import React from 'react';

type FileProps = {
  children: React.ReactElement | React.ReactElement[];
  id: string;
};

export const File: React.FunctionComponent<FileProps> = ({ children, id }) => {
  console.log({ id });
  return <>{children}</>;
};
