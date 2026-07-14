import type { Bounds } from '@/types';

const getSelectionBounds = (a: Bounds, b: Bounds | null) => {
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

export default getSelectionBounds;
