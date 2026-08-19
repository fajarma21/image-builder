import { DEFAULT_SHAPE, SHAPE_IMAGE } from '@/constants/shape';
import type { EditorStore } from '@/stores/useEditorStore/index.types';

import addItem from './addItem';

const addImage = (
  state: EditorStore,
  name: string,
  imageSrc: string,
  width: number,
  height: number,
) => {
  const newShape = {
    ...DEFAULT_SHAPE,
    id: '',
    type: SHAPE_IMAGE,
    name,
    imageSrc,
    width,
    height,
  };
  return addItem(state, newShape);
};

export default addImage;
