import { useLayoutEffect, useRef } from 'react';

import useEditorStore from '@/stores/useEditorStore';

import css from './View.module.scss';
import type { TextProps } from './View.types';
import { EDITING_TEXT } from '@/constants/interaction';
import InputText from './components/InputText';

const Text = ({ shape, ...actionProps }: TextProps) => {
  const { id, x, y, fontSize, fill, stroke, text } = shape;

  const selectedIds = useEditorStore((state) => state.selectedIds);
  const interaction = useEditorStore((state) => state.interaction);

  const startEditingText = useEditorStore((state) => state.startEditingText);
  const updateSize = useEditorStore((state) => state.updateSize);

  const textRef = useRef<SVGTextElement>(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;
    const bBox = textRef.current.getBBox();

    updateSize(id, bBox.width, bBox.height);
  }, [id, text, fontSize, updateSize]);

  const isSelected = selectedIds.includes(id);
  const isEditing = interaction.type === EDITING_TEXT;

  return (
    <>
      <text
        ref={textRef}
        x={x}
        y={y}
        fontSize={fontSize}
        fill={fill}
        stroke={stroke}
        paintOrder="stroke fill"
        dominantBaseline="hanging"
        xmlSpace="preserve"
        className={css.text}
        {...actionProps}
        onDoubleClick={startEditingText}
      >
        {text}
      </text>
      {isSelected && isEditing && <InputText shape={shape} />}
    </>
  );
};

export default Text;
