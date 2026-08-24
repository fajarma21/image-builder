import type { Shape } from '@/types/shape';
import getBounds from '@/utils/getBounds';

const getSnapBounds = (
  shapeIds: string[],
  selectedIds: string[],
  shapesById: Record<string, Shape>,
) => {
  return shapeIds
    .filter((id) => !selectedIds.includes(id))
    .map((id) => getBounds(shapesById![id]));
};

export default getSnapBounds;
