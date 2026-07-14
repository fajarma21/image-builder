import {
  ALIGN_BOTTOM,
  ALIGN_CENTER,
  ALIGN_LEFT,
  ALIGN_MIDDLE,
  ALIGN_RIGHT,
  ALIGN_TOP,
} from '@/constants';
import type { Bounds } from '@/types';
import type { Shape } from '@/types/shape';

const alignSelection = (
  alignment: string,
  selectedIds: string[],
  shapesById: Record<string, Shape> | null,
  selectionBounds: Bounds | null,
) => {
  if (!shapesById || !selectionBounds) return;

  const updatedShapes: Record<string, Shape> = {};

  for (const id of selectedIds) {
    const shape = shapesById[id];

    let x = shape.x;
    let y = shape.y;

    switch (alignment) {
      case ALIGN_LEFT:
        x = selectionBounds.left;
        break;
      case ALIGN_CENTER:
        x = selectionBounds.centerX - shape.width / 2;
        break;
      case ALIGN_RIGHT:
        x = selectionBounds.right - shape.width;
        break;
      case ALIGN_TOP:
        y = selectionBounds.top;
        break;
      case ALIGN_MIDDLE:
        y = selectionBounds.centerY - shape.height / 2;
        break;
      case ALIGN_BOTTOM:
        y = selectionBounds.bottom - shape.height;
        break;

      default:
        break;
    }
    updatedShapes[id] = {
      ...shape,
      x,
      y,
    };
  }
  return updatedShapes;
};

export default alignSelection;
