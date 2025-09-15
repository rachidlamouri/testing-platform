import React, { FunctionComponent } from 'react';
import { THEME } from '../theme';
import { RenderablePartProps } from '../modelPartProps';
import { useSelection } from '../contexts/selectionContext';
import {
  PresentationContext,
  StyleByElement,
} from '../../../render-knowledge-graph/app/browser/presentationContext';

/**
 * A graph element in a program model
 */
export const RenderablePart: FunctionComponent<RenderablePartProps> = ({
  partId,
  proxyId = partId,
  upstreamIdSet,
  downstreamIdSet,
  children,
  isProxyNode,
  isEdge,
  info,
}) => {
  const { selectedPartId, onSelectPart } = useSelection();

  const isSelected = selectedPartId === proxyId;

  const isUpstreamSelected = upstreamIdSet.has(selectedPartId);
  const isDownstreamSelected = downstreamIdSet.has(selectedPartId);

  let styleByElement: StyleByElement = {};
  let strokeColor: string;
  let strokeWidth: string;
  if (isEdge) {
    let fillColor: string;

    if (isSelected) {
      strokeColor = THEME.selection;
      fillColor = THEME.selection;
      strokeWidth = '1';
    } else if (isUpstreamSelected) {
      strokeColor = THEME.downstreamOfSelection;
      fillColor = THEME.downstreamOfSelection;
      strokeWidth = '0.8';
    } else if (isDownstreamSelected) {
      strokeColor = THEME.upstreamOfSelection;
      fillColor = THEME.upstreamOfSelection;
      strokeWidth = '0.8';
    } else {
      strokeColor = THEME.deselected;
      fillColor = THEME.deselected;
      strokeWidth = '.7';
    }

    styleByElement = {
      polygon: {
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
      },
      path: {
        fill: 'none',
        stroke: strokeColor,
        strokeWidth,
      },
    };
  } else {
    if (isSelected) {
      strokeColor = THEME.selection;
      strokeWidth = '2';
    } else if (isUpstreamSelected) {
      strokeColor = THEME.downstreamOfSelection;
      strokeWidth = '1.8';
    } else if (isDownstreamSelected) {
      strokeColor = THEME.upstreamOfSelection;
      strokeWidth = '1.8';
    } else {
      strokeColor = THEME.collection;
      strokeWidth = '1';
    }

    styleByElement = {
      text: isProxyNode ? { stroke: strokeColor } : {},
      polygon: {
        fill: 'none',
        stroke: strokeColor,
        strokeWidth,
      },
      ellipse: {
        fill: isProxyNode ? strokeColor : 'none',
        stroke: strokeColor,
        strokeWidth,
      },
    };
  }

  return (
    <PresentationContext.Provider
      value={{
        onTextHoverChange: (isHovered): void => {
          if (isHovered && info) {
            // eslint-disable-next-line no-console
            console.log(`${info.title}:\n${info.description}`);
          }
        },
        onTextClicked: (): void => {
          onSelectPart(proxyId);
        },
        hasInteractiveText: true,
        styleByElement,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
