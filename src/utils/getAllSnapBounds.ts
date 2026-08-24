import type { EditorStore } from '@/stores/useEditorStore/index.types';
import type { Bounds } from '@/types';
import getBounds from '@/utils/getBounds';

const getUnselectedShapeBounds = ({
  shapeIds,
  selectedIds,
  shapesById,
}: EditorStore) => {
  return shapeIds
    .filter((id) => !selectedIds.includes(id))
    .map((id) => getBounds(shapesById![id]));
};

const getGridBounds = ({ document }: EditorStore): Bounds => {
  return {
    top: 0,
    bottom: document.height,
    left: 0,
    right: document.width,
    centerX: document.width / 2,
    centerY: document.height / 2,
    width: document.width,
    height: document.height,
  };
};

const getAllSnapBounds = (state: EditorStore) => {
  const { document } = state;
  let shapeSnapBounds: Bounds[] = [];

  if (document.snap.object)
    shapeSnapBounds = [...shapeSnapBounds, ...getUnselectedShapeBounds(state)];
  if (document.snap.canvas)
    shapeSnapBounds = [...shapeSnapBounds, getGridBounds(state)];

  return shapeSnapBounds;
};

export default getAllSnapBounds;
