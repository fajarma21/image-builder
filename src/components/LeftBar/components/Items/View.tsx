import { useRef, type ChangeEvent } from 'react';

import { SHAPE_ELLIPSE, SHAPE_RECT, SHAPE_TEXT } from '@/constants';
import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';

const Items = () => {
  const addShape = useEditorStore((state) => state.addShape);
  const addImage = useEditorStore((state) => state.addImage);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];

    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();

      img.onload = () => {
        if (typeof fr.result === 'string')
          addImage(file.name, fr.result, img.width, img.height);
      };

      if (typeof fr.result === 'string') img.src = fr.result;
    };
    fr.readAsDataURL(file);

    e.target.value = '';
  };

  return (
    <div className={css.items}>
      <h3>ADD ITEM</h3>
      <div className={css.content}>
        <button type="button" onClick={() => addShape(SHAPE_RECT)}>
          Add Rect
        </button>
        <button type="button" onClick={() => addShape(SHAPE_ELLIPSE)}>
          Add Circle
        </button>
        <button type="button" onClick={() => addShape(SHAPE_TEXT)}>
          Add Text
        </button>
        <button type="button" onClick={handleClickUpload}>
          Upload Image
        </button>
      </div>
      <input hidden ref={inputRef} type="file" onChange={handleUpload} />
    </div>
  );
};

export default Items;
