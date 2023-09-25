import React from 'react';

type SectionTitleProps = {
  children: string;
};

export const SectionTitle: React.FunctionComponent<SectionTitleProps> = ({
  children: title,
}) => {
  return (
    <h2
      style={{
        margin: 0,
      }}
    >
      {title}
    </h2>
  );
};

export const SubsectionTitle: React.FunctionComponent<SectionTitleProps> = ({
  children: title,
}) => {
  return (
    <h3
      style={{
        margin: 0,
      }}
    >
      {title}
    </h3>
  );
};
