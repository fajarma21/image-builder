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
import getAllSnapBounds from '@/utils/getAllSnapBounds';
import createSnapshot from '@/utils/createSnapshot';
import type { StartInteractionParams } from '@/types/interaction';
import degToRad from '@/utils/degToRad';

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
    case ROTATING:
      return {
        interaction: {
          type,
          startMouse: {
            x: mouseX,
            y: mouseY,
          },
          startShapes: state.selectedIds.map((id) => state.shapesById![id]),
          center: {
            x: shape ? shape.x + shape.width / 2 : 0,
            y: shape ? shape.y + shape.height / 2 : 0,
          },
          startSnapshot: createSnapshot(state),
        },
      };

    case RESIZING: {
      const { x = 0, y = 0, width = 0, height = 0, rotation = 0 } = shape || {};
      const center = {
        x: x + width / 2,
        y: y + height / 2,
      };
      const rad = degToRad(rotation);
      return {
        interaction: {
          type,
          startMouse: {
            x: mouseX,
            y: mouseY,
          },
          startShapes: state.selectedIds.map((id) => state.shapesById![id]),
          center,
          anchor: {
            x:
              center.x -
              (width / 2) * Math.cos(rad) +
              (height / 2) * Math.sin(rad),
            y:
              center.y -
              (width / 2) * Math.sin(rad) -
              (height / 2) * Math.cos(rad),
          },
          startSnapshot: createSnapshot(state),
        },
      };
    }

    case MOUSE_DOWN_EMPTY:
      return {
        interaction: {
          type,
          startMouse: {
            x: mouseX,
            y: mouseY,
          },
        },
      };

    case MOUSE_DOWN_SHAPE: {
      return {
        snapBounds: getAllSnapBounds(state),
        interaction: {
          type,
          startMouse: {
            x: mouseX,
            y: mouseY,
          },
        },
      };
    }
    case PANNING:
      return {
        interaction: {
          type,
          startMouse: {
            x: mouseX,
            y: mouseY,
          },
          scrollLeft: scrollX,
          scrollTop: scrollY,
        },
      };

    case MARQUEE:
      return {
        interaction: {
          type,
          startMouse: {
            x: mouseX,
            y: mouseY,
          },
          currentMouse: {
            x: mouseX,
            y: mouseY,
          },
        },
      };

    default:
      return { interaction: { type } };
  }
};

export default startInteraction;
