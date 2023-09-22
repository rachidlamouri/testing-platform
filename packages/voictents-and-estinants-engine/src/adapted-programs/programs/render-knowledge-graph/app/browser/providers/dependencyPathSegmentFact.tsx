import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { useSelectedIdContext } from '../selectedIdContext';
import { FileDependencyPathSegmentFactProps } from '../factProps';
import { THEME } from '../theme';

export const DependencyPathSegmentFact: FunctionComponent<
  FileDependencyPathSegmentFactProps
> = ({ children, pathHeadId, pathTailIdSet }) => {
  const { selectedId } = useSelectedIdContext();
  const hasSelectedTail = pathTailIdSet.has(selectedId);

  let color: string;
  let strokeWidth: string;
  if (selectedId === pathHeadId) {
    color = THEME.file.importsSelectedFile;
    strokeWidth = '2';
  } else if (hasSelectedTail) {
    color = THEME.file.importedBySelectedFile;
    strokeWidth = '2';
  } else {
    color = THEME.file.deselected;
    strokeWidth = '.7';
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
            stroke: THEME.file.deselected,
          },
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
