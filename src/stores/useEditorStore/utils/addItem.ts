import type { EditorStore } from '@/stores/useEditorStore/index.types';
import type { Shape } from '@/types/shape';

import generateId from './generateId';

const addItem = (state: EditorStore, newShape: Shape) => {
  const { shapeIds, shapesById } = state;
  const id = generateId();

  return {
    shapesById: {
      ...shapesById,
      [id]: {
        ...newShape,
        id,
      },
    },
    shapeIds: [...shapeIds, id],
    selectedId: id,
    selectedIds: [id],
    selectionBounds: null,
  };
};

export default addItem;
