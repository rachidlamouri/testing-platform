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
  let strokeWidth: string;
  if (selectedId === pathHeadId) {
    color = 'tomato';
    strokeWidth = '2';
  } else if (hasSelectedTail) {
    color = '#660033';
    strokeWidth = '2';
  } else {
    color = 'black';
    strokeWidth = '.5';
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
            strokeWidth,
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
