import React, { FunctionComponent, PropsWithChildren } from 'react';
import { PresentationContext } from '../presentationContext';
import { useSelectedIdContext } from '../selectedIdContext';

export type DependencyPathSegmentFactProps = PropsWithChildren<{
  factId: string;
  headId: string;
  tailId: string;
  pathHeadId: string;
  pathTailIdSet: Set<string>;
}>;

export const DependencyPathSegmentFact: FunctionComponent<
  DependencyPathSegmentFactProps
> = ({ children, pathHeadId, pathTailIdSet }) => {
  const { selectedId } = useSelectedIdContext();
  const hasSelectedTail = pathTailIdSet.has(selectedId);

  let color: string;
  if (selectedId === pathHeadId) {
    color = 'blue';
  } else if (hasSelectedTail) {
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
