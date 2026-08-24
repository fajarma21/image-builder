import { SNAP_ELEMENT_H, SNAP_ELEMENT_V, SNAP_THRESHOLD } from '@/constants';
import type { Bounds } from '@/types';
import type { DraggingInteraction } from '@/types/interaction';
import getDeltaAxis from '@/utils/getDeltaAxis';

const getSnapPoint = (bounds: Bounds, x = 0, y = 0) => {
  const arr = x ? SNAP_ELEMENT_H : SNAP_ELEMENT_V;

  return arr.reduce(
    (prev, curr) => {
      const diff = bounds[curr] - (x | y);
      return Math.abs(diff) < Math.abs(prev.delta)
        ? { delta: diff, point: bounds[curr] }
        : prev;
    },
    { delta: Infinity, point: 0 },
  );
};

const getSnapBounds = (
  moveBounds: Bounds,
  targetBounds: Bounds,
  x = 0,
  y = 0,
) => {
  const arr = x ? SNAP_ELEMENT_H : SNAP_ELEMENT_V;

  return arr.reduce(
    (prevSnap, currElement) => {
      const result = getSnapPoint(
        targetBounds,
        x ? moveBounds[currElement] + x : 0,
        y ? moveBounds[currElement] + y : 0,
      );
      return Math.abs(result.delta) < Math.abs(prevSnap.delta)
        ? result
        : prevSnap;
    },
    { delta: Infinity, point: 0 },
  );
};

const getSnapBoundsDiff = (
  dx: number,
  dy: number,
  moveBounds: Bounds,
  targetBounds: Bounds[],
) => {
  return targetBounds.reduce(
    (prevSnap, currBounds) => {
      const bestSnapX = getSnapBounds(moveBounds, currBounds, dx, 0);
      const bestSnapY = getSnapBounds(moveBounds, currBounds, 0, dy);

      return {
        snapX:
          Math.abs(bestSnapX.delta) < Math.abs(prevSnap.snapX.delta)
            ? bestSnapX
            : prevSnap.snapX,
        snapY:
          Math.abs(bestSnapY.delta) < Math.abs(prevSnap.snapY.delta)
            ? bestSnapY
            : prevSnap.snapY,
      };
    },
    {
      snapX: { delta: Infinity, point: 0 },
      snapY: { delta: Infinity, point: 0 },
    },
  );
};

const getdSnapValue = (
  dx: number,
  dy: number,
  moveBounds: Bounds,
  targetBounds: Bounds[],
  zoom: number,
) => {
  const { snapX, snapY } = getSnapBoundsDiff(dx, dy, moveBounds, targetBounds);

  return {
    snapX: Math.abs(snapX.delta) < SNAP_THRESHOLD / zoom ? snapX : null,
    snapY: Math.abs(snapY.delta) < SNAP_THRESHOLD / zoom ? snapY : null,
  };
};

const getDragValue = (
  e: MouseEvent,
  interaction: DraggingInteraction,
  moveBouonds: Bounds | null,
  targetBounds: Bounds[],
  zoom: number,
) => {
  const { dx, dy } = getDeltaAxis(
    interaction.startMouseX,
    interaction.startMouseY,
    e.clientX,
    e.clientY,
    zoom,
  );

  let newDx = dx;
  let newDy = dy;
  let snapXPoint = null;
  let snapYPoint = null;

  if (targetBounds.length && moveBouonds) {
    const { snapX, snapY } = getdSnapValue(
      dx,
      dy,
      moveBouonds,
      targetBounds,
      zoom,
    );

    if (snapX) {
      newDx = dx + snapX.delta;
      snapXPoint = snapX.point;
    }
    if (snapY) {
      newDy = dy + snapY.delta;
      snapYPoint = snapY.point;
    }
  }
  return { dx: newDx, dy: newDy, snapXPoint, snapYPoint };
};

export default getDragValue;
