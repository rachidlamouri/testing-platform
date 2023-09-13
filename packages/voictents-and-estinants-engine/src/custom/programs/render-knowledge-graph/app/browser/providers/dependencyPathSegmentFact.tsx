import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { useSelectedIdContext } from '../selectedIdContext';
import { FileDependencyPathSegmentFactProps } from '../factProps';

export const DependencyPathSegmentFact: FunctionComponent<
  FileDependencyPathSegmentFactProps
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
