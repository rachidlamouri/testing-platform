import React, { FunctionComponent, useState } from 'react';
import { PresentationContext } from '../presentationContext';
import { useSelectedIdContext } from '../selectedIdContext';
import { FileDependencyPathNodeFactProps } from '../factProps';
import { THEME } from '../theme';

/**
 * Represents a single node of a dependency group. It becomes highlighted when
 * the associated dependency group is highlighted. It can also be selected to
 * highlight the imported file node.
 */
export const FileDependencyPathNodeFact: FunctionComponent<
  FileDependencyPathNodeFactProps
> = ({ children, pathHeadId, pathTailIdSet }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { onToggleOrSelectId, selectedId } = useSelectedIdContext();

  let edgeStroke: string;
  const centerFill = THEME.file.deselected;
  if (isHovered) {
    edgeStroke = THEME.file.selected;
  } else if (selectedId === pathHeadId) {
    edgeStroke = THEME.file.importsSelectedFile;
  } else if (pathTailIdSet.has(selectedId)) {
    edgeStroke = THEME.file.importedBySelectedFile;
  } else {
    edgeStroke = THEME.file.deselected;
  }

  return (
    <PresentationContext.Provider
      value={{
        onTextClicked: (): void => {
          onToggleOrSelectId(pathHeadId);
        },
        onTextHoverChange: (isTextHovered): void => {
          setIsHovered(isTextHovered);
        },
        hasInteractiveText: true,
        styleByElement: {
          text: {
            stroke: 'transparent',
            fill: 'transparent',
          },
          ellipse: {
            stroke: edgeStroke,
            fill: centerFill,
          },
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
