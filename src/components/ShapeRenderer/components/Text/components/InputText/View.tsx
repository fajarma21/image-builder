import type { ChangeEvent } from 'react';

import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';
import type { InputTextProps } from './View.types';
import useHistoryDebounce from '@/hooks/useHistoryDebounce';

const InputText = ({ shape }: InputTextProps) => {
  const updateShape = useEditorStore((state) => state.updateShape);
  const stopInteraction = useEditorStore((state) => state.stopInteraction);

  const [handlePushHistory] = useHistoryDebounce();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handlePushHistory();
    updateShape(shape.id, { text: e.target.value });
  };

  const handleBlur = () => {
    stopInteraction();
  };

  return (
    <foreignObject
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
    >
      <input
        autoFocus
        type="text"
        name={shape.name}
        value={shape.text}
        className={css.editText}
        style={{
          fontSize: shape.fontSize,
          color: shape.fill,
          width: shape.width,
        }}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </foreignObject>
  );
};

export default InputText;
