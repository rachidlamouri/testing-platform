import React, { FunctionComponent, PropsWithChildren } from 'react';
import { PresentationContext } from '../presentationContext';
import { useSelectedIdContext } from '../selectedIdContext';

export type DependencyPathSegmentFactProps = PropsWithChildren<{
  factId: string;
  headId: string;
  tailId: string;
}>;

export const DependencyPathSegmentFact: FunctionComponent<
  DependencyPathSegmentFactProps
> = ({ children, headId, tailId }) => {
  const { selectedId } = useSelectedIdContext();

  let color: string;
  if (selectedId === headId) {
    color = 'blue';
  } else if (selectedId === tailId) {
    color = 'purple';
  } else {
    color = 'black';
  }

  return (
    <PresentationContext.Provider
      value={{
        onTextClicked: (): void => {},
        hasInteractiveText: false,
        styleByElement: {
          // edge
          path: {
            stroke: color,
          },
          // arrowhead
          polygon: {
            fill: color,
            stroke: 'gray',
          },
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
