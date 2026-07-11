import type { Bounds } from '@/types';

const getSelectionBounds = (a: Bounds, b: Bounds | null) => {
  const normalized = b || {
    top: Infinity,
    bottom: -Infinity,
    left: Infinity,
    right: -Infinity,
  };

  return {
    top: Math.min(a.top, normalized.top),
    bottom: Math.max(a.bottom, normalized.bottom),
    left: Math.min(a.left, normalized.left),
    right: Math.max(a.right, normalized.right),
  };
};

export default getSelectionBounds;
