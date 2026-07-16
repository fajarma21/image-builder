import { DISTRIBUTE_H } from '@/constants';
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

  const sortedIds = [...shapeIds].sort((a, b) => {
    if (distribution === DISTRIBUTE_H) {
      return shapesById[a].x - shapesById[b].x;
    }
    return shapesById[a].y - shapesById[b].y;
  });

  const updatedShapes: Record<string, Shape> = {};

  const { selection, divider } = getDistributeSelection(
    sortedIds,
    shapesById,
    selectionBounds,
  );

  for (let index = 0; index < sortedIds.length; index++) {
    const id = sortedIds[index];
    const shape = shapesById[id];

    let x = shape.x;
    let y = shape.y;

    if (distribution === DISTRIBUTE_H) {
      x = selection.left + (divider.horizontal * index - shape.width / 2);
    } else {
      y = selection.top + (divider.vertical * index - shape.height / 2);
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
