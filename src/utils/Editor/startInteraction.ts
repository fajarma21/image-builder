import {
  DRAGGING,
  MARQUEE,
  MOUSE_DOWN_EMPTY,
  MOUSE_DOWN_SHAPE,
  PANNING,
  RESIZING,
  ROTATING,
} from '@/constants/interaction';
import type { EditorStore } from '@/stores/useEditorStore/index.types';
import type { StartInteractionParams } from '@/types/interaction';

import createSnapshot from '../createSnapshot';

const startInteraction = (
  state: EditorStore,
  {
    type,
    mouseX = 0,
    mouseY = 0,
    scrollX = 0,
    scrollY = 0,
    shape,
  }: StartInteractionParams,
) => {
  switch (type) {
    case DRAGGING:
    case RESIZING:
    case ROTATING:
      return {
        interaction: {
          type,
          startMouseX: mouseX,
          startMouseY: mouseY,
          startShapes: state.selectedIds.map((id) => state.shapesById![id]),
          centerX: shape ? shape.x + shape.width / 2 : 0,
          centerY: shape ? shape.y + shape.height / 2 : 0,
          startSnapshot: createSnapshot(state),
        },
      };

    case MOUSE_DOWN_EMPTY:
    case MOUSE_DOWN_SHAPE:
      return {
        interaction: {
          type,
          startMouseX: mouseX,
          startMouseY: mouseY,
        },
      };

    case PANNING:
      return {
        interaction: {
          type,
          startMouseX: mouseX,
          startMouseY: mouseY,
          scrollLeft: scrollX,
          scrollTop: scrollY,
        },
      };

    case MARQUEE:
      return {
        interaction: {
          type,
          startMouseX: mouseX,
          startMouseY: mouseY,
          currentMouseX: mouseX,
          currentMouseY: mouseY,
        },
      };

    default:
      return { interaction: { type } };
  }
};

export default startInteraction;
