import {
  DEFAULT_SHAPE,
  DEFAULT_TEXT_SHAPE,
  SHAPE_ELLIPSE,
  SHAPE_RECT,
  SHAPE_TEXT,
} from '@/constants/shape';
import type { EditorStore } from '@/stores/useEditorStore/index.types';
import type { ShapeType } from '@/types/shape';

import addItem from './addItem';

const generateName = (state: EditorStore, shapeType: ShapeType) => {
  const length = state.shapeIds.length;
  const suffix = length ? ` ${length + 1}` : '';
  return shapeType + suffix;
};

const addShape = (state: EditorStore, shapeType: ShapeType) => {
  const startData = {
    id: '',
    type: shapeType,
    name: generateName(state, shapeType),
  };

  switch (shapeType) {
    case SHAPE_RECT:
    case SHAPE_ELLIPSE: {
      const newShape = {
        ...startData,
        ...DEFAULT_SHAPE,
      };
      return addItem(state, newShape);
    }

    case SHAPE_TEXT: {
      const newShape = {
        ...startData,
        ...DEFAULT_TEXT_SHAPE,
      };
      return addItem(state, newShape);
    }

    default:
      return;
  }
};

export default addShape;
