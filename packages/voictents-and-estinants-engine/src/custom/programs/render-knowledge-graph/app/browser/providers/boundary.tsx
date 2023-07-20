import React from 'react';

type BoundaryProps = {
  children: React.ReactElement[];
  id: string;
};

export const Boundary: React.FunctionComponent<BoundaryProps> = ({
  children,
  id,
}) => {
  console.log({ id });
  return <>{children}</>;
};
