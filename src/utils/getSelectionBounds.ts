import type { Bounds } from '@/types';
import type { Shape } from '@/types/shape';

import getBounds from './getBounds';

const getSelection = (a: Bounds, b: Bounds | null) => {
  const normalized = b || {
    top: Infinity,
    bottom: -Infinity,
    left: Infinity,
    right: -Infinity,
  };

  const top = Math.min(a.top, normalized.top);
  const bottom = Math.max(a.bottom, normalized.bottom);
  const left = Math.min(a.left, normalized.left);
  const right = Math.max(a.right, normalized.right);

  const width = right - left;
  const height = bottom - top;

  return {
    top,
    bottom,
    left,
    right,
    width,
    height,
    centerX: left + width / 2,
    centerY: top + height / 2,
  };
};

const getSelectionBounds = (
  ids: string[],
  shapesById: Record<string, Shape> | null,
) => {
  if (!shapesById || ids.length <= 1) return null;

  let tempSelectionBounds: Bounds | null = null;

  for (const id of ids) {
    const shape = shapesById[id];
    const shapeBounds = getBounds(shape);

    tempSelectionBounds = getSelection(shapeBounds, tempSelectionBounds);
  }

  return tempSelectionBounds;
};

export default getSelectionBounds;
