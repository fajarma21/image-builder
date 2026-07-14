import { DISTRIBUTE_H, DISTRIBUTE_V } from '@/constants';
import type { Bounds } from '@/types';
import type { Shape } from '@/types/shape';

const getDistributeSelection = (
  selectedIds: string[],
  shapesById: Record<string, Shape>,
  selectionBounds: Bounds,
) => {
  const firstShape = shapesById[selectedIds[0]];
  const lastShape = shapesById[selectedIds[selectedIds.length - 1]];

  const newW =
    selectionBounds.width - firstShape.width / 2 - lastShape.width / 2;
  const newH =
    selectionBounds.height - firstShape.height / 2 - lastShape.height / 2;

  return {
    selection: {
      left: selectionBounds.left + firstShape.width / 2,
      top: selectionBounds.top + firstShape.height / 2,
    },
    divider: {
      horizontal: newW / (selectedIds.length - 1),
      vertical: newH / (selectedIds.length - 1),
    },
  };
};

const distributeSelection = (
  distribution: string,
  shapeIds: string[],
  shapesById: Record<string, Shape> | null,
  selectionBounds: Bounds | null,
) => {
  if (!shapesById || !selectionBounds) return;

  const updatedShapes: Record<string, Shape> = {};

  const { selection, divider } = getDistributeSelection(
    shapeIds,
    shapesById,
    selectionBounds,
  );

  for (let index = 0; index < shapeIds.length; index++) {
    const id = shapeIds[index];
    const shape = shapesById[id];

    let x = shape.x;
    let y = shape.y;

    switch (distribution) {
      case DISTRIBUTE_H:
        x = selection.left + (divider.horizontal * index - shape.width / 2);
        break;
      case DISTRIBUTE_V:
        y = selection.top + (divider.vertical * index - shape.width / 2);
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

export default distributeSelection;
